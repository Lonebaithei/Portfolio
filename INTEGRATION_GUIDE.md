# CV Website Backend - Complete Integration Guide

## Overview
This guide will help you set up and integrate the Node.js/Express backend with your CV website frontend.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- **npm** (comes with Node.js)
- Basic understanding of command line/terminal

### Step 1: Install Node.js & npm
1. Download Node.js from https://nodejs.org/
2. Install it (npm comes automatically)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Setup Backend Server

1. **Create a project folder:**
   ```bash
   mkdir cv-website-backend
   cd cv-website-backend
   ```

2. **Copy these files into your project folder:**
   - `package.json`
   - `backend-server.js`
   - `.env`

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   CV Backend Server running on http://localhost:5000
   API documentation available at http://localhost:5000/api/health
   ```

---

## 📋 Database Schema

### Tables Structure

#### 1. **personal_info**
```sql
- id (PRIMARY KEY)
- full_name (TEXT)
- title (TEXT)
- email (TEXT)
- phone (TEXT)
- location (TEXT)
- linkedin_url (TEXT)
- summary (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### 2. **experience**
```sql
- id (PRIMARY KEY)
- job_title (TEXT)
- company_name (TEXT)
- start_date (TEXT)
- end_date (TEXT)
- is_current (BOOLEAN)
- description (TEXT)
- skills_used (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### 3. **education**
```sql
- id (PRIMARY KEY)
- degree_name (TEXT)
- field_of_study (TEXT)
- institution (TEXT)
- start_date (TEXT)
- end_date (TEXT)
- gpa (TEXT)
- description (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### 4. **courses**
```sql
- id (PRIMARY KEY)
- course_code (TEXT)
- course_name (TEXT)
- year (INTEGER)
- semester (INTEGER)
- description (TEXT)
- category (TEXT)
- created_at (DATETIME)
```

#### 5. **skills**
```sql
- id (PRIMARY KEY)
- skill_name (TEXT)
- category (TEXT)
- proficiency_level (TEXT)
- description (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### 6. **certifications**
```sql
- id (PRIMARY KEY)
- cert_name (TEXT)
- issuing_org (TEXT)
- issue_date (TEXT)
- expiration_date (TEXT)
- credential_id (TEXT)
- credential_url (TEXT)
- description (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

---

## 🔌 API Endpoints

### Personal Info
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/personal-info` | Get all personal info |
| GET | `/api/personal-info/:id` | Get specific record |
| POST | `/api/personal-info` | Add new personal info |
| PUT | `/api/personal-info/:id` | Update personal info |

### Experience
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experience` | Get all experience |
| GET | `/api/experience/:id` | Get specific experience |
| POST | `/api/experience` | Add new experience |
| PUT | `/api/experience/:id` | Update experience |
| DELETE | `/api/experience/:id` | Delete experience |

### Education
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/education` | Get all education |
| POST | `/api/education` | Add new education |
| PUT | `/api/education/:id` | Update education |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:year/:semester` | Get courses by year/semester |
| POST | `/api/courses` | Add new course |
| DELETE | `/api/courses/:id` | Delete course |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Get all skills |
| GET | `/api/skills/category/:category` | Get skills by category |
| POST | `/api/skills` | Add new skill |

### Certifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/certifications` | Get all certifications |
| POST | `/api/certifications` | Add new certification |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server status |

---

## 💻 Using the Frontend with Backend

1. **Replace your current HTML file with `cv-website-with-backend.html`**

2. **Make sure the backend is running:**
   ```bash
   npm start
   ```

3. **Open the HTML file in your browser**

4. **Click the "Admin Mode" button** in the top-right corner to:
   - Update personal information
   - Add professional experience
   - Add skills
   - Reload data from the API

---

## 📡 Example API Requests

### Add Experience (cURL)
```bash
curl -X POST http://localhost:5000/api/experience \
  -H "Content-Type: application/json" \
  -d '{
    "job_title": "Senior Business Intelligence Analyst",
    "company_name": "Tech Company Inc",
    "start_date": "2022-01-15",
    "end_date": null,
    "is_current": true,
    "description": "Led development of enterprise BI solutions..."
  }'
```

### Add Skill (cURL)
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "skill_name": "Power BI",
    "category": "Business Intelligence & Analytics",
    "proficiency_level": "Advanced"
  }'
```

### Add Course (cURL)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "course_code": "CSE101",
    "course_name": "Computer Technology",
    "year": 1,
    "semester": 1,
    "category": "Foundation"
  }'
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

---

## 🔐 Deployment Options

### Option 1: Heroku (Easy & Free)

1. **Create Heroku account** at https://www.heroku.com/

2. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

3. **Login to Heroku:**
   ```bash
   heroku login
   ```

4. **Create Heroku app:**
   ```bash
   heroku create your-cv-app-name
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **Update frontend API URL** in `cv-website-with-backend.html`:
   ```javascript
   const API_URL = 'https://your-cv-app-name.herokuapp.com/api';
   ```

### Option 2: DigitalOcean App Platform

1. Connect your GitHub repo
2. Create new app
3. Set environment variables
4. Deploy

### Option 3: AWS/Google Cloud/Azure

More complex but highly scalable. Follow their respective documentation.

---

## 🐛 Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:** Run `npm install` in your project folder

### Problem: "Port 5000 already in use"
**Solution:** 
- Change PORT in `.env` file
- Or kill the process using port 5000:
  ```bash
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # On macOS/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Problem: CORS errors in browser console
**Solution:** Make sure the backend server is running and accessible at http://localhost:5000

### Problem: Admin panel not showing data
**Solution:** 
1. Check browser console for errors (F12)
2. Verify backend is running
3. Click "Reload Data from API" button

---

## 📊 Populating Initial Data

You can populate your database using Postman or the provided Admin Panel:

1. **Using Admin Panel:**
   - Click "Admin Mode" button
   - Fill in forms and click respective "Save" buttons

2. **Using Postman:**
   - Import the API endpoints
   - Send POST requests with JSON data

3. **Using a Script:**
   Create a `seed.js` file to populate initial data:
   ```javascript
   const fetch = require('node-fetch');
   const API_URL = 'http://localhost:5000/api';

   async function seedDatabase() {
     // Add courses
     const courses = [
       { course_code: 'CSE101', course_name: 'Computer Technology', year: 1, semester: 1 },
       // ... more courses
     ];

     for (const course of courses) {
       await fetch(`${API_URL}/courses`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(course)
       });
     }
   }

   seedDatabase();
   ```

---

## 🔄 Frontend-Backend Integration Flow

```
User Interface (HTML/JS)
         ↓
Admin Panel Form Submission
         ↓
Fetch API Request (JSON)
         ↓
Node.js/Express Server
         ↓
SQLite Database
         ↓
Response (JSON)
         ↓
Update Frontend Display
```

---

## 📝 Environment Variables (.env)

```env
# Server Port
PORT=5000

# Environment
NODE_ENV=development

# Database
DATABASE_PATH=./cv_database.db

# CORS Settings
CORS_ORIGIN=http://localhost:3000
```

---

## 🚀 Next Steps

1. **Populate Your Data:**
   - Use Admin Panel or API to add your actual CV data
   - Update courses with your specific coursework

2. **Customize Frontend:**
   - Update styling if needed
   - Modify sections as required

3. **Deploy:**
   - Choose a hosting platform
   - Deploy backend and frontend

4. **Secure Your API:**
   - Add authentication (JWT tokens)
   - Implement rate limiting
   - Add input validation

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors (F12)
4. Check terminal for backend errors

---

## 📚 Additional Resources

- **Express.js Documentation:** https://expressjs.com/
- **SQLite Documentation:** https://www.sqlite.org/docs.html
- **Node.js Documentation:** https://nodejs.org/docs/
- **REST API Best Practices:** https://restfulapi.net/

---

**Created:** January 2026
**Version:** 1.0.0
**License:** MIT
