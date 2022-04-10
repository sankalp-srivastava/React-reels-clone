import { CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../Firebase'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Addcomment from './Addcomment';
import Comments from './Comments';
import Like2 from './Like2';
import Dialog from '@mui/material/Dialog';
import './Profile.css'
import { AuthContext } from '../Context/AuthContext'


function Profile() {
    const {user} =  useContext(AuthContext)
    const { id } = useParams()
    // console.log(id)

    const [userData, setUserData] = useState(null)
    const [currentUser,setCurrentUser] = useState(null)
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(async() => {
        
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
        let a = await database.users.doc(user.uid).get()
        setCurrentUser(a.data())
    }, [id])

    useEffect(async () => {
        if (userData != null) {
            let parr = []
            if (userData.postIds != undefined) {
                for (let i = 0; i < userData.postIds.length; i++) {
                    let postData = await database.posts.doc(userData.postIds[i]).get()
                    parr.push({...postData.data(),postID:postData.id})
                }
            }
            setPosts(parr)
        }
    },[userData,posts])

    return (
        <>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={currentUser} />
                        <div className="spacer">
                        </div>

                        <div className="container">
                            <div className="upper-part">
                                <div className="profile-img">
                                    <img src={userData.profileUrl} alt="Profile Photo" />
                                </div>
                                <div className="info">
                                    <Typography variant='h5'>
                                        Name : {userData.fullname}
                                    </Typography>
                                    <Typography variant='h6'>
                                        Posts : {userData.postIds != undefined ? userData.postIds.length : '0'}
                                    </Typography>
                                </div>
                            </div>
                                <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
                            <div className="profile-videos">
                                    { posts.length ==0? "No post to show":
                                        posts.map((post, index) => (
                                            <React.Fragment key={index}>
                                                <div className="videos">
                                                    
                                                <video muted={true}  onClick={() => handleClickOpen(post.pId)} style={{cursor:'pointer'}}>
                                                                    <source src={post.pUrl} />
                                                                </video>
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
                                                            <video muted={true} controls>
                                                        <source src={post.pUrl} />
                                                    </video>
                                                            </div>
                                                            <div className="comment-modal">
                                                                <Card className="card1">
                                                                    <Comments postData={post} />
                                                                </Card>
                                                                <Card varient="outlined" className="card2">
                                                                    <Typography style={{ padding: '0.5rem' }}>
                                                                        {
                                                                            post.likes.length == 0 ? "Be the First one to Like this Video" : `Liked by ${post.likes.length} users`
                                                                        }
                                                                    </Typography>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Like2 postData={post} userData={currentUser} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                        <Addcomment postData={post} userData={currentUser} />
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
                        </div>
                       


                    </>
            }
        </>
    )
}

export default Profile


