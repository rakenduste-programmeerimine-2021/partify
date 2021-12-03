import React, { useState } from "react"
import axios from 'axios'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Avatar, IconButton, LinearProgress } from '@mui/material'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';



export default function Posts() {
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = useState(true)
    const postUrl = "http://localhost:8080/api/post"
    

    React.useEffect(() => {
        axios.get(postUrl).then((response) => {
            setPosts(response.data)
            setLoading(false)
            console.log('tra kaua voib')
        })
    }, [])

    if(!posts)return null


    if(loading){
        return(
            <div>
                <LinearProgress />
            </div>
        )
    }


    const cardStyle = {padding: 20}

    return(
        <div>
            <Card 
                dataSource={posts}
                sx = {{ minWidth: 760 }}
                margin='normal' 
                style = {cardStyle}
            >
                <CardHeader 
                    avatar = {
                        <Avatar>
                            {posts.avatar}
                        </Avatar>
                    }
                    title={posts.title}
                    subheader={posts.firstname, posts.lastname}
                />
                <CardMedia 
                    style={{
                        width: "auto",
                        maxHeight: "200px" 
                    }}
                    component={posts.postMediaType}
                    media={posts.postMediaName}
                    title="viin"
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {posts.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="like">
                        <ThumbUpAltIcon />
                        {posts.likes}
                    </IconButton>
                    <IconButton aria-label="dislike">
                        <ThumbDownAltIcon />
                        {posts.dislikes}
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}


