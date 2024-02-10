import axios from "axios";

const ACCOUNTS_URL = "https://activitytracker-45ec.onrender.com/accounts/"

export default axios.create({
    baseURL: ACCOUNTS_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const api = axios.create({
    baseURL: "https://activitytracker-45ec.onrender.com/accounts/",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
