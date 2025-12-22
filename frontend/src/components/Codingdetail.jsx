import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const techData = {
  mern: {
    title: "MERN Stack Development",
    description: "The MERN stack is a popular full-stack JavaScript solution for building modern web applications.",
    fullDescription: `MERN stands for MongoDB, Express.js, React, and Node.js. It's a full-stack JavaScript framework that allows developers to build robust web applications using a single programming language.

Key Features:
• Full-stack JavaScript development
• Single language throughout (JavaScript)
• Rich ecosystem of libraries
• Fast development cycle
• Strong community support

Technologies:
• MongoDB: NoSQL database for flexible data storage
• Express.js: Backend web application framework
• React: Frontend library for building user interfaces
• Node.js: JavaScript runtime environment

Use Cases:
• Social media platforms
• E-commerce websites
• Real-time applications
• Content management systems
• SaaS applications`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Full-stack JavaScript solution",
      "Real-time capabilities",
      "Rich ecosystem",
      "Scalable architecture",
      "Active community"
    ],
    projects: ["Blog Platform", "E-commerce Site", "Social Media App", "Task Manager"],
    codingBasics: {
      title: "MERN Stack Coding Basics",
      technologies: ["HTML/CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"],
      examples: [
        {
          title: "HTML/CSS Basics",
          code: `<!-- HTML Structure -->
<div class="container">
  <h1>Hello MERN</h1>
  <button class="btn">Click Me</button>
</div>

/* CSS Styling */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}`
        },
        {
          title: "JavaScript Fundamentals",
          code: `// Variables & Functions
const name = "John";
let age = 25;
var isDeveloper = true;

// Arrow Function
const add = (a, b) => a + b;

// Arrays & Objects
const users = ["Alice", "Bob", "Charlie"];
const user = {
  name: "John",
  email: "john@example.com",
  age: 25
};

// Fetch API (Frontend-Backend Communication)
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));`
        },
        {
          title: "React Component",
          code: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`
        },
        {
          title: "Express.js Server",
          code: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello MERN Stack!');
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
        },
        {
          title: "MongoDB Schema",
          code: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;`
        }
      ]
    }
  },
  mean: {
    title: "MEAN Stack Development",
    description: "MEAN stack is another popular full-stack JavaScript solution using Angular for the frontend.",
    fullDescription: `MEAN stands for MongoDB, Express.js, Angular, and Node.js. It's a full-stack development framework that enables building dynamic web applications.

Key Features:
• TypeScript-based development
• Two-way data binding
• Dependency injection
• Modular architecture
• Enterprise-ready

Technologies:
• MongoDB: Document-based database
• Express.js: Web application framework
• Angular: Frontend framework by Google
• Node.js: Server-side runtime

Use Cases:
• Enterprise applications
• Single-page applications
• Progressive web apps
• Large-scale applications
• Admin dashboards`,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "TypeScript support",
      "Two-way data binding",
      "Modular architecture",
      "Enterprise features",
      "Google-backed framework"
    ],
    projects: ["Enterprise Dashboard", "Admin Panel", "CRM System", "Analytics Platform"],
    codingBasics: {
      title: "MEAN Stack Coding Basics",
      technologies: ["HTML/CSS", "TypeScript", "Angular", "Node.js", "Express", "MongoDB"],
      examples: [
        {
          title: "HTML/CSS Basics",
          code: `<!-- Angular Template -->
<div class="container">
  <h1>{{title}}</h1>
  <button (click)="onClick()" class="btn">
    Click Me
  </button>
</div>

/* Component CSS */
.container {
  padding: 20px;
}
.btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
}`
        },
        {
          title: "TypeScript Fundamentals",
          code: `// TypeScript with Types
interface User {
  name: string;
  age: number;
  email: string;
}

class Person {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  greet(): string {
    return \`Hello, \${this.name}\`;
  }
}

// Array with Type
const numbers: number[] = [1, 2, 3, 4, 5];

// Function with Return Type
const multiply = (x: number, y: number): number => x * y;`
        },
        {
          title: "Angular Component",
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MEAN Stack App';
  count = 0;
  
  increment() {
    this.count++;
  }
  
  users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
  ];
}

// app.component.html
<h1>{{title}}</h1>
<p>Count: {{count}}</p>
<button (click)="increment()">Add</button>
<ul>
  <li *ngFor="let user of users">
    {{user.name}} - {{user.age}}
  </li>
</ul>`
        },
        {
          title: "Angular Service",
          code: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}

// Using Service in Component
export class UserComponent {
  users: any[] = [];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}`
        },
        {
          title: "Node.js/Express Backend",
          code: `// Same as MERN for backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for Angular frontend
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mean_db');

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// API Endpoints
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server started'));`
        }
      ]
    }
  },
  "react-native": {
    title: "React Native Development",
    description: "React Native allows building native mobile apps using React and JavaScript.",
    fullDescription: `React Native is a popular framework for building native mobile applications for iOS and Android using React and JavaScript.

Key Features:
• Cross-platform development
• Native performance
• Hot reloading
• Reusable components
• Large community

Technologies:
• React: UI library
• JavaScript/TypeScript
• Native modules
• Platform-specific APIs

Use Cases:
• Mobile applications
• Cross-platform apps
• E-commerce apps
• Social media apps
• Business applications`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Cross-platform development",
      "Native performance",
      "Live reload",
      "Code reusability",
      "Strong community"
    ],
    projects: ["Mobile E-commerce", "Fitness App", "Social App", "Delivery Service"],
    codingBasics: {
      title: "React Native Coding Basics",
      technologies: ["JavaScript", "React", "React Native Components", "Native APIs"],
      examples: [
        {
          title: "Basic React Native Component",
          code: `import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet,
  TextInput,
  ScrollView 
} from 'react-native';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  
  const addItem = () => {
    setItems([...items, text]);
    setText('');
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My React Native App</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={text}
        onChangeText={setText}
      />
      
      <Button title="Add Item" onPress={addItem} />
      
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5
  }
});

export default App;`
        },
        {
          title: "Navigation in React Native",
          code: `// Install: npm install @react-navigation/native @react-navigation/stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`
        },
        {
          title: "API Calls in React Native",
          code: `import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}`
        },
        {
          title: "Styling in React Native",
          code: `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Flexbox Layout
  container: {
    flex: 1,
    flexDirection: 'row', // or 'column'
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  
  // Sizing
  box: {
    width: 100,
    height: 100,
    margin: 10,
    padding: 15,
  },
  
  // Colors and Borders
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  
  // Text Styling
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  
  // Responsive Design
  responsive: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  }
});`
        },
        {
          title: "Common React Native Components",
          code: `import {
  // Basic Components
  View,    // Like <div> in web
  Text,    // Like <p> or <span>
  Image,   // For displaying images
  ScrollView, // Scrollable container
  FlatList,   // Efficient list rendering
  
  // Form Components
  TextInput, // Input field
  Button,    // Pressable button
  Switch,    // Toggle switch
  Picker,    // Dropdown (iOS)
  
  // Interactive Components
  TouchableOpacity, // Pressable with opacity effect
  TouchableHighlight,
  TouchableWithoutFeedback,
  
  // Platform Specific
  Platform, // Detect platform
  StatusBar, // Status bar control
  
  // Status Indicators
  ActivityIndicator, // Loading spinner
  RefreshControl,    // Pull to refresh
} from 'react-native';`
        }
      ]
    }
  }
};

export default function TechDetails() {
  const { tech } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const techInfo = techData[tech] || techData.mern;
  
  if (!techInfo) {
    return (
      <div className="container py-5 text-center fr">
        <h1 className="text-white">Technology not found</h1>
        <button onClick={() => navigate(-1)} className="btn fra text-white mt-3">
          <i className="fas fa-arrow-left me-2"></i>Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 fr mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg mb-4 fra">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start justify-content-between mb-4">
                    <div>
                      <h1 className="display-5 fw-bold text-white mb-2">{techInfo.title}</h1>
                      <p className="lead text-light opacity-75">{techInfo.description}</p>
                    </div>
                    <span className="badge bg-black text-white fs-6 px-3 py-2">
                      {tech.toUpperCase()}
                    </span>
                  </div>

                 
                  <ul className="nav nav-tabs mb-4 border-bottom-0">
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'overview' ? 'active text-white' : 'text-secondary'} fra`}
                        onClick={() => setActiveTab('overview')}
                      >
                        <i className="fas fa-info-circle me-2 text-black"></i>Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'coding' ? 'active text-white' : 'text-secondary'} fra`}
                        onClick={() => setActiveTab('coding')}
                      >
                        <i className="fas fa-code me-2"></i>Coding
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'features' ? 'active text-white' : 'text-secondary'} fra`}
                        onClick={() => setActiveTab('features')}
                      >
                        <i className="fas fa-star me-2"></i>Features
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'projects' ? 'active text-white' : 'text-secondary'} fra`}
                        onClick={() => setActiveTab('projects')}
                      >
                        <i className="fas fa-project-diagram me-2"></i>Projects
                      </button>
                    </li>
                  </ul>

                 
                  <div className="tab-content">
                    {activeTab === 'overview' && (
                      <div className="overview-content">
                        <img 
                          src={techInfo.image} 
                          alt={techInfo.title}
                          className="img-fluid rounded mb-4"
                          style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                        />
                        <div className="whitespace-pre-line text-white">
                          {techInfo.fullDescription}
                        </div>
                      </div>
                    )}

                    {activeTab === 'coding' && techInfo.codingBasics && (
                      <div className="coding-content">
                        <h3 className="text-white mb-4">{techInfo.codingBasics.title}</h3>
                        
                  
                        <div className="mb-4">
                          <h5 className="text-light mb-3">Core Technologies:</h5>
                          <div className="d-flex flex-wrap gap-2">
                            {techInfo.codingBasics.technologies.map((techItem, index) => (
                              <span key={index} className="badge bg-black text-white px-3 py-2">
                                <i className="fas fa-check me-2"></i>{techItem}
                              </span>
                            ))}
                          </div>
                        </div>

                       
                        <div className="coding-examples">
                          {techInfo.codingBasics.examples.map((example, index) => (
                            <div key={index} className="card border-0 shadow-sm fra mb-4">
                              <div className="card-header bg-black text-white">
                                <h5 className="mb-0">
                                  <i className="fas fa-file-code me-2"></i>
                                  {example.title}
                                </h5>
                              </div>
                              <div className="card-body p-0">
                                <pre className="m-0 p-3 bg-dark text-white rounded-bottom" 
                                     style={{ 
                                       fontSize: '0.9rem',
                                       overflowX: 'auto',
                                       maxHeight: '400px'
                                     }}>
                                  <code>{example.code}</code>
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>

                   
                        <div className="card border-0 shadow-sm fra mt-4">
                          <div className="card-body">
                            <h5 className="text-white mb-3">
                              <i className="fas fa-lightbulb me-2 text-warning"></i>
                              Quick Learning Tips
                            </h5>
                            <ul className="text-light">
                              {tech === 'mern' && (
                                <>
                                  <li>Start with JavaScript basics before learning React</li>
                                  <li>Learn React Hooks (useState, useEffect) first</li>
                                  <li>Practice creating REST APIs with Express</li>
                                  <li>Understand MongoDB CRUD operations</li>
                                  <li>Build small projects like Todo App or Blog</li>
                                </>
                              )}
                              {tech === 'mean' && (
                                <>
                                  <li>Learn TypeScript before diving into Angular</li>
                                  <li>Understand Angular's component-based architecture</li>
                                  <li>Practice two-way data binding with [(ngModel)]</li>
                                  <li>Learn Angular services for API calls</li>
                                  <li>Build an admin dashboard as a practice project</li>
                                </>
                              )}
                              {tech === 'react-native' && (
                                <>
                                  <li>If you know React, React Native will be easier</li>
                                  <li>Learn Flexbox for layout design</li>
                                  <li>Practice navigation between screens</li>
                                  <li>Understand platform-specific code</li>
                                  <li>Start with a simple mobile app first</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="features-content">
                        <div className="row">
                          {techInfo.features.map((feature, index) => (
                            <div className="col-md-6 mb-3" key={index}>
                              <div className="card h-100 border-0 shadow-sm fr">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <span className="badge bg-black text-white rounded-circle me-3 d-flex align-items-center justify-content-center"
                                          style={{ width: '30px', height: '30px' }}>
                                      {index + 1}
                                    </span>
                                    <h5 className="mb-0 text-white">{feature}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'projects' && (
                      <div className="projects-content">
                        <div className="row">
                          {techInfo.projects.map((project, index) => (
                            <div className="col-md-6 col-lg-4 mb-3" key={index}>
                              <div className="card h-100 border-0 shadow-sm fr hover-shadow">
                                <div className="card-body text-center">
                                  <div className="project-icon mb-3">
                                    <i className="fas fa-code text-white" style={{ fontSize: '2rem' }}></i>
                                  </div>
                                  <h5 className="text-white">{project}</h5>
                                  <small className="text-light opacity-75">Sample project using {techInfo.title}</small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            
         
            </div>

          
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '20px' }}>
              
                <div className="card border-0 shadow-lg mb-4 fra">
                  <div className="card-body">
                    <h4 className="mb-3 text-white">Explore Other Stacks</h4>
                    <div className="d-grid gap-3">
                      <button 
                        className={`btn btn-lg ${tech === 'mern' ? 'bg-black text-white' : 'fra text-white border'}`}
                        onClick={() => navigate('/tech-details/mern')}
                      >
                        <i className="fab fa-react me-2"></i>MERN Stack
                      </button>
                      <button 
                        className={`btn btn-lg ${tech === 'mean' ? 'bg-black text-white' : 'fra text-white border'}`}
                        onClick={() => navigate('/tech-details/mean')}
                      >
                        <i className="fab fa-angular me-2"></i>MEAN Stack
                      </button>
                      <button 
                        className={`btn btn-lg ${tech === 'react-native' ? 'bg-black text-white' : 'fra text-white border'}`}
                        onClick={() => navigate('/tech-details/react-native')}
                      >
                        <i className="fab fa-react me-2"></i>React Native
                      </button>
                    </div>
                  </div>
                </div>

         
                <div className="card border-0 shadow-lg fra">
                  <div className="card-body">
                    <h4 className="mb-3 text-white">Quick Stats</h4>
                    <div className="row text-center">
                      <div className="col-6 mb-3">
                        <div className="p-3 bg-black rounded">
                          <h3 className="text-primary mb-1">85%</h3>
                          <small className="text-white">Adoption Rate</small>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="p-3 bg-black rounded">
                          <h3 className="text-success mb-1">4.5★</h3>
                          <small className="text-white">Rating</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-black rounded">
                          <h3 className="text-warning mb-1">50K+</h3>
                          <small className="text-white">GitHub Stars</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-black rounded">
                          <h3 className="text-info mb-1">100K+</h3>
                          <small className="text-white">Projects Built</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

      
                <div className="card border-0 shadow-lg fra mt-4">
                  <div className="card-body">
                    <h4 className="mb-3 text-white">Learning Path</h4>
                    <div className="progress mb-3" style={{ height: '10px' }}>
                      <div 
                        className="progress-bar bg-primary" 
                        style={{ width: tech === 'mern' ? '60%' : tech === 'mean' ? '70%' : '50%' }}
                      ></div>
                    </div>
                    <p className="text-light small">
                      {tech === 'mern' && 'Complete basics in 2-3 months with daily practice'}
                      {tech === 'mean' && 'Angular has steeper learning curve (3-4 months)'}
                      {tech === 'react-native' && 'Learn React first, then React Native (1-2 months)'}
                    </p>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}