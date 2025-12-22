import React, { useEffect, useState } from "react";
import { BaseUrl, get, post } from "../services/EndPoint";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Post() {
  const { id } = useParams();
  const [singlepost, setpost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState(2);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchSinglePost = async () => {
    try {
      const response = await get(`public/singlepost/${id}`);
      const data = response.data;
      setpost(data.post);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load post");
    }
  };

  useEffect(() => {
    fetchSinglePost();

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return toast.error("Comment cannot be empty");
    }

    if (!user || !user._id) {
      return toast.error("Please login first to comment");
    }

    try {
      const payload = {
        postid: id,
        userid: user._id,
        comments: commentText,
      };

      const response = await post("/comments/addcomments", payload);

      if (response.status === 200) {
        toast.success("Comment added successfully!");
        setCommentText("");
        fetchSinglePost();
        setVisibleComments(2);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  const getDisplayName = (commentUser) => {
    if (commentUser?.Fullname) return commentUser.Fullname;
    if (commentUser?.fullName) return commentUser.fullName;
    if (commentUser?.username) return commentUser.username;
    if (commentUser?.email) return commentUser.email.split("@")[0];
    return "Anonymous";
  };

  const getProfileImageUrl = (commentUser) => {
    if (commentUser?.profile) {
      return `${BaseUrl}/images/${commentUser.profile}`;
    }
    return null;
  };

  const getAvatarColor = (email) => {
    if (!email) return "#7f5af0";
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];
    const hash = email.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const getAvatarLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const loadMoreComments = () => {
    const allComments = singlepost?.comments?.length || 0;
    setVisibleComments((prev) => Math.min(prev + 2, allComments));
  };

  const showLessComments = () => {
    setVisibleComments(2);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToComments = () => {
    const commentsSection = document.querySelector(".comments-section");
    if (commentsSection) {
      commentsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container text-white mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h1 className="fw-bold mt-4 mb-3 display-5">{singlepost?.title}</h1>

          {singlepost?.image && (
            <img
              src={`${BaseUrl}/images/${singlepost.image}`}
              alt=""
              className="img-fluid mb-4"
              style={{
                borderRadius: "10px",
                maxHeight: "400px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}

          <div className="mb-5 fs-5 line-height-1.6">
            {singlepost?.description}
          </div>

          {singlepost?.comments?.length > 0 && (
            <div className="mb-4 text-center">
              <button
                onClick={scrollToComments}
                className="btn btn-outline-light btn-sm"
              >
                <i className="fas fa-comments me-2"></i>
                Jump to Comments ({singlepost?.comments?.length || 0})
              </button>
            </div>
          )}

          <hr className="mb-4" />

          <div className="mb-5">
            <h3 className="mb-3">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="mb-3">
                <label htmlFor="comment" className="form-label fw-medium">
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  className="form-control bg-dark text-white border-secondary"
                  rows="3"
                  placeholder="Write your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-dark px-4 py-2 fw-medium"
                style={{
                  backgroundColor: "#000",
                  borderColor: "#333",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#000";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Post Comment
              </button>
            </form>
          </div>

          <hr className="mb-4" />

          <div className="comments-section">
            <h3 className="mb-4">
              Comments ({singlepost?.comments?.length || 0})
            </h3>

            {singlepost?.comments?.length > 0 ? (
              <>
                <div className="comments-list">
                  {singlepost.comments
                    .slice(0, visibleComments)
                    .map((comment) => {
                      const displayName = getDisplayName(comment?.userid);
                      const profileImage = getProfileImageUrl(comment?.userid);
                      const userEmail = comment?.userid?.email || "";
                      const avatarColor = getAvatarColor(userEmail);
                      const avatarLetter = getAvatarLetter(displayName);

                      return (
                        <div
                          key={comment._id}
                          className="comment-item bg-dark p-3 rounded mb-3"
                          style={{
                            borderLeft: "3px solid #7f5af0",
                          }}
                        >
                          <div className="d-flex align-items-start">
                            <div className="flex-shrink-0">
                              {profileImage ? (
                                <img
                                  src={profileImage}
                                  alt={displayName}
                                  className="rounded-circle"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    backgroundColor: avatarColor,
                                  }}
                                  onError={(e) => {
                                    e.target.style.display = "none";

                                    e.target.parentElement.innerHTML = `
                                      <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                           style="width: 40px; height: 40px; background-color: ${avatarColor}; font-size: 1rem;">
                                        ${avatarLetter}
                                      </div>
                                    `;
                                  }}
                                />
                              ) : (
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: avatarColor,
                                    fontSize: "1rem",
                                  }}
                                >
                                  {avatarLetter}
                                </div>
                              )}
                            </div>

                           
                            <div className="flex-grow-1 ms-3">
                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <h5 className="mb-0 fw-medium">
                                  {displayName}
                                </h5>
                                {comment.createdAt && (
                                  <small className="text-muted">
                                    {new Date(
                                      comment.createdAt
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </small>
                                )}
                              </div>
                              <p className="mb-0 text-light">
                                {comment.comments}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {singlepost.comments.length > 2 && (
                  <div className="text-center mt-4">
                    {visibleComments < singlepost.comments.length ? (
                      <>
                        <button
                          onClick={loadMoreComments}
                          className="btn btn-outline-light me-2"
                        >
                          Show More Comments (
                          {singlepost.comments.length - visibleComments}{" "}
                          remaining)
                        </button>
                        {visibleComments > 2 && (
                          <button
                            onClick={showLessComments}
                            className="btn btn-outline-secondary"
                          >
                            Show Less
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={showLessComments}
                        className="btn btn-outline-secondary"
                      >
                        Show Less Comments
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <i className="fas fa-comments fa-2x text-muted mb-3"></i>
                <p className="text-muted mb-0">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-dark position-fixed bottom-3 end-3 rounded-circle shadow-lg"
          style={{
            width: "50px",
            height: "50px",
            zIndex: 1000,
            backgroundColor: "#000",
            border: "1px solid #333",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#333";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#000";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}
