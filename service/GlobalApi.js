// Import required modules and configuration
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const BASE_URL = "http://localhost:1337/api";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
});

// Add request interceptor for debugging
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

// Add response interceptor for debugging
axiosClient.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response Error:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
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
    // Ensure data is properly structured for Strapi
    const payload = {
        data: {
            ...data.data, // Add additional data if needed, e.g., 'firstName', 'lastName', etc.
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
