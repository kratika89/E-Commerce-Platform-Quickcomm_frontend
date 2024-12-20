import { useEffect, useState } from "react"
import { Divider, Grid, Button } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { postData, serverURL } from "../../../services/FetchAdmin"
import logo from "../../../assets/logo.png"
export default function Footer() {
    const [category, setcategory] = useState([])
    const fetchallcategory = async () => {
        var result = await postData('userinterface/userdisplayall_category', { status: "limit" })
        setcategory(result.data)
    }
    useEffect(() => {
        fetchallcategory()
    }, [])
    const showcategory = (
        <List>
            {category.map((item) => (
                <ListItem key={item.categoryid} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={item.categoryname} style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
   var data=[ 'My Account','My Orders'
    ,'Wishlist',
    ,'Delivery Addresses',
    'JioMart Wallet' ]
    const showdata=(
        <List>
        { data.map((item)=>{
           return <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={item} style={{fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)'}}/>
                </ListItemButton>
                </ListItem>
            
        })
    }
        </List>
    )
    var x=[  'About Us',
        'FAQ',
        'Terms & Conditions',
        'Privacy Policy',
        'E-waste Policy',
        'Cancellation & Return Policy',
        'Shipping & Delivery Policy',
        'AC Installation by resQ'  ]
        const showdata2=(
            <List>
            { x.map((item)=>{
               return <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={item} style={{fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)'}}/>
                    </ListItemButton>
                    </ListItem>
                
            })
        }
            </List>
        )
    return (
        <div style={{ bottom: 0, background: '#ecf0f1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', flexDirection: 'column' }}>
            <div style={{ width: '75%', marginTop: 20, marginBottom: 50 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <h3 >All Categories</h3>
                        {showcategory}
                    </Grid>
                    <Grid item xs={2.3}>
                        <h3 >Popular Categories</h3>
                        <List>

                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Grocery" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Electronics" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Fashion" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Fashion" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Fashion" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>

                                    <ListItemText primary="Fashion" style={{ fontSize: 10, fontWeight: 500, color: 'rgb(0 0 0 / 65%)' }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2.3}>
                        <h3 >Customer Account</h3>
                        {showdata}
                    </Grid>
                    <Grid item xs={2.4}>
                        <h3 >Help & Support</h3>
                        {showdata2}
                    </Grid>
                    <Grid item xs={3}>
                        <h2>Contact Us</h2>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "rgb(0 0 0 / 65%)", marginTop: 30, width: 180 }}>WhatsApp us: 70003 70003
                            Call us: 1800 890 1222
                            8:00 AM to 8:00 PM, 365 days</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "rgb(0 0 0 / 65%)", marginTop: 30 }}>
                            Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website, please email us on cs@jiomart.com
                        </div>
                        <h2>Download the app</h2>
                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 10 }}><img src={`${serverURL}/images/google-play-icon.jpg`} style={{ width: 140, height: 40 }} /></div>
                            <div><img src={`${serverURL}/images/ios_app_icon.jpg`} style={{ width: 120, height: 40 }} /></div>
                        </div>
                    </Grid>
                </Grid>
            </div>
           <div style={{alignSelf: 'normal',
  borderTop: '2px solid #e0e0e0' }}></div>
            <div style={{paddingLeft:8,paddingRight:8,width:'100%',maxWidth:1184}}>
            <div style={{ display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 16,
  paddingBottom: 16,
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: -0.06,
  lineHeight: 1.3333333333,
  color: "rgb(0 0 0 / 65%)" }}>

                <div style={{ display: 'flex',alignItems:'center'}}>
                    
                        <img src={logo} style={{ width: 40, height: 40 }} />
                         © 2024 All rights reserved. Reliance Retail Ltd.
                    
                </div>
                <div >
                    Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+
                </div>
            </div>
            </div>
        </div>
    )
}