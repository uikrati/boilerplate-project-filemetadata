
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();

// Set up the view engine
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});


// Set up your middleware and routes here

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



