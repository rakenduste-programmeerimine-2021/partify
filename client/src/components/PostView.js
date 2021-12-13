import React from "react";
import { Grid, Paper, Card, CardActions, CardContent, Avatar, CardMedia, CardHeader, IconButton, Typography, Chip } from '@mui/material';
import { red } from '@mui/material/colors'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function PostView () {
    const paperStyle = {padding: 20, height:'100%', width:960, margin:'20px auto'}
    const cardStyle = {padding: 20}

    return(
        <div>
            <Grid>
                <Paper 
                    elevation = {2}
                    style = {paperStyle}
                    >
                    <Card
                    sx = {{ minWidth: 760 }}
                    margin='normal' 
                    style = {cardStyle}
                    >
                        <Chip
                            size="big"
                            avatar = {
                                <Avatar sx = {{ bgcolor: red[500], width:56, height: 56}}>
                                    M
                                </Avatar>
                            }
                            label='Mari Maasikas'
                        />
                        <CardHeader
                            
                            title = "TÜÜTUKASSA"
                            subheader = "Laupäeva hommik, 2021"
                        />
                        <CardMedia
                        style={{
                            width: "auto",
                            maxHeight: "200px" 
                        }}
                        component="img"
                        
                        image="../1.png"
                        title="viin"
                        />
                        <CardContent>
                            <Typography variant = "body1" color = "text.primary">
                                Tulge peole!
                                Tooge jooki juurde ja kaerahelbeputru. 
                                Mu merisiga saab märtsis viieseks. 
                                Kas teadsite, et Ott Tänak joob viis liitrit piima päevas?
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        <IconButton aria-label="like">
                            <ThumbUpAltIcon />
                        </IconButton>
                        <IconButton aria-label="dislike">
                            <ThumbDownAltIcon />
                        </IconButton>
                        <IconButton aria-label="comment" margin="auto" >
                            <AddCommentIcon />
                        </IconButton>
                        </CardActions>
                    </Card>
                    <Card>

                    </Card>
                </Paper>
            </Grid>
        </div>
    )
}