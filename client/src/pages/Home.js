import React from "react";
import {Grid, Paper, Card, Stack, CardHeader, CardMedia, CardContent, Avatar, Typography, CardActions, IconButton } from '@mui/material'
import { red, blue, green } from '@mui/material/colors'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';

export default function Home () {
    const paperStyle = {padding: 20, height:'100%', width:860, margin:'20px auto'}
    const cardStyle = {padding: 20}

    
    return(
        <div>
            <Grid>
                <Paper elevation = {2} style = {paperStyle}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Card 
                            sx = {{ minWidth: 760 }}
                            margin='normal' 
                            style = {cardStyle}
                        >
                            <CardHeader 
                                avatar = {
                                    <Avatar sx = {{ bgcolor: red[500]}} aria-label="pidu">
                                        M
                                    </Avatar>
                                }
                                title="PIDU LOOTSI 8"
                                subheader="Reede 13, 2021"
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
                                <Typography variant="body1" color="text.secondary">
                                    hallo tulge peolee!
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="like">
                                    <ThumbUpAltIcon />
                                </IconButton>
                                <IconButton>
                                    <ThumbDownAltIcon />
                                </IconButton>
                                <IconButton aria-label="comment" >
                                    <CommentIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        <Card 
                            sx = {{ minWidth: 760 }}
                            margin='normal' 
                            style = {cardStyle}
                        >
                            <CardHeader 
                                avatar = {
                                    <Avatar sx = {{ bgcolor: blue[500]}} aria-label="pidu">
                                        T
                                    </Avatar>
                                }
                                title="SUVEM2NGUD"
                                subheader="Reede 1, 2021"
                            />
                            
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                    JOEL OSTRAT KUS MU FROIKAD ON??
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="like">
                                    <ThumbUpAltIcon />
                                </IconButton>
                                <IconButton>
                                    <ThumbDownAltIcon />
                                </IconButton>
                                <IconButton aria-label="comment" >
                                    <CommentIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        <Card 
                            sx = {{ minWidth: 760 }}
                            margin='normal' 
                            style = {cardStyle}
                        >
                            <CardHeader 
                                avatar = {
                                    <Avatar sx = {{ bgcolor: green[500]}} aria-label="pidu">
                                        M
                                    </Avatar>
                                }
                                title="aljoooo"
                                subheader="Reede 13, 2021"
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
                                <Typography variant="body1" color="text.secondary">
                                    TEKST 3
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="like">
                                    <ThumbUpAltIcon />
                                </IconButton>
                                <IconButton>
                                    <ThumbDownAltIcon />
                                </IconButton>
                                <IconButton aria-label="comment" >
                                    <CommentIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Stack>
                </Paper>
            </Grid>
        </div>
    )
}