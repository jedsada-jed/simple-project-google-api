const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const async = require('async')
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

    let customerName = 'Alice';
    let date = '18/01/2030'

    let requests = [
      {
        replaceAllText: {
          containsText: {
            text: '{{customer-name}}',
            matchCase: true,
          },
          replaceText: customerName,
        },
      },
      {
        replaceAllText: {
          containsText: {
            text: '{{date}}',
            matchCase: true,
          },
          replaceText: date,
        },
      },
      {
        replaceAllText: {
          containsText: {
            text: '{{OK}}',
            matchCase: true,
          },
          replaceText: "My name is JED, I'm so handsome.",
        },
      },
    ];

    docs.documents.batchUpdate(
      {
        documentId: '17y2v-11oNI32Bau7cyUsWYzJcu_KNSNhdRrIwgddw84',
        resource: {
          requests,
        },
      },
      (err) => {
        if (err) return console.log('The API returned an error: ' + err);
      });

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


