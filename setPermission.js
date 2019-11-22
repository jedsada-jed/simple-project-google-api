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

    var fileId = '1WtwxmCpPZhkiuMoPbIlJ48MYkL0b3PaEUG9wrVHXcJU';
    var permissions = [
      // {
      //   'type': 'user',
      //   'role': 'writer',
      //   'emailAddress': 'mail@gmail.com'
      // },
      {
        'type': 'anyone',
        'role': 'writer',
        'allowFileDiscovery': true
      },
      // {
      //   'type': 'domain',
      //   'role': 'writer',
      //   'domain': 'gsutemail.com'
      // }
    ];

    async.eachSeries(permissions, function (permission, permissionCallback) {
      drive.permissions.create({
        resource: permission,
        fileId: fileId,
        fields: 'id',
      }, function (err, res) {
        if (err) {
          // Handle error...
          console.error(err);
          permissionCallback(err);
        } else {
          console.log('Permission ID: ', res)
          permissionCallback();
        }
      });
    }, function (err) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        // All permissions inserted
      }
    });

  }
});




