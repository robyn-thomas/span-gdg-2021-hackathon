import axios from 'axios'

export const addProfile = (userId, twitterId) => {
    axios.get('localhost:8080/scan/twitter/'+userId+'/' + twitterId)  
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}