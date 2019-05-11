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

export const getPulse = async (payload) => {
    const response = await axios({
        method: "get",
        url: `${baseURL}/${payload.userId}/pulses`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.data
}

export const getEmotions = async (payload) => {
    const response = await axios({
        method: "get",
        url: `${baseURL}/${payload.userId}/emotions`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.data
}