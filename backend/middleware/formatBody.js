
const formatRequestBody = (req, res, next) => {

    if (req.body) {
        if (req.body.fullName && !req.body.Fullname) {
            req.body.Fullname = req.body.fullName;
        }
        if (req.body.FullName && !req.body.Fullname) {
            req.body.Fullname = req.body.FullName;
        }
        
        
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase().trim();
        }
    }
    next();
};

export default formatRequestBody;