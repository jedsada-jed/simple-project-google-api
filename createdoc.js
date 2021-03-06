const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const fs = require('fs');

// let rawdata = fs.readFileSync('simple2.json');
// let requestBody = JSON.parse(rawdata);
// console.log('requestBody', requestBody)
// const util = require('util');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/documents']);


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

    const createResponse = await docs.documents.create({
      requestBody: {
        title: 'Your new document!',
      },
    });
    console.log(createResponse.data);

    // var fileId = '1sTWaJ_j7PkjzaBWtNc3IzovK5hQf21FbOw9yLeeLPNQ';
    // const fileId = createResponse.data.documentId
    // var permissions = [
    //   {
    //     'type': 'user',
    //     'role': 'writer',
    //     'emailAddress': 'jedsada.ngow@gmail.com'
    //   }
    // ];

    // // Using the NPM module 'async'
    // async.eachSeries(permissions, function (permission, permissionCallback) {
    //   docs.permissions.create({
    //     resource: permission,
    //     fileId: fileId,
    //     fields: 'id',
    //   }, function (err, res) {
    //     if (err) {
    //       // Handle error...
    //       console.error(err);
    //       permissionCallback(err);
    //     } else {
    //       console.log('Permission ID: ', res.id)
    //       permissionCallback();
    //     }
    //   });
    // }, function (err) {
    //   if (err) {
    //     // Handle error
    //     console.error(err);
    //   } else {
    //     // All permissions inserted
    //   }
    // });
  }
});


