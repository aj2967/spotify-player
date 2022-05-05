import axios from "axios";

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = '54eb5a83dd0d4b07b21d084d7c9aa301';
const redirectUri = 'https://aj2967.github.io/spotify-player/';
const scopes = [
    'user-library-read',
    'playlist-read-private'
]

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
})

export const setClientToken = token => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    })
}

export default apiClient;