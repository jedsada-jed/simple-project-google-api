

const { google } = require('googleapis');
const privatekey = require("./privatekey.json");
const async = require('async')
// const util = require('util');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/spreadsheets']);


//authenticate request
jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");

    const sheets = google.sheets({
      version: 'v4',
      auth: jwtClient,
    });

    requests = [
      // {
      //   "insertDimension": {
      //     "range": {
      //       "sheetId": 790763898,
      //       "dimension": "COLUMNS",
      //       "startIndex": 2,
      //       "endIndex": 4
      //     },
      //     "inheritFromBefore": true
      //   }
      // },
      {
        "insertDimension": {
          "range": {
            "sheetId": 790763898,
            "dimension": "ROWS",
            "startIndex": 20, // start after index
            "endIndex": 24
          },
          "inheritFromBefore": true
        }
      }
    ]
    const spreadsheetId = '1kd6tVuBBvtBndeYEjnLl9e8JKzIfPSKfigLgQrWtMF4'

    var insertData = {
      spreadsheetId,
      range: "Invoice!B21:G25",
      majorDimension: "ROWS",

      valueInputOption: 'USER_ENTERED' // RAW | USER_ENTERED
    }

    var valueData = {
      values: [
        [`Item # ${new Date().getTime()}`, "", "", "1", "$150.00", "$150.00"],
        [`Item # ${new Date().getDate()}`, "", "", "2", "$250.00", "$500.00"],
        [`Item # ${new Date().getDay()}`, "", "", "3", "$250.00", "$750.00"],
        [`Item # ${new Date().getFullYear()}`, "", "", "4", "$250.00", "$1,000.00"],
      ],
    }

    await sheets.spreadsheets.batchUpdate(
      {
        spreadsheetId,
        resource: {
          requests,
        },
      },
      (err, result) => {
        if (result.status == 200) {
          sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Invoice!B3:B3',
            valueInputOption: insertData.valueInputOption,
            resource: {
              values: [
                ['THStringer2BSimple'],
              ],
            },
          }, (err, result) => {
            if (err) {
              // Handle error
              console.log(err);
            } else {
              console.log('%d cells updated.', result.updatedCells);
            }
          });

          sheets.spreadsheets.values.update({
            spreadsheetId,
            range: insertData.range,
            valueInputOption: insertData.valueInputOption,
            resource: valueData,
          }, (err, result) => {
            if (err) {
              // Handle error
              console.log(err);
            } else {
              console.log('%d cells updated.', result.updatedCells);
            }
          });
        }
        else if (err) return console.log('The API returned an error: ' + err);
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





