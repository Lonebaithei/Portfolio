// CV Website Backend Server
// Node.js + Express + SQLite

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'cv_database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Personal Info Table
        db.run(`
            CREATE TABLE IF NOT EXISTS personal_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                title TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                location TEXT NOT NULL,
                linkedin_url TEXT,
                summary TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Professional Experience Table
        db.run(`
            CREATE TABLE IF NOT EXISTS experience (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_title TEXT NOT NULL,
                company_name TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT,
                is_current BOOLEAN DEFAULT 0,
                description TEXT,
                skills_used TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Education Table
        db.run(`
            CREATE TABLE IF NOT EXISTS education (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                degree_name TEXT NOT NULL,
                field_of_study TEXT NOT NULL,
                institution TEXT NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                gpa TEXT,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Courses Table
        db.run(`
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_code TEXT NOT NULL,
                course_name TEXT NOT NULL,
                year INTEGER NOT NULL,
                semester INTEGER NOT NULL,
                description TEXT,
                category TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Skills Table
        db.run(`
            CREATE TABLE IF NOT EXISTS skills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                skill_name TEXT NOT NULL,
                category TEXT NOT NULL,
                proficiency_level TEXT,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Certifications Table
        db.run(`
            CREATE TABLE IF NOT EXISTS certifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cert_name TEXT NOT NULL,
                issuing_org TEXT NOT NULL,
                issue_date TEXT,
                expiration_date TEXT,
                credential_id TEXT,
                credential_url TEXT,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database tables initialized successfully');
    });
}

// ==================== PERSONAL INFO ENDPOINTS ====================

// GET all personal info
app.get('/api/personal-info', (req, res) => {
    db.all('SELECT * FROM personal_info', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single personal info record
app.get('/api/personal-info/:id', (req, res) => {
    db.get('SELECT * FROM personal_info WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// POST new personal info
app.post('/api/personal-info', (req, res) => {
    const { full_name, title, email, phone, location, linkedin_url, summary } = req.body;
    
    db.run(
        'INSERT INTO personal_info (full_name, title, email, phone, location, linkedin_url, summary) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [full_name, title, email, phone, location, linkedin_url, summary],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Personal info added successfully' });
        }
    );
});

// UPDATE personal info
app.put('/api/personal-info/:id', (req, res) => {
    const { full_name, title, email, phone, location, linkedin_url, summary } = req.body;
    
    db.run(
        'UPDATE personal_info SET full_name = ?, title = ?, email = ?, phone = ?, location = ?, linkedin_url = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [full_name, title, email, phone, location, linkedin_url, summary, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Personal info updated successfully' });
        }
    );
});

// ==================== EXPERIENCE ENDPOINTS ====================

// GET all experience
app.get('/api/experience', (req, res) => {
    db.all('SELECT * FROM experience ORDER BY start_date DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET single experience
app.get('/api/experience/:id', (req, res) => {
    db.get('SELECT * FROM experience WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// POST new experience
app.post('/api/experience', (req, res) => {
    const { job_title, company_name, start_date, end_date, is_current, description, skills_used } = req.body;
    
    db.run(
        'INSERT INTO experience (job_title, company_name, start_date, end_date, is_current, description, skills_used) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [job_title, company_name, start_date, end_date, is_current || 0, description, skills_used],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Experience added successfully' });
        }
    );
});

// UPDATE experience
app.put('/api/experience/:id', (req, res) => {
    const { job_title, company_name, start_date, end_date, is_current, description, skills_used } = req.body;
    
    db.run(
        'UPDATE experience SET job_title = ?, company_name = ?, start_date = ?, end_date = ?, is_current = ?, description = ?, skills_used = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [job_title, company_name, start_date, end_date, is_current || 0, description, skills_used, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Experience updated successfully' });
        }
    );
});

// DELETE experience
app.delete('/api/experience/:id', (req, res) => {
    db.run('DELETE FROM experience WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Experience deleted successfully' });
    });
});

// ==================== EDUCATION ENDPOINTS ====================

// GET all education
app.get('/api/education', (req, res) => {
    db.all('SELECT * FROM education ORDER BY end_date DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST new education
app.post('/api/education', (req, res) => {
    const { degree_name, field_of_study, institution, start_date, end_date, gpa, description } = req.body;
    
    db.run(
        'INSERT INTO education (degree_name, field_of_study, institution, start_date, end_date, gpa, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [degree_name, field_of_study, institution, start_date, end_date, gpa, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Education added successfully' });
        }
    );
});

// UPDATE education
app.put('/api/education/:id', (req, res) => {
    const { degree_name, field_of_study, institution, start_date, end_date, gpa, description } = req.body;
    
    db.run(
        'UPDATE education SET degree_name = ?, field_of_study = ?, institution = ?, start_date = ?, end_date = ?, gpa = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [degree_name, field_of_study, institution, start_date, end_date, gpa, description, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Education updated successfully' });
        }
    );
});

// ==================== COURSES ENDPOINTS ====================

// GET all courses
app.get('/api/courses', (req, res) => {
    db.all('SELECT * FROM courses ORDER BY year ASC, semester ASC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET courses by year and semester
app.get('/api/courses/:year/:semester', (req, res) => {
    db.all('SELECT * FROM courses WHERE year = ? AND semester = ?', [req.params.year, req.params.semester], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST new course
app.post('/api/courses', (req, res) => {
    const { course_code, course_name, year, semester, description, category } = req.body;
    
    db.run(
        'INSERT INTO courses (course_code, course_name, year, semester, description, category) VALUES (?, ?, ?, ?, ?, ?)',
        [course_code, course_name, year, semester, description, category],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Course added successfully' });
        }
    );
});

// DELETE course
app.delete('/api/courses/:id', (req, res) => {
    db.run('DELETE FROM courses WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Course deleted successfully' });
    });
});

// ==================== SKILLS ENDPOINTS ====================

// GET all skills
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills ORDER BY category ASC, skill_name ASC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET skills by category
app.get('/api/skills/category/:category', (req, res) => {
    db.all('SELECT * FROM skills WHERE category = ? ORDER BY skill_name ASC', [req.params.category], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST new skill
app.post('/api/skills', (req, res) => {
    const { skill_name, category, proficiency_level, description } = req.body;
    
    db.run(
        'INSERT INTO skills (skill_name, category, proficiency_level, description) VALUES (?, ?, ?, ?)',
        [skill_name, category, proficiency_level, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Skill added successfully' });
        }
    );
});

// ==================== CERTIFICATIONS ENDPOINTS ====================

// GET all certifications
app.get('/api/certifications', (req, res) => {
    db.all('SELECT * FROM certifications ORDER BY issue_date DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST new certification
app.post('/api/certifications', (req, res) => {
    const { cert_name, issuing_org, issue_date, expiration_date, credential_id, credential_url, description } = req.body;
    
    db.run(
        'INSERT INTO certifications (cert_name, issuing_org, issue_date, expiration_date, credential_id, credential_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cert_name, issuing_org, issue_date, expiration_date, credential_id, credential_url, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Certification added successfully' });
        }
    );
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend server is running', timestamp: new Date() });
});

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`CV Backend Server running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});
