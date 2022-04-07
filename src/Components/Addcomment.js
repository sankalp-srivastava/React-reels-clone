import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../Firebase';

function Addcomment({ userData, postData }) {
  const [text, setText] = useState('')
  const handleClick = () => {
    let obj = {
      text: text.trim(),
      uProfileImage: userData.profileUrl,
      uName: userData.fullname
    }
    if (text.trim() != '') {
      database.comments.add(obj).then((doc) => {
        database.posts.doc(postData.postID).update({
          comments: [...postData.comments, doc.id]
        })
      })
      setText('')
    } else {
      alert("Comment cannot be empty String")
      setText('')
    }
  }
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  return (
    <div style={{ width: '100%' }} >
      <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{ width: '74%' }} value={text} onChange={(e) => setText(e.target.value)} onKeyPress={handleKeypress} />
      <Button variant="contained" style={{marginLeft:'6px'}}onClick={handleClick}>Post</Button>

    </div>
  )
}

export default Addcomment