import React, { useEffect, useState } from 'react'
import {database} from '../Firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import Like from './Like';
import Avatar from '@mui/material/Avatar';
import './Posts.css'


function Posts({userData}) {
    const [posts,setPost] = useState(null);
    useEffect(() => {
      let parr=[]
      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
          parr=[]
          querySnapshot.forEach((doc)=>{
              let data = {...doc.data(),postID:doc.id}
              parr.push(data)
          })
          setPost(parr)
      })
    
      return unsub
    }, [])
    
  return (
    <div>
        {
            posts==null || userData==null ? <CircularProgress />:
            <div className='video-container'>
                {
                    posts.map((post,index)=>(
                        <React.Fragment key={index}>
                            <div className="videos">
                                <Video src={post.pUrl}/>
                                <div className="fa" style={{display:'flex'}}>
                                <Avatar src={userData.profileUrl} />
                                <h4>{userData.fullname}</h4>
                                </div>
                                <Like userData={userData} postData={post} />
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