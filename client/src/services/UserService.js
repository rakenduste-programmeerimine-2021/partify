import axios from 'axios';
import AuthHeader from './Auth-header';

const API_URL = 'http://localhost:8080/api/user/';
const user = JSON.parse(localStorage.getItem("user"))
class userService {
    getPublicContent() {
        return axios.get(API_URL + 'all')
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: AuthHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: AuthHeader() })
    }

    getUserProfile(id) {
        return axios.get(API_URL + id, { headers: AuthHeader() }).then(response => {
            return response.data
        })
    }

    putUserProfile(data) {
        return axios.put(API_URL + data.id + "/update", data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }

    putNewUserAvatar(data) {
        const fData = new FormData() 
        fData.append('image', data.postFile)
        return axios.put(API_URL + data.id + "/update/avatar", fData ,{ headers: { 
            'Content-Type': data.postFile.type,
            'x-access-token' : user.accessToken
        }}).then(response => {
            return response.data
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteUser(id){
        return axios.delete(API_URL + id + "/delete", { headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
}

export default new userService()
