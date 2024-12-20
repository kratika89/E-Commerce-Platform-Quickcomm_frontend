import Header from "./Header"
import OfferScroll from "./OfferScroll"
import Adscroll from "./Adscroll"
import ProductScroll from "./ProductScroll" 
import Footer from "./Footer"
import { getData } from "../../../services/FetchAdmin"
import { postData } from "../../../services/FetchAdmin"
import { useState,useEffect} from "react"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function HomePage(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const[bankoffer,setbankoffer]=useState([])
   const[banners,setbanners]=useState([])
   const[addoffer,setaddoffer]=useState([])
   const[popularproductoffers,setpopularproductoffers]=useState([])
   const[refresh, setrefresh]=useState(false)


   const fetchallproductoffers=async(productstatus)=>{
    var result=await postData('userinterface/displayall_productdbystatus',{productstatus})
    setpopularproductoffers(result.data)   
}
   const fetchallbanners=async()=>{
    var result=await getData('userinterface/show_banner')
    setbanners(result.data)   
}
const fetchalladdoffer=async()=>{
    var result=await getData('userinterface/all_adoffers')
    setaddoffer(result.data)   
}
const fetchallbankoffers=async()=>{
    var result=await getData('userinterface/show_bankoffer')
    setbankoffer(result.data)   
}

useEffect(function(){
    fetchallbanners()
},[])
useEffect(function(){
    fetchallbankoffers()
    fetchalladdoffer()
    fetchallproductoffers('Popular')
},[])
    return(
        
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
            
            <div>
        <Header/>
        </div> 
       
        <div style={{width:'82.6%',alignSelf:'center',marginTop:30}}>
        <OfferScroll state={"Offer"} data={addoffer}/>
        </div>

        <div style={{width:'82.6%',alignSelf:'center',marginTop:40}}>
        <Adscroll  data={banners}/>
        </div>
        
        <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
        <OfferScroll state={"Bank"} data={bankoffer}/>
        </div>
        
        <div style={{width:'82%',alignSelf:'center',marginTop:90}}>
        <ProductScroll refresh={refresh} setrefresh={setrefresh} data={popularproductoffers} title={"Popular"}/>
        </div>
        <div style={{width:'82%',alignSelf:'center',marginTop:90}}>
        <ProductScroll refresh={refresh} setrefresh={setrefresh} data={popularproductoffers} title={"Top Brands"}/>
        </div>

        <div style={{marginTop:90,width:'100%',alignSelf:'center'}}>
           {matches? <Footer/>:<></>}
        </div>
        </div>
    )
}