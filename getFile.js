const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const util = require('util')

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

    const docs = google.docs({
      version: 'v1',
      auth: jwtClient,
    });

    const documentId = '1pGLqNNcu0J17OAVuVDLjHqhRyhrOUmBcTXeZ0WGNbfo';
    const res = await docs.documents.get({
      documentId
    });
    console.log(JSON.stringify(res.data));
    // console.log(util.inspect(res.data, false, 17));
    // return res.data;

  }
});











