import { Avatar, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {database} from '../Firebase'

function Comments({postData}) {
    const [comments,setComments] = useState(null)
    useEffect(async()=>{
        let arr=[]
        for (let i = 0;i<postData.comments.length;i++){
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setComments(arr)
    })
    
  return (
    <div style={{height:'100%',scroll:'auto'}}>
        {
            comments==null? <CircularProgress/>:
            comments.map((comment,index)=>(
                <div key ={index} style={{display:'flex',backgroundColor:'#f0f0f0',alignItems:'center',marginBottom:'2px',borderRadius:'30px',}}>
                    <Avatar src={comment.uProfileImage} style={{marginRight:'3px',marginLeft:'2px'}}/>
                    <p>
                        <span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp;{comment.text}
                    </p>
                </div>
            )
            
            )
            
        }

    </div>
  )
}

export default Comments