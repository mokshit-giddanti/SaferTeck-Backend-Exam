const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use(bodyParser.json());

// supported File extensions from the exam document
const supportedExtensions = ['log', 'txt', 'json', 'yaml', 'xml', 'js'];

// Endpoint to create a file
app.post('/createFile', (req, res) => {
    const { filename, content } = req.body;
    console.log(filename);
  
    if (!filename) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
  
    const extension = path.extname(filename).slice(1);
    if (!supportedExtensions.includes(extension)) {
      return res.status(400).json({ error: 'Unsupported file extension' });
    }
  
    const filePath = path.join(__dirname, 'files', filename);
  
    if (fs.existsSync(filePath)) {
      return res.status(400).json({ error: 'File already exists' });
    }
  
    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.sendStatus(200);
    });
  });


// Endpoint to get a list of uploaded files
app.get('/getFiles', (req, res) => {
  const filesDir = path.join(__dirname, 'files');

  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ files });
  });
});

// Endpoint to get the content of a file
// Endpoint to get the content of a file
app.get('/getFile', (req, res) => {
    const { filename } = req.query;
  
    if (!filename) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
  
    const filePath = path.join(__dirname, 'files', filename);
  
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ error: 'File not found' });
    }
  
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.send(fileContent);
  });
  

// Endpoint to modify file content
app.put('/modifyFile', (req, res) => {
  const { filename, content } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const filePath = path.join(__dirname, 'files', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'File not found' });
  }

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.sendStatus(200);
  });
});

// Endpoint to delete a file
app.delete('/deleteFile', (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const filePath = path.join(__dirname, 'files', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'File not found' });
  }

  fs.unlink(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});