import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../../assets/logo.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextBoxSearch from './TextBoxSearch';
import { useTheme } from '@mui/material/styles';
import { Badge } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Appmenubar from './Appmenubar';
import MyDrawer from './Mydrawer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [open,setopen]=React.useState(false)
  const handleClick=()=>{
    setopen(true)
  }
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  var cartData=useSelector(state=>(state.cart))
  var user=useSelector(state=>(state.user))
  var userData=Object.values(user)
  console.log("USERDATA:",userData)
  var keys=Object.keys(cartData)
  var navigate=useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {matches?<div></div>:
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick} />
          </IconButton>}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <Typography onClick={()=>navigate('/homepage')} variant="h6" component="div" style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
           <img src={logo} style={{width:50,height:50}}/>
           <div style={{fontSize:24,cursor:'pointer'}}>Quickcomm</div>
          
          </Typography>
         {matches?<TextBoxSearch/>:<div></div>}
          
          <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={keys.length} color="secondary">
   <ShoppingCartIcon onClick={()=>navigate('/cart')} style={{marginLeft:20}}/>
</Badge>
           
          </IconButton>
          
          {matches?<IconButton
          
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon style={{fontSize:30}}/>
            {userData?.length==0?<div onClick={()=>navigate('/signuppage')} style={{fontWeight:'bold',fontSize:16,marginLeft:10}}>Sign In</div>:<div onClick={()=>navigate('/signuppage')} style={{fontWeight:'bold',fontSize:16,marginLeft:10}}>{userData[0].firstname}</div>}
          </IconButton>:<div></div>}
         
          </div>
         </div>
          
        </Toolbar>
      </AppBar>

      {/* <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span> */}
      {matches?<></>:
      <AppBar position="static">
        <Toolbar>
          <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <TextBoxSearch width="85%" />
        </div>
        </Toolbar>
      </AppBar>}
      {matches?
      <Appmenubar/>:<div></div>
}
<MyDrawer open={open} setopen={setopen} />
    </Box>
  );
}
