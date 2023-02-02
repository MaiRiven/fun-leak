const https = require('https');
const fs = require('fs');

function getInstructions() {
    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/confidential',
        method: 'GET'
    };
    
    const request = https.request(options, (response) => {
       // console.log(response);
        let body = '';
        response.on('data', (packet) => {
            body += packet.toString();
        });
        
        response.on('end', () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody.instructions);
            fs.writeFileSync('./instructions.md', parsedBody.instructions)
        });
    });

    request.on('error', (err) => {
        console.log(err);
     })

    request.end();

}
getInstructions();