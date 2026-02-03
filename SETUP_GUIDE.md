# CV Website Backend - Complete Setup Documentation

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        WEB BROWSER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  cv-website-with-backend.html                           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  Admin Panel                                        │ │   │
│  │  │  - Update Personal Info                             │ │   │
│  │  │  - Add Experience                                   │ │   │
│  │  │  - Add Skills                                       │ │   │
│  │  │  - Reload Data                                      │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬─────────────────────────────────────────────────┘
                 │ HTTP Requests (JSON)
                 │ CORS Enabled
                 │
┌────────────────▼─────────────────────────────────────────────────┐
│              NODE.JS/EXPRESS SERVER (Port 5000)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  REST API Endpoints                                      │   │
│  │  ✓ /api/personal-info                                   │   │
│  │  ✓ /api/experience                                      │   │
│  │  ✓ /api/education                                       │   │
│  │  ✓ /api/courses                                         │   │
│  │  ✓ /api/skills                                          │   │
│  │  ✓ /api/certifications                                  │   │
│  │  ✓ /api/health                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬─────────────────────────────────────────────────┘
                 │ SQL Queries
                 │
┌────────────────▼─────────────────────────────────────────────────┐
│              SQLITE DATABASE (cv_database.db)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Tables:                                                 │   │
│  │  • personal_info      (CV owner information)             │   │
│  │  • experience         (Job history)                      │   │
│  │  • education          (Degrees & qualifications)         │   │
│  │  • courses            (Coursework with semesters)        │   │
│  │  • skills             (Categorized skills)               │   │
│  │  • certifications     (Licenses & certificates)          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Installation Steps

### Step 1: Download Node.js
- Visit: https://nodejs.org/
- Download LTS version
- Install and verify:
  ```bash
  node --version
  npm --version
  ```

### Step 2: Create Project Folder
```bash
mkdir cv-website-backend
cd cv-website-backend
```

### Step 3: Copy Files
Copy these 4 files into your project folder:
1. `package.json` - Dependencies list
2. `backend-server.js` - Server code
3. `.env` - Configuration
4. `cv-website-with-backend.html` - Frontend (save separately)

### Step 4: Install Dependencies
```bash
npm install
```

This installs:
- **express** - Web framework
- **sqlite3** - Database
- **cors** - Cross-origin support
- **body-parser** - JSON parsing
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto-reload during development

### Step 5: Start Server
```bash
npm start
```

Expected output:
```
CV Backend Server running on http://localhost:5000
API documentation available at http://localhost:5000/api/health
```

---

## 🌐 Frontend Setup

### Option A: Local File
1. Save `cv-website-with-backend.html` to your computer
2. Open it in your web browser
3. Make sure backend is running (Step 5 above)
4. Click "Admin Mode" to manage CV data

### Option B: Live Server (Recommended for Development)
1. Install VS Code Live Server extension
2. Open `cv-website-with-backend.html` in VS Code
3. Right-click → "Open with Live Server"
4. Server automatically reloads on file changes

---

## 👨‍💼 Admin Panel Features

### Access Admin Panel
- Click "Admin Mode" button in top-right corner

### Update Personal Information
- Full Name
- Professional Title
- Email
- Phone
- Location
- Professional Summary

### Add Professional Experience
- Job Title
- Company Name
- Start Date
- End Date (optional - leaves blank if current)
- Job Description

### Add Skills
- Skill Name
- Category (BI & Analytics, Technical, Soft Skills, Operational)
- Proficiency Level

### Reload Data
- Click "Reload Data from API" to fetch latest changes from database

---

## 📝 Example: Populate Your Data

### 1. Add Your Personal Information
```javascript
{
  "full_name": "Your Name",
  "title": "Data Analyst & BI Specialist",
  "email": "your.email@example.com",
  "phone": "+267 76 XXXX XXX",
  "location": "Gaborone, Botswana",
  "summary": "Data professional with BI expertise..."
}
```

### 2. Add Your Courses
```javascript
{
  "course_code": "CSE101",
  "course_name": "Computer Technology",
  "year": 1,
  "semester": 1,
  "category": "Foundation"
}
```

### 3. Add Your Skills
```javascript
{
  "skill_name": "Power BI",
  "category": "Business Intelligence & Analytics",
  "proficiency_level": "Advanced"
}
```

### 4. Add Your Experience
```javascript
{
  "job_title": "Senior Business Intelligence Analyst",
  "company_name": "Tech Solutions Inc",
  "start_date": "2022-01-15",
  "end_date": null,
  "is_current": true,
  "description": "Led enterprise BI solution development..."
}
```

---

## 🔌 API Usage Examples

### Using Postman (Recommended)

1. **Download Postman** from https://www.postman.com/downloads/
2. **Create New Request**
3. **Select Method** (GET, POST, PUT, DELETE)
4. **Enter URL**: `http://localhost:5000/api/endpoint`
5. **Add Headers**: 
   - Key: `Content-Type`
   - Value: `application/json`
6. **Add Body** (JSON for POST/PUT)
7. **Send Request**

### Using cURL (Command Line)

#### Get All Skills
```bash
curl http://localhost:5000/api/skills
```

#### Add New Skill
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -d '{"skill_name":"Python","category":"Technical","proficiency_level":"Advanced"}'
```

#### Get All Experience
```bash
curl http://localhost:5000/api/experience
```

#### Add Experience
```bash
curl -X POST http://localhost:5000/api/experience \
  -H "Content-Type: application/json" \
  -d '{
    "job_title":"Data Analyst",
    "company_name":"Company XYZ",
    "start_date":"2021-06-01",
    "end_date":"2022-12-31",
    "description":"Analyzed data and created reports"
  }'
```

---

## 🚀 Deployment Guide

### Deploy to Heroku (Easiest)

1. **Create Account**
   - Visit https://www.heroku.com/
   - Sign up for free account

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Login to Heroku**
   ```bash
   heroku login
   ```

5. **Create Heroku App**
   ```bash
   heroku create your-cv-api
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **View Logs**
   ```bash
   heroku logs --tail
   ```

8. **Update Frontend API URL**
   In `cv-website-with-backend.html`, change:
   ```javascript
   const API_URL = 'https://your-cv-api.herokuapp.com/api';
   ```

### Deploy to DigitalOcean

1. Create account at https://www.digitalocean.com/
2. Create new App
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

### Deploy to Your Own Server

1. **SSH into server**
   ```bash
   ssh user@your-server.com
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repository**
   ```bash
   git clone https://github.com/your-username/cv-website-backend.git
   cd cv-website-backend
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Install PM2** (process manager)
   ```bash
   npm install -g pm2
   ```

6. **Start with PM2**
   ```bash
   pm2 start backend-server.js --name "cv-api"
   ```

---

## 🔐 Security Best Practices

### 1. Add Authentication (Optional)
```javascript
// Install jwt dependency
npm install jsonwebtoken

// Add to backend-server.js
const jwt = require('jsonwebtoken');

// Protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
```

### 2. Add Rate Limiting
```javascript
npm install express-rate-limit

// In backend-server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### 3. Input Validation
```javascript
npm install joi

// Validate request body
const schema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    // ... more validations
});
```

### 4. Use HTTPS in Production
- Get SSL certificate (Let's Encrypt is free)
- Force HTTPS redirects
- Set secure cookies

---

## 📱 Mobile Responsive

The website is already mobile-responsive. On mobile devices:
- Single column layout
- Touch-friendly admin panel
- Readable on all screen sizes

To test on mobile:
1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Select device preset

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot GET /api/courses" | Backend not running. Run `npm start` |
| CORS errors | Make sure CORS is enabled in backend (already configured) |
| Port 5000 in use | Change PORT in .env file to 5001, 5002, etc. |
| Database locked | Stop server, delete cv_database.db, restart |
| Courses not showing | Make sure courses are added via API first |
| Admin panel blank | Check browser console (F12) for errors |

---

## 📞 Getting Help

1. **Check the logs:**
   ```bash
   # Terminal where backend is running shows errors
   ```

2. **Browser Console:**
   - Press F12 in browser
   - Check Console tab for errors

3. **Test API endpoint:**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **Restart everything:**
   - Stop backend (Ctrl+C)
   - Stop frontend
   - Delete `cv_database.db`
   - Run `npm start` again

---

## 📚 File Structure

```
cv-website-backend/
├── backend-server.js          # Main server file
├── package.json               # Dependencies
├── .env                       # Configuration
├── cv_database.db            # SQLite database (auto-created)
├── cv-website-with-backend.html    # Frontend file
├── INTEGRATION_GUIDE.md       # This file
└── node_modules/             # Installed packages
    ├── express/
    ├── sqlite3/
    ├── cors/
    ├── body-parser/
    └── dotenv/
```

---

## ✅ Verification Checklist

- [ ] Node.js installed and verified
- [ ] Project folder created
- [ ] Files copied to project folder
- [ ] `npm install` completed successfully
- [ ] Backend starts with `npm start`
- [ ] Can access http://localhost:5000/api/health
- [ ] Frontend HTML file works
- [ ] Admin Mode button appears
- [ ] Can add data through Admin Panel
- [ ] Data persists in database

---

## 🎓 Learning Resources

- **Node.js Tutorial:** https://nodejs.org/en/docs/guides/
- **Express.js Guide:** https://expressjs.com/
- **SQLite Tutorial:** https://www.sqlitetutorial.net/
- **REST API Design:** https://restfulapi.net/
- **JavaScript Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

**Last Updated:** January 2026
**Version:** 1.0.0
**Status:** Production Ready
