const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

// Set up the view engine
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Handle the file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start your server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
