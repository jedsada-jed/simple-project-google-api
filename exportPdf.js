const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const async = require('async')
const fs = require('fs');
const os = require('os');
const path = require('path');

// const util = require('util');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/drive']);


//authenticate request
jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");

    const drive = google.drive({
      version: 'v3',
      auth: jwtClient,
    });

    const fileId = '1WtwxmCpPZhkiuMoPbIlJ48MYkL0b3PaEUG9wrVHXcJU';
    // const destPath = path.join(os.tmpdir(), 'important.pdf');
    var dest = fs.createWriteStream('/tmp/111test12345.pdf');
    console.log('dest', dest)
    await drive.files.export({
      fileId: fileId,
      mimeType: 'application/pdf'
    }, {
      responseType: 'stream'
    }, function (err, response) {
      if (err) return done(err);

      response.data.on('error', err => {
        // done(err);
      }).on('end', () => {
        // done();
      })
        .pipe(dest);
    });



    // var dest = fs.createWriteStream('/tmp/first_doc.pdf');
    // drive.files.export({
    //   fileId: fileId,
    //   mimeType: 'application/pdf'
    // }).p
    // .on('end', function () {
    //   console.log('Done');
    // })
    // .on('error', function (err) {
    //   console.log('Error during download', err);
    // })
    // .pipe(dest);
  }
});











