import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { List,ListItem,ListItemButton,ListItemIcon,
  ListItemText,Grid,Paper,Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {serverURL} from "../../../services/FetchNodeAdminServices";
import MenuIcon from '@mui/icons-material/Menu';
import Category from '../category/Category';
import Subcategory from '../subcategory/Subcategory'
import DisplayAllSubcategory from '../subcategory/DisplayAllSubcategory'
import { Route,Routes,useNavigate } from 'react-router-dom';
import DisplayAllCategory from '../category/DisplayAllCategory';
import Brand from '../brands/Brand'
import Displayallbrand from '../brands/Displayallbrand'
import Product from '../Product/Product'
import Displayallproduct from '../Product/Displayallproduct'
import Productdetail from '../productdetails/Productdetail'
import Displayallproductdetail from '../productdetails/Displayallproductdetail'
import Productdetailpicture from '../productdetailpicture/Productdetailpicture'
import Mainbanner from'../banner/Mainbanner'
import Addoffers from '../Addoffers/Addoffers'
import Bankoffers from '../bankoffer/Bankoffers'
export default function DashBoard(){
  var navigate=useNavigate()
    return(<div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quickcomm
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid container>
      <Grid item xs={2}>
      <Paper elevation={3} style={{margin:10,height:600,display:'flex',alignItems:'center',flexDirection:'column'}}>
       <div >
        <img src={`${serverURL}/images/1.jpg`} style={{width:100,height:100,borderRadius:50,marginTop:10}}/>
       </div>
       <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
        Harry Singh
       </div>
       <div style={{fontSize:12,fontWeight:'bold',color:'grey'}}>
        harrysingh@gmail.com
       </div>
       <Divider style={{width:'90%',marginTop:10}}/>
       <div>
        <List>
          <ListItem style={{marginTop:5}}>
            <ListItemButton>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/dashboard.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                Dashboard
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}> 
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/category.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                Category
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/subcategory.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                SubCategory
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallbrand')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/brand-image.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                Brands
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallproduct')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/products.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                Products
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/displayproductdetail')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/product-catalog.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
               Product Details
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/productdetailpicture')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/product-image.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
                Products Image
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/mainbanner')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/ribbon-folds.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
               Banners
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/addoffers')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/adimages.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
               Products Add
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton onClick={()=>navigate('/dashboard/bankoffers')}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/bank-account.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
               Bank Offers
              </div>
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem style={{marginTop:-25}}>
            <ListItemButton>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <img src='/check-out.png' style={{width:30,height:30}}/>
              <div style={{fontWeight:600,marginLeft:10}}>
               Logout
              </div>
              </div>
            </ListItemButton>
          </ListItem>
        </List>
       </div>
      </Paper>
      </Grid>
      <Grid item xs={10}>
      <Routes>
       <Route element={<Category/>} path="/category"></Route>
       <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
       <Route element={<Subcategory/>} path="/subcategory"></Route>
        <Route element={<DisplayAllSubcategory/>} path="/displayallsubcategory"></Route>
        
        
      <Route element={<Brand/>} path="/brand"></Route>
      <Route element={<Displayallbrand/>} path="/displayallbrand"></Route>
      <Route element={<Product/>} path="/product"></Route>
      <Route element={<Displayallproduct/>} path="/displayallproduct"></Route>
      <Route element={<Productdetail/>} path="/productdetail"></Route>
      <Route element={<Displayallproductdetail/>} path="/displayproductdetail"></Route>
      <Route element={<Productdetailpicture/>} path="/productdetailpicture"></Route>
      <Route element={<Mainbanner/>} path="/mainbanner"></Route>
      <Route element={<Bankoffers/>} path="/bankoffers"></Route>
      <Route element={<Addoffers/>} path="/addoffers"></Route> 
      </Routes>
      </Grid>
      </Grid>
 </div>
  
  )
}