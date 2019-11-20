const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const async = require('async')
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

    const params = { pageSize: 100 };
    // params.q = query;
    const res = await drive.files.list(params);
    console.log(res.data);

  }
});




