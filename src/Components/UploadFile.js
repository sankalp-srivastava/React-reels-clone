import React ,{useState}from 'react'
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import MovieIcon from '@material-ui/icons/Movie'
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import {database,storage} from '../Firebase'

function UploadFile(props) {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [uploaded,setUploaded] = useState(0)
    const [success,setSuccess] = useState(false)
    const handleChange = async(file)=>{
        if(file==null){
            setError("Please Select a File to Upload")
            setTimeout(()=>{
                setError('')
            },3000)
            return;
        }
        if(file.size/(1024*1024)>20){
            setError(`Max file size cannot exceed 20MB. Your file is ${(file.size/(1024*1024)).toFixed(2)}MB`)
            setTimeout(()=>{
                setError('')
            },3000)
            return;
        }
        let uid = uuidv4()
        setLoading(true)
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
                uploadTask.on('state_changed',fn1,fn2,fn3);
                function fn1(snapshot){
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    setUploaded(progress);
                }
                function fn2(error){
                    setError(error);
                    setTimeout(()=>{
                    setError('')
                },2000)
                setLoading(false)
                return;
                   
                }
                function fn3(){
                    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                        let obj ={
                            likes:[],
                            comments:[],
                            pId:uid,
                            pUrl:url,
                            uName: props.user.fullname,
                            uProfile:props.user.profileUrl,
                            userID:props.user.userID,
                            createdAt: database.getTimeStamp()
                        }
                        database.posts.add(obj).then(async(ref)=>{
                            let res = await database.users.doc(props.user.userID).update({
                                postIds : props.user.postIds!=null? [...props.user.postIds,ref.id]:[ref.id]
                            })
                        }).then(()=>{
                            setLoading(false)
                            setSuccess(true)
                            setTimeout(()=>{
                                setSuccess(false)
                            },3000)
                        }).catch((err)=>{
                            setError(err)
                            setLoading(false)
                            setTimeout(()=>{
                                setError('')
                            },2000)
                        })
                    }).catch((err)=>{
                        setError(err)
                        setLoading(false)
                        setTimeout(()=>{
                            setError('')
                        },2000)
                    })
                }

    }
  return (
    <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
        {error!=''?<Alert severity="error">{error}</Alert>: success? <Alert severity="success">Your Video is Uploaded Successfully</Alert> :
        <>
            <input type="file" accept='video/*' onChange={(e)=>handleChange(e.target.files[0])} id='upload-input' style={{display:'none'}} />
            <label htmlFor='upload-input'>
            <LoadingButton
                variant="outlined"
                color="secondary"
                loading={loading}
                loadingPosition="start"
                component="span"
                startIcon={<MovieIcon/>}
            >Post New Video</LoadingButton>
            </label>
            {loading && <LinearProgress color="secondary" variant="determinate" value={uploaded} />}
        </>
        }
    </div>
  )
}

export default UploadFile