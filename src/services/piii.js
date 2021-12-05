import axios from 'axios'

export const addProfile = (userId, twitterId) => {
    axios.get('localhost:8080/twitter/add_profile/'+userId+'/' + twitterId)  
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    axios.get('localhost:8080/twitter/scan/'+userId+'/' + twitterId)  
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}