const axios = require('axios').default;
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const pathEnv = path.resolve(__dirname, './.env');

if (!fs.existsSync(pathEnv)) {
    console.log(colors.red('#'.repeat(50)));
    console.log(colors.red('ERROR:'));
    console.log(new Error("The .env file is required with the EXCHANGE_RATE_API_KEY, please search your api key from https://manage.exchangeratesapi.io/"));
    console.log(colors.red('#'.repeat(50)));
}

dotenv.config({
    path: pathEnv
});

const { EXCHANGE_RATE_API_KEY } = process.env;

if (!EXCHANGE_RATE_API_KEY) {
    console.log(colors.red('#'.repeat(50)));
    console.log(colors.red('ERROR:'));
    console.log(new Error('The EXCHANGE_RATE_API_KEY is required in .env'));
    console.log(colors.red('#'.repeat(50)));
}

const API = 'http://api.exchangeratesapi.io/v1/';

const main = async () => {
    try {
        const parameters = [{
            key: 'access_key',
            value: EXCHANGE_RATE_API_KEY
        }];

        const response = await axios.get(`${API}latest?${parameters.map(parameter => `${parameter.key}=${parameter.value}`).join('&')}`);

        console.log(colors.green('#'.repeat(50)));
        console.log(response.data);
        console.log(colors.green('#'.repeat(50)));
    } catch (error) {
        console.log(colors.red('#'.repeat(50)));
        console.log(colors.red("ERROR"));
        console.log(error);
        console.log(colors.red('#'.repeat(50)));
    }
}

main();