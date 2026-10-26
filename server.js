const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789', // Replace with your actual MySQL password
    database: 'library_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL library_db');
});

// Root route now redirects to Login page first
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Authentication Routes
app.get('/register', (req, res) => res.render('register'));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO USERS (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
            console.error(err);
            return res.redirect('/register');
        }
        res.redirect('/login');
    });
});

app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM USERS WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.redirect('/dashboard'); // Goes to dashboard after successful login
        } else {
            res.redirect('/login');
        }
    });
});

// Dashboard & CRUD Routes (Protected)
app.get('/dashboard', (req, res) => {
    const bookQuery = 'SELECT * FROM BOOK';
    const authorQuery = 'SELECT * FROM AUTHOR';

    db.query(bookQuery, (err, books) => {
        if (err) throw err;
        db.query(authorQuery, (err, authors) => {
            if (err) throw err;
            res.render('index', { books, authors });
        });
    });
});

app.get('/author/add', (req, res) => res.render('add_author'));
app.get('/book/add', (req, res) => {
    db.query('SELECT * FROM AUTHOR', (err, authors) => {
        if (err) throw err;
        res.render('add_book', { authors });
    });
});

app.post('/author/add', (req, res) => {
    const { name, country } = req.body;
    db.query('INSERT INTO AUTHOR (name, country) VALUES (?, ?)', [name, country], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.post('/book/add', (req, res) => {
    const { title, price, author_id } = req.body;
    db.query('INSERT INTO BOOK (title, price, author_id) VALUES (?, ?, ?)', [title, price, author_id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.get('/author/edit/:id', (req, res) => {
    db.query('SELECT * FROM AUTHOR WHERE author_id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('edit_author', { author: results[0] });
    });
});

app.post('/author/edit/:id', (req, res) => {
    const { name, country } = req.body;
    db.query('UPDATE AUTHOR SET name = ?, country = ? WHERE author_id = ?', [name, country, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.get('/book/edit/:id', (req, res) => {
    db.query('SELECT * FROM BOOK WHERE book_id = ?', [req.params.id], (err, bookResults) => {
        if (err) throw err;
        db.query('SELECT * FROM AUTHOR', (err, authors) => {
            if (err) throw err;
            res.render('edit_book', { book: bookResults[0], authors });
        });
    });
});

app.post('/book/edit/:id', (req, res) => {
    const { title, price, author_id } = req.body;
    db.query('UPDATE BOOK SET title = ?, price = ?, author_id = ? WHERE book_id = ?', [title, price, author_id, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.get('/book/delete/:id', (req, res) => {
    db.query('DELETE FROM BOOK WHERE book_id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.get('/author/delete/:id', (req, res) => {
    db.query('DELETE FROM AUTHOR WHERE author_id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});