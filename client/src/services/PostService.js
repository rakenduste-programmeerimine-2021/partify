import axios from 'axios'
const user = JSON.parse(localStorage.getItem("user"))
const API_URL = 'http://localhost:8080/api/post/'

class PostService {
    getPosts(){

    }

    createPost(data){
        const fData = new FormData() 
        fData.append('image', data.image)
        fData.append('body', data.body)
        fData.append('title', data.title)
        fData.append('tags', data.tags)
        fData.append('location', data.location)
        if(!data.isEvent)data.isEvent = false
        fData.append('isEvent', data.isEvent)
        return axios.post(API_URL + "create", fData, 
            { headers: { 
                'Content-Type': data.image.type,
                'x-access-token' : user.accessToken
            }}
        )
    }
}

export default new PostService()