import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState,useEffect } from 'react';
import { getData, postData, serverURL } from '../../../services/FetchAdmin';

export default function MyDrawer(props) {
  const [open, setOpen] = React.useState(false);
  const [category,setcategory]=useState([])

  const fetchAllcategory=async()=>{
    var result=await postData('userinterface/userdisplayall_category',{status:'limit'})
    setcategory(result.data)
}
useEffect(()=>{
    fetchAllcategory()
},[])
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>props.setopen(false)}>
      <List>
        {category.map((item) => (
          <ListItem key={item.categoryid} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <img src={`${serverURL}/images/${item.categoryicon}`} style={{width:40,height:40}}/>
              </ListItemIcon>
              <ListItemText primary={item.categoryname} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <img src={`${serverURL}/images/menu.png`} style={{width:40,height:40}}/>
              </ListItemIcon>
              <ListItemText primary="All Categories" />
            </ListItemButton>
          </ListItem>
      </List>

      <Divider/>
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={'/check-out.png'} style={{width:40,height:40}}/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
       
      </List>
    </Box>
  );

  return (
    <div>
     
      <Drawer open={props.open} onClose={()=>props.setopen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
