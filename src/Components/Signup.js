import * as React from 'react';
import { useState ,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CardActions } from '@mui/material';
import './Signup.css'
import insta from '../Assets/Instagram.JPG'
import {makeStyles} from '@mui/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link,useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { database ,storage} from '../Firebase';

export default function Signup() {
    const useStyles = makeStyles({
        text1:{
            color:"grey",
            textAlign:"center"
        },
        card2:{
            height:"7vh",
            marginTop:"2%",
            marginBottom:"2%"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate()
    const {signup} = useContext(AuthContext);
    const handleClick = async ()=>{
        if(file==null){
            setError("Please Upload a Profile Image");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
        try{
            setError('')
            setLoading(true)
            let userObj = await signup(email,password).then((userObj)=>{

                let uid = userObj.user.uid
                const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
                uploadTask.on('state_changed',fn1,fn2,fn3);
                function fn1(snapshot){
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    console.log(`Upload is ${progress} done.`)
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
                        database.users.doc(uid).set({
                            email:email,
                            userID:uid,
                            fullname:name,
                            profileUrl:url,
                            createdAt:database.getTimeStamp()
    
                        })
                    })
                    setLoading(false)
                    history('/')
                    
                }
            }).catch(err => {
                setError(err.message);
                setTimeout(() => {
                    setError('')
                }, 5000);
                setLoading(false)})

        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000)
            return;

        }
    }
    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card varient="outlined">
                    <div className="insta-logo">
                        <img src={insta} alt="" />
                    </div>
                        <CardContent>
                            <Typography className={classes.text1} varient="subtitle1">
                                Sign up to see photos and videos from your friends
                            </Typography>
                            {error !='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <Button variant="outlined" color="secondary" fullWidth={true} margin="dense" startIcon= {<CloudUploadIcon/>} component="label">
                            Upload Profile Image
                            <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])} />
                        </Button>
                        </CardContent>
                    
                    <CardActions>
                        <LoadingButton fullWidth={true} variant="contained" color="primary" loading={loading} onClick={handleClick} endIcon={<PersonAddIcon />}loadingPosition="end">
                            Sign Up
                        </LoadingButton>
                    </CardActions>
                    <CardContent>
                            <Typography className={classes.text1} varient="subtitle1">
                                By signing up, you agree to our terms, conidition and cookies policy.
                            </Typography>
                        </CardContent>
                </Card>
                <Card varient ="outlined" className={classes.card2}>
                <CardContent>
                            <Typography className={classes.text1} variant="subtitle2">
                                Already have an account?<Link to="/login" style={{textDecoration:"none"}}> Log in</Link>
                            </Typography>
                        </CardContent>

                </Card>
            </div>
        </div>
    );
}