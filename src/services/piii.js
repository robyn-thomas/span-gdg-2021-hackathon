import axios from 'axios'

let addProfile = (userId, twitterId) => {
    axios.get('localhost:8080/scan/twitter/userId/twitterid')  
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}