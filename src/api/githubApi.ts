import axios from "axios";


export default axios.create({
    baseURL: `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
    headers: {
        "Content-type": "application/json",
        "Authorization": `token ${process.env.GITHUB_TOKEN}`
    }
})
