import axios from "axios";

const baseURL = "http://176.107.133.21:8090/api/v1/users";

export const registerUser = (payload) => {
    axios({
        method: 'post',
        url: baseURL,
        body: payload,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*'
        }
    }).then(response => console.log(response))
    .catch(error => console.log(error));
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