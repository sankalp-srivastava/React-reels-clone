import React, { useEffect, useState } from 'react'
import { database } from '../Firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import Like from './Like';
import Like2 from './Like2';
import Avatar from '@mui/material/Avatar';
import './Posts.css'
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Addcomment from './Addcomment';
import Comments from './Comments';

function Posts({ userData }) {
    const [posts, setPost] = useState(null);
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postID: doc.id }
                parr.push(data)
            })
            setPost(parr)
        })

        return unsub
    }, [])

    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <div className='video-container'>
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={post.uProfile} />
                                            <h4>{post.uName}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <CommentIcon className='comment-styling' onClick={() => handleClickOpen(post.pId)} />
                                        <Dialog
                                            open={open == post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth='md'
                                        >
                                            <DialogTitle style={{ margin: '2%', padding: '0px 9px' }}>
                                                <Grid container justifyContent="space-between" alignItems="center">
                                                    <Typography variant="div">Comments</Typography>
                                                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                                                </Grid>
                                            </DialogTitle>
                                            <div className="modal-container">
                                                <div className="video-modal">
                                                    <video autoPlay={true} muted={true} controls>
                                                        <source src={post.pUrl} />
                                                    </video>
                                                </div>
                                                <div className="comment-modal">
                                                    <Card className="card1">
                                                            <Comments postData={post}/>
                                                    </Card>
                                                    <Card varient="outlined" className="card2">
                                                        <Typography style={{ padding: '0.5rem' }}>
                                                            {
                                                                post.likes.length == 0 ? "Be the First one to Like this Video" : `Liked by ${post.likes.length} users`
                                                            }
                                                        </Typography>
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                            <Addcomment postData={post} userData={userData}/>

                                                        </div>


                                                    </Card>
                                                </div>
                                            </div>

                                        </Dialog>
                                    </div>

                                </React.Fragment>
                            ))
                        }
                    </div>
            }

        </div>
    )
}

export default Posts