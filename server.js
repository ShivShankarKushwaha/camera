const express = require('express');
const app = express();
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const os = require('os');
const port = process.env.PORT || 5500;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(__dirname+"/public"))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let ipv4;
function getip()
{
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach(interfaceName => {
        const addresses = networkInterfaces[interfaceName];
        addresses.forEach(address => {
            if (address.family === 'IPv4' && !address.internal) {
                ipv4=address.address;
            }
        });
    });
}



app.listen(port, () => {
    getip();
    console.log(`server is running on http://localhost:${port} and ipconfig is: ${ipv4}:${port}`);
});
