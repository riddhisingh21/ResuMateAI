// Import required modules and configuration
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;


const axiosClient = axios.create({
    baseURL: "https://strapi-admin-resumate-ai.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response Error:', error);
        if (error.response) {
           
            console.error('Error Data:', error.response.data);
            console.error('Error Status:', error.response.status);
            console.error('Error Headers:', error.response.headers);
        }
        return Promise.reject(error);
    }
);

// API Methods
const CreateNewResume = (data) => {
    return axiosClient.post('/user-resumes', { data });
};

const GetUserResumes = (userEmail) => {
    return axiosClient.get(`/user-resumes`, {
        params: {
            'filters[userEmail][$eq]': userEmail
        }
    });
};

const UpdateResumeDetail = (id, data) => {
    
    const payload = {
        data: {
            ...data.data, 
        }
    };
    return axiosClient.put(`/user-resumes/${id}`, payload);
};

const GetResumeById = (id) => {
    return axiosClient.get(`/user-resumes/${id}`, {
        params: {
            populate: '*'
        }
    });
};

const DeleteResumeById = (id) => {
    return axiosClient.delete(`/user-resumes/${id}`);
};

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
