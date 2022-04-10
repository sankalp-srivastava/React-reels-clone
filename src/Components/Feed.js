import React, { useContext,useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile'
import Posts from './Posts'
import {database} from '../Firebase'
import Navbar from './Navbar'

function Feed() {
  const { user, logout } = useContext(AuthContext)
  const [userData,setuserData] = useState('')
  useEffect(async()=>{
    const unsub = await  database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setuserData(snapshot.data())
    })
    return ()=>{unsub()}
  },[user])
  return (
    <>
      <Navbar userData={userData}/>
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' ,alignItems:'center'}}>
        <UploadFile user={userData} />
        <Posts userData={userData} />
    </div>
    </>
  )
}

export default Feed