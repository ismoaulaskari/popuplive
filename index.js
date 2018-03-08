const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const logger = (request, response, next) => {
  //  console.log(request)
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  //console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)

// default options
app.use(fileUpload());

app.post('/fileupload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.userfile;
  console.log(req.files)
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`/var/www/www/spjkl/public/${req.files.userfile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

const PORT = 9999
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
