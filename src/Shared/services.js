import axios from "axios";

const baseURL = "http://176.107.133.21:8090/api/v1/users";

export async function handleResponse(requestCallback) {
    try {
        return await requestCallback();
    } catch (error) {
        return error.response
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
        url: `${baseURL}/${payload.userId}/pulses?size=100&direction=asc&sort=createdAt`,
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
        url: `${baseURL}/${payload.userId}/emotions?size=100&direction=asc&sort=createdAt`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response.data
}
export const postPulseComment = async (payload) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}/${payload.userId}/pulse/${payload.pulseId}/comments`,
        auth: payload.auth,
        data: payload.comment,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

export const postEmotionsComment = async (payload) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}/${payload.userId}/emotions/${payload.emotionId}/comments`,
        auth: payload.auth,
        data: payload.comment,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

export const deleteUser = async (payload) => {
    console.log(payload)
    const response = await axios({
        method: "delete",
        url: `${baseURL}/${payload.userId}`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}