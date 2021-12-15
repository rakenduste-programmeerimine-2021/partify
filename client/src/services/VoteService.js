import axios from 'axios';
import AuthHeader from './Auth-header';

const API_URL = 'http://localhost:8080/api/';
class voteService {

    putLikeUser(data) {
        return axios.put(API_URL + "user/like/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
    putDislikeUser(data) {
        return axios.put(API_URL + "user/dislike/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
    putLikePost(data) {
        return axios.put(API_URL + "post/like/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
    putDislikePost(data) {
        return axios.put(API_URL + "post/dislike/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
    putLikeComment(data) {
        return axios.put(API_URL + "posts/comment/like/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
    putDislikeComment(data) {
        return axios.put(API_URL + "posts/comment/dislike/" + data, data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }

}

export default new voteService()
