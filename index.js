const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up the view engine
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Route to handle file upload and provide metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const file = req.file;
  const metadata = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };

  res.json(metadata);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
