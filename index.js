const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
// const util = require('util');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/documents.readonly']);


//authenticate request
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");

    const docs = google.docs({
      version: 'v1',
      auth: jwtClient,
    });

    docs.documents.get({
      documentId: '1jUzfIDkINe53H1c5pCW9CNjXLe36JnXYb2AeDGLpW8Q'
    }).then((res) => {
      console.log('res', res);
      console.log('res.data', res.data);

    }).catch((e) => {
      console.log('error', e);

    });
  }
});