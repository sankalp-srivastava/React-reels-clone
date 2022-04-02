import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, CardActions } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './Login.css'
import bg from '../Assets/insta.png'
import insta from '../Assets/Instagram.JPG'
import { makeStyles } from '@mui/styles'
import { Link, useNavigate } from 'react-router-dom'
import { CarouselProvider, Slider, Slide,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const store = useContext(AuthContext)
    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        },
        text2: {
            textAlign: "center"
        },
        card2: {
            height: "8vh",
            marginTop: "2%",
            marginBottom: "2%"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate()
    const {login} = useContext(AuthContext)

    const handleClick = async ()=>{
        try{
            setError('')
            setLoading(true)
            let res = await login(email,password).then(()=>{
                setLoading(false)
                history('/')

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
            },2000);
            setLoading(false);
        }
    }
    return (
        <div className="loginWrapper">
           <div className="imgcar" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
              <div className="car">
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={5}
                    // step={3}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
              </div>
          </div>
            <div className="loginCard">
                <Card varient="outlined">
                    <div className="insta-logo">
                        <img src={insta} alt="" />
                    </div>
                    <CardContent>
                        {error!='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value ={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value ={password} onChange={(e)=>setPassword(e.target.value)}/>
                       <Link to='/forgotpassword' style={{textDecoration:"none"}} > <Typography className={classes.text2} color="primary" varient="subtitle1">
                            Forgot Password?
                        </Typography></Link>

                    </CardContent>

                    <CardActions>
                        <LoadingButton fullWidth={true} variant="contained" color="primary" onClick={handleClick} loading={loading} endIcon={<LoginIcon />}loadingPosition="end">
                            Log In
                        </LoadingButton>
                    </CardActions>

                </Card>
                <Card varient="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle2">
                            Don't have an account?<Link to="/signup" style={{ textDecoration: "none" }}> Sign Up</Link>
                        </Typography>
                    </CardContent>

                </Card>
            </div>
        </div>
    );
}