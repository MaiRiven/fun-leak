const https = require('https');
const fs = require('fs');

function getPeople() {
    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/people',
        method: 'GET'
    };
    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (packet) => {
            body += packet.toString();
        });
        response.on('end', () => {
            const allPeople = JSON.parse(body);
            //console.log(allPeople);
            const northcodersPeople = allPeople.people.filter(person => person.job.workplace === 'northcoders');
            console.log(northcodersPeople);
            fs.writeFileSync('./northcoders.json', JSON.stringify(northcodersPeople));
        });
    });
    request.on('error', (err) => {
        console.log(err);
     })
    request.end();
}
getPeople()
module.exports = { getPeople }