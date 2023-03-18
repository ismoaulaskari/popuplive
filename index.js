//an upload form that takes a file to save to your local server
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

const doctype = '<!DOCTYPE html>\n<html><body>';
const formData = 'Hello! Here you can send files to the gallery:<form action="/foo/fileupload" method="post" enctype="multipart/form-data"><input type="file" id="sampleFile" name="userfile"/><br/><br/><input type="submit" value="Send file"/></form></body></<html>';

app.use(logger)

// safer options
app.use(fileUpload({
  safeFileNames : true,
  preserveExtension : 4,
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.get('/', function (req, res) {
  return res.status(200).send(doctype + formData);
});

app.post('/fileupload', function (req, res) {
  //console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "userfile") is used to retrieve the uploaded file
  let sampleFile = req.files.userfile;
  console.log('Received upload ' + req.files.userfile.name)
  // Use the mv() method to place the file somewhere on your server
  // don't give access rights to other directories!
  sampleFile.mv(`/var/www/foo/${req.files.userfile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send(doctype + "File " + req.files.userfile.name + " uploaded!<br/><br/>\n" + formData);
  });
});

//hide this in your lan or protect it otherwise
const PORT = 59999
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
