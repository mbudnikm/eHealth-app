import axios from "axios";

const baseURL = "http://localhost:8090//api/v1/users";

export const registerUser = (payload) => {
    axios({
        method: 'post',
        url: baseURL,
        data: payload
    }).then(response => console.log(response));
}

export const getUserDetails = (id) => {
    axios({
        method: 'get',
        url: `baseURL/${id}`,
    }).then(response => console.log(response));
}

export const deleteUser = (id) => {
    axios({
        method: 'delete',
        url: `baseURL/${id}`,
    }).then(response => console.log(response));
}