'use strict';

const { google } = require('googleapis');
const util = require('util');
const sampleClient = require('../sampleclient');

const docs = google.docs({
  version: 'v1',
  auth: sampleClient.oAuth2Client,
});

async function runSample() {
  // The initial call to create the doc will have a title but no content.
  // This is a limitation of the underlying API.
  const createResponse = await docs.documents.create({
    requestBody: {
      title: 'Your new document!',
    },
  });
  console.log(createResponse.data);

  // now that we created the doc, let's add content using the 
  // documentId returned from the create call.
  const updateResponse = await docs.documents.batchUpdate({
    documentId: createResponse.data.documentId,
    requestBody: {
      requests: [{
        insertText: {
          // The first text inserted into the document must create a paragraph,
          // which can't be done with the `location` property.  Use the 
          // `endOfSegmentLocation` instead, which assumes the Body if 
          // unspecified.
          endOfSegmentLocation: {},
          text: 'Hello there!'
        }
      }]
    }
  });
  console.log(updateResponse.data);
  return updateResponse.data;
}

const scopes = [
  'https://www.googleapis.com/auth/documents',
];

if (module === require.main) {
  sampleClient
    .authenticate(scopes)
    .then(runSample)
    .catch(console.error);
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client,
};