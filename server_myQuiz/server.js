// import the Express module:
const express = require('express');
// create an instance of the Express application:
const app = express();


// enable cors for the Express application
// cors is a middleware to handle cross-origin resource sharing
const cors = require('cors');
app.use(cors()); 

// parse incoming requests provided by Express
app.use(express.json());

// enable mysql
const mysql = require('mysql');

// enable multer for uploading files
const multer = require('multer');
// set the destination folder to store uploaded files
const upload = multer({dest:'uploads/'});

// enabe fs (file system), path and csv module.
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');


// setup the database connections
const db_config = {
    host: 'localhost',
    user: 'quizApp',
    password: 'MNix9Lsr2JnvAZt',
    database: 'quizApp'
};

const db_connection = mysql.createConnection(db_config);
db_connection.connect((error) => {
    if (error){
        console.error('Error connecting to the database: ', error);
        res.status(500).send('Error connecting to the database');
        return;
    }
});


// APIs
// ----------------------------------------------
// API: verify-register
//    args: username
app.post('/api/verifyregister', (req, res) => {
    const username = req.body.username;
    const query = 'SELECT * FROM users WHERE username = ?';
    const values = [username];
        
    db_connection.query(query, values, (error, result) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            // send error message to client
            res.status(500).send('Internal error: registration error!');
        } 

        if (result.length > 0) {
            res.send({message: "The email address already exists!"});               
        } else {
            res.send(result);
        }
    });
});


// API: register
//   args: username, password
app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [username, password];
            
    db_connection.query(query, values, (error, result) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            // send error message to client
            res.status(500).send('Internal error: Error storing registration information');
        }
    });
});


// API: login
//   args: username, password
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT username FROM users WHERE username = ? AND password = ?';
    const values = [username, password];
            
    db_connection.query(query, values, (error, result) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            // send error message to client
            res.status(500).send('Internal error: Error login the App');
        } 

        if (result.length > 0) {
            // login sucessful, send token to client
            res.send({message: "", token: result[0].username})
        } else {
            res.send({message: "Wrong username/password combination!", token: ""});
        }

    });
});


// API: upload and process quiz from a file
//   args: file
// set up the route to handle file upload --admin upload
// sets up a route handler for the HTTP POST request to the '/api/upload' endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file via req.file
    const uploadedFile = req.file;

    // Read the uploaded CSV file and save content to the database
    const filePath = path.join(__dirname, uploadedFile.path);
    // Create a csv parser and set options
    const csvParser = csv.parse({
        delimiter: ',',
        quote: '"',
        relax_column_count: true,
        relax: true,
    });

    let isFirstLine = true;
    // Read csv file and process row by row
    fs.createReadStream(filePath)
      .pipe(csvParser)
      .on('data', (row) => {
            if (isFirstLine) {
                // skip the first line or header
                isFirstLine = false;
                return;
            }

            // insert the line into the database
            const query = 'INSERT INTO quiz(quizID, question, questionType, answer) VALUES (?, ?, ?, ?)';
            const values = [row[0], row[1], row[2], row[3]];
            
            db_connection.query(query, values, (error, result) => {
                if (error) {
                    // logging to the console
                    console.error('Error executing query: ', error);
                    // send error message to client
                    res.status(500).send('Internal error: Error on storing file');
                }
            });
      })
    
    // This header allows cross-origin requests from any origin.
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
        'message': 'File uploaded and stored successfully',
    });
});


// API: insert quiz data
//   args: quizID, question, question type, answer
app.post('/api/uploadquizdata', (req, res) => {
    req.body.forEach(question => {
        // insert the line into the database
        const query = 'INSERT INTO quiz(quizID, question, questionType, answer) VALUES (?, ?, ?, ?)';
        // const values = [row[0], row[1], row[2], row[3]];
        const values = [question.quizID, question.question, question.questionType, question.correctAnswer];

        db_connection.query(query, values, (error, result) => {
            if (error) {
                // logging to the console
                console.error('Error executing query: ', error);
                // send error message to client
                res.status(500).send('Internal error: Error on storing file');
            }
        });
    });
    res.json({"result": "successful"});
    
});

// API: query quiz by id
//    args: quiz id
app.get('/api/quiz/:id', (req, res) => {
    const quizId = req.params.id;
    // fetch the data
    const query = 'SELECT quizID, questionID, question, questionType, answer FROM quiz WHERE quizID = ' + quizId;
    db_connection.query(query, (error, results) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal error: Error on executing query');
        }
        res.json(results);
    });
});


// API: create an assignment from a quiz
//    args: quiz id, assignment
app.get('/api/assignment/:quizID/:assignmentID', (req, res) => {
    const quizId = req.params.quizID;
    const assignmentID = req.params.assignmentID;

    const query = `INSERT INTO Assignment (assignmentName, quizID, question, questionType, answer) 
        SELECT "${assignmentID}", quizID, question, questionType, answer 
        FROM quiz WHERE quizID = ${quizId}`;
    db_connection.query(query, (error, results) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal error: Error on executing query');
        }
        res.json(results);
    });
});


//API: fetch all assignments' name
app.get('/api/fetchAssignmentName', (req, res) => {
    // fetch the data
    const query = 'SELECT distinct assignmentName FROM Assignment';
    db_connection.query(query, (error, results) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal error: Error on executing query');
        }
        res.json(results);
    });
});


// API: query assignment by name
//    args: assignment name
app.get('/api/displayQuiz/:assignmentName', (req, res) => {
    const assignmentName = req.params.assignmentName;
    const query = `SELECT question, questionType, answer 
    FROM quizApp.Assignment 
    WHERE assignmentName = "${assignmentName}"`;
    db_connection.query(query, (error, results) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal error: Error on executing query');
            return;
        }
        res.json(results);
    });
});


// API: save submission
//   args: id, username, assignment name, score
app.post('/api/savesubmission', (req, res) => {
    const query = 'INSERT INTO submissions (submissionID, username, assignmentName, score) VALUES (?, ?, ?, ?)';
    const values = [req.body[0], req.body[1], req.body[2], req.body[3]];
    db_connection.query(query, values, (error, result) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal error: Error on saving submission information.');
        }
    });
    res.json({"result": "successful"});

});


//API: get all submissions
app.get('/api/fetchsubmission', (req, res) => {
    const query = 'SELECT submissionID, username, assignmentName, score, timeStamp FROM submissions';
    db_connection.query(query, (error, results) => {
        if (error) {
            // logging to the console
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Error: Error on executing query');
        }
        res.json(results);
    });
});


// Start server
const port = 8000;
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
});