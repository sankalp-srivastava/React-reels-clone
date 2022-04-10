import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import insta from '../Assets/Instagram.JPG'
import HomeIcon from '@mui/icons-material/Home';


export default function Navbar({ userData }) {
    const history = useNavigate()
    const {logout} = React.useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        history(`/profile/${userData.userID}`)
    }
    const handleLogout = async() => {
        await logout();
        history('/login')
    }
    const handleExplore = () =>{
        let win = window.open("https://github.com/sankalp-srivastava/React-reels-clone")
        win.focus();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfile}>My Profile &nbsp;&nbsp;<AccountCircleIcon /></MenuItem>
            <MenuItem onClick={handleLogout}>Logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<LogoutIcon /></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            
            <MenuItem onClick={handleProfile}>My Profile &nbsp;&nbsp;<AccountCircleIcon /></MenuItem>
            <MenuItem onClick={handleLogout}>Logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<LogoutIcon /></MenuItem>
        </Menu>
    );
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{background:'white',verticalAlign:'center'}}>
                <Toolbar>
                   <div style={{marginLeft:'3%'}}>
                       <img src={insta} onClick={()=>history('/')} style={{width:'20vh'}}/>
                   </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' },color:'black' , alignItems:'center',marginRight:'4rem' }}>

                    <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={()=>history('/')} 
                            sx={{marginRight:'0.9rem'}}
                            color="inherit"
                        >
                        <HomeIcon />
                        </IconButton>
                        
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleExplore}
                            color="inherit"
                            sx={{marginRight:'1rem'}}
                        >
                            <GitHubIcon  />
                        </IconButton>
                        
                       
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={userData.profileUrl} style={{height:'2rem',width:'2rem'}}/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' },color:'black' }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
