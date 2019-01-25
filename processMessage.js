const API_AI_TOKEN = '1c8561c94bd44fd78fd0f38e5d3a850b';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAARFXG8XM74BALUVUa1IQOWFispuYTRCKkMMXQ1LRDt8ar4cZB9ZCpwThYNGPkXeMhMdSKNkXnThGAKLm6GGmqJciGTpLfEDXncvXMJUuBTPqBqE0449egZCvE4fQu9QBxbOx3fZAqD8frljPuz3kFczGvZAHeDODJPCg1cC6ZBNkwx1De6zfW';
const request = require('request');

const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text },
    }
 });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;

  const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'Milo'});

  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
