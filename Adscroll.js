import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchAdmin";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef,useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Adscroll({data}){
    const[anchorEl,setAnchorEl]=useState(null)
    const[ishovering,setishovering]=useState(false);
    const open=Boolean(anchorEl);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
      const handlemouseover=()=>{
       setishovering(true)
      }
      const handlemouseout=()=>{
       setishovering(false)
      }
    var scrollRef=useRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
   // var data=['b1.webp','b2.webp','b3.jpg','b5.webp']
    const showimages=()=>{
        return data.map((item)=>{
            return <div>
                <img  onMouseOver={handlemouseover} onMouseOut={handlemouseout} src={`${serverURL}/images/${item.filenames}`} style={{width:'100%',borderRadius:10}}/>
            </div>
        })
    }
    const handleNext=()=>{
        scrollRef.current.slickNext()
    }
    const handleprevious=()=>{
        scrollRef.current.slickPrev()
    }
  return(<div style={{position:'relative'}}>
    {matches?
   
    <div onClick={handleNext} style={{background:'#3498db',opacity:'0.5',position:'absolute',top:'43%',zIndex:2,left:'0.8%',width:30,height:30,display:'flex',borderRadius:20,alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowLeftIcon style={{color:'#fff'}}/>
   
   </div> :<div></div>}

       <Slider ref={scrollRef} {...settings}>
       
       {showimages()}
     
       </Slider>
       {matches?
       
       <div onClick={handleprevious} style={{background:'#3498db',opacity:'0.5',position:'absolute',top:'43%',zIndex:2,right:'1%',width:30,height:30,display:'flex',borderRadius:20,alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowRightIcon style={{color:'#fff'}}/>
    </div>:<div></div>}
    </div>
    )
}