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
        url: `${baseURL}/${payload.userId}/pulses?sort=date&direction=asc`,
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
        url: `${baseURL}/${payload.userId}/emotions?sort=date&direction=asc`,
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
        url: `${baseURL}/${payload.id}/pulse/${payload.pulseId}/comments`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

export const postEmotionsComment = async (payload) => {
    const response = await axios({
        method: "post",
        url: `${baseURL}/${payload.id}/emotions/${payload.emotionsId}/comments`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

export const deleteUser = async (payload) => {
    const response = await axios({
        method: "delete",
        url: `${baseURL}/${payload.id}`,
        auth: payload.auth,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}