import axios from 'axios'
import AuthHeader from './Auth-header';
const user = JSON.parse(localStorage.getItem("user"))
const API_URL = 'http://localhost:8080/api/post/'

class PostService {
    getPosts(){

    }

    createPost(data, userId){
        const fData = new FormData() 
        fData.append('image', data.image)
        fData.append('body', data.body)
        fData.append('title', data.title)
        fData.append('tags', data.tags)
        fData.append('location', data.location)
        if(!data.isEvent)data.isEvent = false
        fData.append('isEvent', data.isEvent)
        fData.append('userId', userId)
        return axios.post(API_URL + "create", fData, 
            { headers: { 
                'Content-Type': data.image.type,
                'x-access-token' : user.accessToken
            }}
        )
    }

    putPost(data) {
        return axios.put(API_URL + "edit/" + data.id , data ,{ 
            headers: AuthHeader() }).then(response => {
            return response.data
        })
    }
}

export default new PostService()