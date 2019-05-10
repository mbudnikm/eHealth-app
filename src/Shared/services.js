import axios from "axios";

const baseURL = "http://176.107.133.21:8090/api/v1/users";

export async function handleResponse(requestCallback) {
    try {
        return await requestCallback();
    } catch (error) {
        return error.response.data
    }
}

export const registerUser = async (payload) => {
    const response = await axios({
        method: "post",
        url: baseURL,
        data: payload,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

export const loginUser = async (payload) => {
    const response = await axios({
        method: "get",
        url: `${baseURL}/${payload.name}/byName`,
        data: payload,
        auth: {username: payload.name, password: payload.password},
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
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