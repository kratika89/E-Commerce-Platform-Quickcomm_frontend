import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchAdmin";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef, useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinusButton from "./PlusMinusButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ProductScroll({title,data,refresh,setrefresh}) {

    const [anchorEl, setAnchorEl] = useState(null)
    const [ishovering, setishovering] = useState(false);
    const open = Boolean(anchorEl);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handlemouseover = () => {
        setishovering(true)
    }
    const handlemouseout = () => {
        setishovering(false)
    }
    var scrollRef = useRef()
    const theme = useTheme();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const md_matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:md_matches?6:matches?3:2,
        slidesToScroll: 1,
        arrows: false
    };
    
    const handleChange=(value,item)=>{
        if(value==0){
            dispatch({type:"DELETE_CART",payload:[item.productdetailid]})

        }
        else{
    item['qty']=value
    dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})

    setrefresh(!refresh)}
    }
    var cartData=useSelector((state)=>state?.cart)
    var keys=Object.keys(cartData)

    const handleNavigateProductDetail=(item)=>{
     navigate("/productdetailspage",{state:{product:item}})
    }

    const showimages = () => {
        return data.map((item) => {
            var op = parseInt(((item.price - item.offerprice) / item.price) * 100)
          
            return <div   style={{ display: 'flex', flexDirection: 'column' }}>
                <div  onClick={()=>handleNavigateProductDetail(item)} style={{ alignSelf: 'center',height:matches?180:150 }}>
                    <img onMouseOver={handlemouseover} onMouseOut={handlemouseout} src={`${serverURL}/images/${item.picture}`} style={{ width: md_matches?'80%':matches?'60%':'50', borderRadius: 10 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' ,height:115}}>
                    <div style={{
                        fontSize: 14, fontWeight: 550, width: '70%',
                        overflow: "hidden",
                        textOverflow: 'ellipsis',
                        display: "-webkit-box",
                        WebkitLineClamp: matches?"2":"1",
                        webkitBoxOrient: "vertical",
                        letterSpacing: -0.07,
                        lineHeight: 1.4285714286,
                    }}>
                        {item.productdetailname}
                    </div>
                    {item.productdetailname.length <= 24 ? <div style={{ fontSize: 14, fontWeight: 550, letterSpacing: -0.07, lineHeight: 1.4285714286, }}>&nbsp;</div> : <></>}
                    <div style={{
                        fontSize: 14, fontWeight: 550, letterSpacing: -0.07,
                        lineHeight: 1.4285714286
                    }}>
                        {item.weight} {item.weightType}
                    </div>
                    {item.offerprice > 0 ? <div style={{ display: 'flex', flexDirection: 'column', marginTop: 7 }}>
                        <div style={{
                            fontSize: 14, fontWeight: 550, letterSpacing: -0.07,
                            lineHeight: 1.4285714286
                        }}>
                            <span>&#8377;</span>  {item.offerprice}
                        </div>
                        <div style={{
                            fontSize: 14, fontWeight: 550, letterSpacing: -0.07,
                            lineHeight: 1.4285714286, color: 'grey'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}><s><span>&#8377;{item.price}</span> </s>
                                <span style={{ background: '#e5f7ee', color: '#03753c', margin: 5, width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, textAlign: 'center' }}>{op}%OFF</span>
                            </div>
                        </div>
                    </div> : <div>
                        <div style={{
                            marginTop: 7,
                            fontSize: 14, fontWeight: 550, letterSpacing: -0.07,
                            lineHeight: 1.4285714286
                        }}>
                            <span>&#8377;</span> {item.price}
                        </div>
                        <div style={{ lineHeight: 1.4285714286, }}>&nbsp;</div>
                    </div>}
                    </div>
                    <div>
                        <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChange(value,item)}/>
                    </div>
                
            </div>
        })
    }
    const handleNext = () => {
        scrollRef.current.slickNext()
    }
    const handleprevious = () => {
        scrollRef.current.slickPrev()
    }
    return (<div>
        <div style={{fontWeight: 900,
  fontSize: 24,
  letterSpacing: -0.72,
  lineHeight: 1,
  color: '#141414',marginBottom:5}}>{title}</div>
    <div style={{ position: 'relative' }}>
        {matches ?

            <div onClick={handleNext} style={{ background: '#3498db', opacity: '0.5', position: 'absolute', top: '43%', zIndex: 2, left: '0.8%', width: 30, height: 30, display: 'flex', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <KeyboardArrowLeftIcon style={{ color: '#fff' }} />

            </div> : <div></div>}

        <Slider ref={scrollRef} {...settings}>

            {showimages()}

        </Slider>
        {matches ?

            <div onClick={handleprevious} style={{ background: '#3498db', opacity: '0.5', position: 'absolute', top: '43%', zIndex: 2, right: '1%', width: 30, height: 30, display: 'flex', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <KeyboardArrowRightIcon style={{ color: '#fff' }} />
            </div> : <div></div>}
    </div></div>
    )
}