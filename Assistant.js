'use strict';

var AssistantV1 = require('watson-developer-cloud/assistant/v1');

/**
 * Instantiate the Watson Assistant Service
 */
var assistant = new AssistantV1({
  username: 'apikey',
  password: 'KK4yC9kafKiF9Qbg4dFOTNU5gN0iXIBMHvHZ2om8lj1R',
  version: '2018-02-16'
});

/**
 * Calls the assistant message api.
 * returns a promise
 */
var message = function(text, context) {
  var payload = {
    workspace_id: '6197d6d3-8dc6-42a3-9e06-7956b7c5b41f',
    input: {
      text: text
    },
    context: context
  };
  return new Promise((resolve, reject) =>
    assistant.message(payload, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );
};

// This example makes two successive calls to assistant service.
// Note how the context is passed:
// In the first message the context is undefined. The service starts a new assistant.
// The context returned from the first call is passed in the second request - to continue the assistant.
message('Inscribir a Escuela', undefined)
  .then(response1 => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
    // FROM ASSISTANT SERVICE
    console.log(JSON.stringify(response1, null, 2), '\n--------');

    // invoke a second call to assistant
    return message('Escuela 15', response1.context);
  })
  .then(response2 => {
    console.log(JSON.stringify(response2, null, 2), '\n--------');
    console.log(
      'Note that the two reponses should have the same context.conversation_id'
    );
  })
  .catch(err => {
    // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
    // FROM ASSISTANT SERVICE
    console.error(JSON.stringify(err, null, 2));
});