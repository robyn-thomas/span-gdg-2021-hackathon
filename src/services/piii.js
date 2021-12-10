import axios from 'axios'
import toast from 'react-hot-toast';

export const addProfile = async function (userId, twitterId) {
    axios.get('localhost:8080/twitter/add_profile/'+userId+'/' + twitterId)  
    .then(function (response) {
        console.log(response);
        return response.data.message
    })
    .catch(function (error) {
        console.log(error.message)
        
        return error.message
    })
    axios.get('localhost:8080/twitter/scan/'+userId+'/' + twitterId)  
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}