import axios from 'axios'

const API_URL = 'http://localhost:8080/api/post/'

class PostService {
    getPosts(){

    }

    createPost(body, postMediaType, postMediaName, title, location, tags, likes, dislikes, user, isEvent, comments){
        return axios.post(API_URL + "posted", {
            body,
            postMediaType,
            postMediaName,
            title,
            location,
            tags,
            likes,
            dislikes,
            user,
            isEvent,
            comments
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new PostService()