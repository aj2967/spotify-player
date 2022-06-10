import axios from "axios";

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientID = 'ef335b670feb4073ba7da1bb2423cbc5';
const redirectUri = 'http://localhost:3000';
// const redirectUri = 'https://aj2967.github.io/spotify-player/';
const scopes = [
    'user-library-read',
    'playlist-read-private',
    'user-top-read'
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