const https = require('https');
const fs = require('fs');

fs.readFile('./northcoders.json', (err, data) => {
  if (err) throw err;
  let fileData = JSON.parse(data);
  const dataArray = fileData.map(person => person.username);
  let interestObject = {};
  dataArray.forEach(username => getInterests(username));

  function getInterests(username) {
    const options = {
      hostname: 'nc-leaks.herokuapp.com',
      path: `/api/people/${username}/interests`,
      method: 'GET'
    };
    const request = https.request(options, (response) => {
      let body = '';
      response.on('data', (packet) => {
        body += packet.toString();
      });
      response.on('end', () => {
        const interestData = JSON.parse(body).person;
        interestObject[interestData.username] = interestData.interests;
        if (Object.keys(interestObject).length === dataArray.length) {
          fs.writeFile('./interests.json', JSON.stringify(interestObject), (err) => {
            if (err) throw err;
            console.log('File written');
          });
        }
      });
    });
    request.on('error', (err) => {
      console.log(err);
    });
    request.end();
  }
});
