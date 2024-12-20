import Header from "../homepage/Header"
import ProductDetailCategory from "./ProductDetailCategory"
import ShowCategory from "./ShowCategory"
import SortButton from "./SortButton"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import { postData } from "../../../services/FetchAdmin";
import { useEffect } from "react";
import { getData } from "../../../services/FetchAdmin";
import { useLocation } from "react-router-dom";
export default function PageCategoryDisplay() {
    const[subcategory,setsubcategory]=useState([])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const md_matches = useMediaQuery(theme.breakpoints.up('md'));
    const location=useLocation()
    const [refresh,setrefresh]=useState(false)
    var productdata=location?.state?.productdata

    console.log("xxxxx:",productdata )
    const fetchallsubcategory=async()=>{
        var result=await getData('userinterface/userdisplayall_subcategory')
        setsubcategory(result.data)   
    }
    useEffect(function(){
    fetchallsubcategory()
},[])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div>
                <Header />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                minWidth: 1030,
                minHeight: 'auto',
                marginTop: 24
            }}>
                <div style={{ width: '82.6%' }}>
                    <div style={{ marginTop: 24 }}>
                        <div style={{
                            display: 'flex',
                            flex: '0 1 auto',
                            flexWrap: 'wrap'
                        }}>

 {md_matches?
                            <div style={{
                                flexBasis: '25%',
                                maxWidth: '25%'
                            }}>
                               <ShowCategory data={subcategory} scid={productdata[0]?.subcategoryid} />
                            </div>:<></>}
                            <div style={{
                                flexBasis: matches?'75%':'51%',
                                maxWidth: '75%'
                               
                            }}>
                                {matches? <div style={{
                                        
                                    display: 'flex',
                                    flex: ' 0 1 auto',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    height:30,
                                    
                                }}>

                                 <SortButton/>
                                </div>:<></>}
                                
                              
                                <ProductDetailCategory  productdata={productdata} refresh={refresh} setrefresh={setrefresh} />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}