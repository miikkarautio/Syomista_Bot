const axios = require('axios');

async function getFoodInformation(input) {
    try {
        const response = await axios(`https://www.compass-group.fi/menuapi/feed/json?costNumber=${input}&language=fi`); 
        const food = response.data
        return food;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getFoodInformation}