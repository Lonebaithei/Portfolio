# 🚀 Quick Start - 5 Minutes to Production

## What You Have

✅ **Complete Backend System** (Node.js + Express + SQLite)
✅ **REST API** with 6 data tables
✅ **Integrated Frontend** with Admin Panel
✅ **PDF Export** functionality
✅ **Database** (SQLite - no setup needed!)

---

## ⚡ Get Running in 5 Steps

### 1️⃣ Download & Install Node.js (2 min)
- Go to https://nodejs.org/ → Download LTS
- Install it
- Verify: Open terminal/command prompt
  ```bash
  node --version
  npm --version
  ```

### 2️⃣ Create Project Folder (30 sec)
```bash
mkdir cv-website-backend
cd cv-website-backend
```

### 3️⃣ Copy 4 Files (1 min)
Copy these files into your project folder:
- `backend-server.js`
- `package.json`
- `.env`
- `cv-website-with-backend.html`

### 4️⃣ Install Dependencies (1 min)
In terminal, run:
```bash
npm install
```

### 5️⃣ Start Server (30 sec)
```bash
npm start
```

You should see:
```
CV Backend Server running on http://localhost:5000
```

---

## 🎯 Start Using It

1. **Open HTML file in browser:**
   - Save `cv-website-with-backend.html` on your computer
   - Double-click to open it

2. **Click "Admin Mode"** (top-right corner)

3. **Add Your Data:**
   - Fill in personal information
   - Add your work experience
   - Add your skills
   - Click Save buttons

4. **Data is automatically saved** to the SQLite database!

---

## 📊 What's in the Backend?

| File | Purpose |
|------|---------|
| `backend-server.js` | Main server code |
| `package.json` | Lists dependencies to install |
| `.env` | Configuration (port, database path) |
| `cv_database.db` | Auto-created database (don't edit!) |

---

## 🔗 API Endpoints (for advanced use)

```
GET    http://localhost:5000/api/personal-info
GET    http://localhost:5000/api/experience
GET    http://localhost:5000/api/education
GET    http://localhost:5000/api/courses
GET    http://localhost:5000/api/skills
GET    http://localhost:5000/api/certifications

POST   http://localhost:5000/api/experience
POST   http://localhost:5000/api/skills
POST   http://localhost:5000/api/courses
```

---

## 🎁 Bonus Features

✨ **Admin Panel** - Edit data without touching code
✨ **Auto-reload** - Changes appear instantly
✨ **PDF Export** - Download course list & licenses
✨ **CORS Enabled** - Can be deployed anywhere
✨ **Production Ready** - Deploy to Heroku, DigitalOcean, AWS

---

## 💾 Your Data

- **Location:** `cv_database.db` (in your project folder)
- **Format:** SQLite (industry standard)
- **Backup:** Copy this file to backup your data
- **Migrate:** Easy to move to any database

---

## 🚀 Next: Deploy to Cloud (Optional)

### Deploy to Heroku (Free)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-cv-api

# Deploy
git init
git add .
git commit -m "Initial"
git push heroku main
```

Your API is now live at: `https://your-cv-api.herokuapp.com/api`

---

## 🆘 Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| "npm: command not found" | Reinstall Node.js |
| "Port 5000 already in use" | Change PORT in `.env` file |
| "Cannot GET /api/courses" | Backend not running - run `npm start` |
| No data showing | Click "Reload Data from API" |
| CORS errors | Backend needs to be running |

---

## 📱 Mobile Access

Access from phone/tablet:
1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```
2. On mobile, open: `http://<your-ip>:5000` (instead of localhost)

---

## 📖 Full Documentation

For more details, see:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `INTEGRATION_GUIDE.md` - API endpoints & deployment options

---

## ✅ You're All Set!

Your CV website backend is now:
- ✅ Running locally on port 5000
- ✅ Ready to receive data through Admin Panel
- ✅ Storing data in SQLite database
- ✅ Ready to be deployed to production

**Next step:** Add your CV data through Admin Panel and deploy! 🎉

---

**Questions?** Check the documentation files or browser console (F12) for errors.
