import { Grid } from "@mui/material"
import { postData, serverURL } from "../../../services/FetchAdmin"
import { useState } from "react"
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ProductImageComponent({product,setProduct}) {

    const[overState,setoverState]=useState('#e0e0e0')
    const [productpicture, setproductpicture] = useState([]);
    const[selectedImage,setselectedImage]=useState(product.picture);


    var scrollRef = useRef()
    var settings = {
        dots: false,
        infinite: true,
        spaceBetween: 24,
        // autoplay: true,
        // autoplaySpeed: 2500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        // afterChange: () => setIndex(index + 1),
      
      };


  const fetchallproductpicturebyid = async () => {
    var response = await postData(
      "userinterface/user_display_product_pictures",
      { productdetailid: product?.productdetailid }
    );
    setproductpicture(response?.data[0]?.filenames?.split(",") );
  };
  useEffect(() => {
    setselectedImage(product.picture)
    fetchallproductpicturebyid();
  }, [product]);
    
    const handleImage=(item)=>{
        setselectedImage(item)
    }
    const handleNext = () => {
        scrollRef.current.slickNext()
    
      }
    
      const handlePrev = () => {
        scrollRef.current.slickPrev()
      }
    const showimages=()=>{
       return productpicture.map((item)=>{
            return <div onMouseOver={()=>setoverState('#0c5273')} onMouseLeave={()=>setoverState('#e0e0e0')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 74, height: 70, border: `1px solid ${overState}`, marginBottom: 12, padding: 10, borderRadius: 20}}>
            <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{width:'100%',height:'100%'}}/>
            </div>
        })
    }
    return (
        
        <div style={{ display: 'flex', maxWidth: '100%', marginTop: 8, marginBottom: 16 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <div style={{
                        position: 'relative',
                        height: 505,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',marginLeft:8
                    }}>
                        <div onClick={handleNext} onMouseOver={()=>setoverState('#0c5273')} onMouseLeave={()=>setoverState('#e0e0e0')} style={{ display: 'flex',transition: 'cubic-bezier(0.35, 0, 0.25, 1) 300ms', alignItems: 'center', justifyContent: 'center', width: 74, height: 18, border: `1px solid ${overState}`, marginBottom: 12, padding: 8, borderRadius: 20 }}>
                            <img src={`${serverURL}/images/${'chevron-down-icon.png'}`} />
                        </div>
                        <div style={{width:100,overflow:'hidden'}}>
                        <Slider ref={scrollRef} {...settings} >
                        {showimages()}
        </Slider>
                      
                        </div>
                        <div onClick={handlePrev} onMouseOver={()=>setoverState('#0c5273')} onMouseLeave={()=>setoverState('#e0e0e0')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 74, height: 18, border: `1px solid ${overState}`, marginBottom: 12, padding: 8, borderRadius: 20 }}>
                            <img src={`${serverURL}/images/${'chevron-down-icon.png'}`} />
                        </div>
                    </div>

                </Grid>
                <Grid item xs={10}>
                    <div style={{width:'100%',height:20}}></div>
                    <Paper elevation={2}>
                    <div style={{width:'100%',height:480,borderRadius:220 ,marginRight:8}}>
                        <img src={`${serverURL}/images/${selectedImage}`} style={{width:'100%',height:'100%'}} />
                    </div></Paper>
                </Grid>

            </Grid>

        </div>
    )
}