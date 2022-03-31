const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/users", (req, res) => {
    request(
        {
            method: 'GET',
            uri: 'https://randomuser.me/api/?results=2000'
        },
        function (error, response, body) {
            if (error) {
                console.log(error);
                return;
            }

            // const data = response.body;
            // const apiData = JSON.parse(data);
            // console.log(apiData);

            if (response.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error with api call');
            }
        }
    ).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server active on: ${PORT}`);
});