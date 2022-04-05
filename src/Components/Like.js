import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../Firebase';

function Like({userData,postData}) {
    const [like,setLike] = useState(null)
    useEffect(()=>{
        let check = postData.likes.includes(userData.userID)?true:false
        setLike(check)

    },[postData])
    const handleLike=()=>{
        if(like==true){
            let narr = postData.likes.filter((el)=>el!=userData.userID)
            database.posts.doc(postData.postID).update({
                likes:narr
            })
        }else{
            let narr = [...postData.likes,userData.userID]
            database.posts.doc(postData.postID).update({
                likes:narr
            })
        }
    }
  return (
    <div>
        {
            like!=null?
            <>
            {
                like==true?<FavoriteIcon className="icon-styling like" onClick={handleLike}/>: <FavoriteIcon className="icon-styling unlike" onClick={handleLike}/>
            }
            </>:<></>
        }
    </div>
  )
}

export default Like