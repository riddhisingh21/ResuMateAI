const {default : axios} = require('axios');


const API_KEY = process.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api/',
    header:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})


const CreateNewResume=() => axiosClient.post('/user-resumes', data);

export default{
    CreateNewResume
}