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

    const originFileId = '1kd6tVuBBvtBndeYEjnLl9e8JKzIfPSKfigLgQrWtMF4'
    var requestBody = { title: new Date().getTime() };
    drive.files.copy({
      fileId: originFileId,
      requestBody
    }).then((resp) => {
      console.log('resp', resp)
    });

  }
});













