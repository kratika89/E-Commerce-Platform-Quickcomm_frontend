import { Box ,Button,Menu, MenuItem} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { getData, postData } from "../../../services/FetchAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Appmenubar(){
    const[category,setcategory]=useState([])
    const[subcategory,setsubcategory]=useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate=useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchallsubcategory(event.currentTarget.value)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchallsubcategory=async(categoryid)=>{
    var result=await postData('userinterface/usergetallsubcatby_catid',{categoryid})
    setsubcategory(result.data)

  }
const fetchAllcategory=async()=>{
    var result=await postData('userinterface/userdisplayall_category',{status:'limit'})
    setcategory(result.data)
}
const fetchallproductdetailsbysubcategory=async(subcategoryid)=>{
  var result=await postData('userinterface/userdisplayall_productdetails_by_subcategory',{subcategoryid})
  navigate('/pagecategorydisplay',{state:{productdata:result.data}})

}
useEffect(()=>{
    fetchAllcategory()
},[])

const showcategorymenu=()=>{
    return category.map((item)=>{
        return (<Button onClick={handleClick} value={item.categoryid} style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>{item.categoryname}</Button>)
    
    
      })
}
const showsubcategorymenu=()=>{
  return subcategory.map((item)=>{
      return (<MenuItem onClick={()=>fetchallproductdetailsbysubcategory(item.subcategoryid)}  >{item.subcategoryname}</MenuItem>)
  
  
    })
}
    return(<div>
        <Box sx={{flexGrow:1}}>
         <AppBar position="static" style={{height:50,background:'#0c5273'}}>
        <Toolbar style={{display:'flex',justifyContent:'center'}}>
          {showcategorymenu()}
          <Button style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>All Categories</Button>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {showsubcategorymenu()}
      </Menu>
        </Toolbar>
      </AppBar>
      </Box>
    </div>)
}