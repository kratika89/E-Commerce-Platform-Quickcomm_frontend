import { useState, useEffect } from "react"
import { postData } from "../../../services/FetchAdmin"
import { Button } from "@mui/material"
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box,Divider } from '@mui/material';
import Slider from "@mui/material/Slider";
import React from "react";


export default function ShowCategory({data,scid}) {
    const [overState, setoverState] = useState('#666666')
    
    const [expanded, setExpanded] =useState('panel1');
    const[brands,setbrands]=useState([])
    const fetchallbrand=async(subcategoryid)=>{
        var result=await postData('userinterface/getallbrandby_subcat',{subcategoryid:subcategoryid})
        setbrands(result.data)
    }
    React.useEffect(()=>{
     
      setExpanded(scid);
      fetchallbrand(scid)
    },[scid])
    const handleChange = (panel) => (event, newExpanded) => {
        fetchallbrand(panel)
      setExpanded(newExpanded ? panel : false);
    };
    

    const [range, setRange] = React.useState([0, 30]);
  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  const [range1, setRange1] = React.useState([0, 30]);
  function handleChange1(event, newValue) {
    setRange1(newValue);
  }
    // const Accordion = styled((props) => (
    //     <MuiAccordion disableGutters elevation={0} square {...props} />
    // ))(({ theme }) => ({
    //     border: `1px solid ${theme.palette.divider}`,
    //     '&:not(:last-child)': {
    //         borderBottom: 0,
    //     },
    //     '&::before': {
    //         display: 'none',
    //     },
    // }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5 rem',color:'#0c5273' }} />}
            {...props}
        />
    ))(({ theme }) => ({
       
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
        // ...theme.applyStyles('dark', {
        //     backgroundColor: 'rgba(255, 255, 255, .05)',
        // }),
    }));
    // const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    //     padding: theme.spacing(2),
    //     borderTop: '1px solid rgba(0, 0, 0, .125)',
    // }));
    

    // var data2 = [
    //     'Chips & Namkeens',
    //     'Biscuits & Cookies',
    //     'Chocolates & Candies',
    //     'Indian Sweets',
    //     'Drinks & Juices',
    //     'Breakfast Cereals',
    //     'Noodles, Pasta & Vermicelli',
    //     'Ready To Cook & Eat',
    //     'Spread, Sauces & Ketchup',
    //     'Pickles, Chutney & Flavouring',
    //     'Tea',
    //     'Coffee'
    // ]
    const showbrands = (
        brands.map((item) => {
            return <AccordionDetails>
                <div style={{
                    marginTop: -17,
                    color: 'rgba(0,0,0,.65)',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.4285714286
                }}>

                    {item.brandname}



                </div>
            </AccordionDetails>
        })
    )
    // var data = [
    //     'Biscuits, Drinks & Packaged Foods',

    //     'Fruits & Vegetables',
    //     'Cooking Essentials',
    //     'Dairy & Bakery',
    //     'Personal Care',
    //     'Beauty',
    //     'Mom & Baby Care',
    //     'Home Care',
    //     'Kitchenware']
    const showsubcategory = (
        data.map((item) => {
            return <div style={{ paddingBottom: 0, borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: -0.07,
                    lineHeight: 1.4285714286,
                    paddingLeft: 0,
                    paddingBottom: 0,
                    color: '#666666',
                    cursor: 'pointer'
                }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1
                    }}>

                        <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            webkitBoxOrient: "vertical",
                            width: 310
                        }}>
                            <Accordion expanded={expanded ===item.subcategoryid} onChange={handleChange(item.subcategoryid)}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Typography>
                                        <div onMouseOver={() => setoverState('black')} onMouseLeave={() => setoverState('#666666')}
                                            style={{

                                                cursor: 'pointer', fontWeight: 600,
                                                fontSize: 15,
                                                letterSpacing: -0.07,
                                                lineHeight: 1.4285714286,
                                                paddingLeft: 0,
                                                paddingBottom: 0,
                                                color: `${overState}`
                                            }}>
                                            {item.subcategoryname}</div>
                                    </Typography>
                                </AccordionSummary>
                                
                                    <Typography>
                                        {showbrands}
                                    </Typography>
                                
                            </Accordion>
                            {/* <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <div onMouseOver={()=>setoverState('black')} onMouseLeave={()=>setoverState('#666666')} 
                                    style={{
                                        
                                        cursor: 'pointer', fontWeight: 700,
                                        fontSize: 15,
                                        letterSpacing: -0.07,
                                        lineHeight: 1.4285714286,
                                        paddingLeft: 0,
                                        paddingBottom: 0,
                                        color: `${overState}`
                                    }}>
                                        {item}</div>
                                </AccordionSummary>
                               {showdetailssubcategory}

                            </Accordion> */}

                        </div>

                    </div>


                </div>
            </div>
        })
    )
    return (<div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: 24, paddingRight: 8 }}>
            <section style={{ padding: 16 }}>
                <div style={{
                    fontWeight: 900,
                    fontSize: 24,
                    letterSpacing: -0.72,
                    lineHeight: 1
                }} >
                    Category
                </div>
                <div style={{
                    marginTop: 0,
                    maxHeight: 450,
                    overflowY:'scroll',
                    overflowX:'hidden'
                }}>
                    {showsubcategory}
                </div>
            </section>
        </div>
        <div style={{ marginTop: 10 }}>
            <Box sx={{ marginLeft: 0, display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 400, height: 800, } }}>
              <section elevation={3} style={{ position: 'relative', padding: 16, borderRadius: 24, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <div style={{ marginBottom: 12, paddingLeft: 15, borderRadius: 24, fontWeight: 900, fontSize: 24, letterSpacing: -0.72, lineHeight: 1 }}>Filters</div>

                <div style={{ display: 'flex', alignItems: 'center', clear: 'both', paddingLeft: 15, fontWeight: 800, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                  Availability</div>

                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Include Out of stock
                    </span>
                  </label>
                </div>

                <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                <div style={{ display: 'flex', alignItems: 'center', clear: 'both', paddingLeft: 15, fontWeight: 800, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                  Categories</div>

                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Breakfast & Snack Mixes
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Canned Food
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Chips & Corn Snacks
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Choco & Nut Spread
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      Chocolates
                    </span>
                  </label>
                </div>

                <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                <div style={{ display: 'flex', alignItems: 'center', clear: 'both', paddingLeft: 15, fontWeight: 800, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                  Brand</div>

                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      90's Mill
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      9GRAMS
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      ADD ME
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      APLENTY
                    </span>
                  </label>
                </div>
                <div style={{ paddingLeft: 8, display: 'flex', marginTop: 12, marginBottom: 12 }}>
                  <label style={{ fontWeight: 500, fontSize: 15, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                    <span><input type='checkBox' style={{ marginLeft: '0.90em', display: 'inline-block', width: '1.25em', height: '1.25em', marginRight: 9, border: '1 solid rgba(0, 0, 0, .65)', borderRadius: 4 }} name='stock' id='instock' value={1} autoComplete='off' /></span>
                    <span>
                      BEVZILLA
                    </span>
                  </label>
                </div>

                <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, clear: 'both', paddingLeft: 15, fontWeight: 800, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                  Price</div>

                {/*<div style={{width:'80%',float: 'unset',paddingLeft:20,paddingRight:12,display: 'flex', marginTop: 12,marginBottom: 12,fontWeight: 500,fontSize: 15,letterSpacing: -0.08,lineHeight: 1.4285714286, display: 'flex', alignItems: 'flex-start',color: 'rgba(0, 0, 0, .65)',cursor: 'pointer',boxSizing: 'border-box',webkitFontSmoothing: 'antialiased',mozOsxFontSmoothing: 'grayscale',textRendering: 'optimizeLegibility', scrollBehavior: 'smooth',webkitTextSizeAdjust: '100%',msTextSizeAdjust: '100%',webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',position: 'relative' }}>
                       
                        <div style={{height: 4,width: '100%',backgroundColor: '#0078ad'}}>
                          <div aria-valuemax="1000" aria-valuemin="4" ariaValuenow='4' aria-disabled='false' data-handle-key='0' role='slider' tabIndex={0} aria-label='Minimum Filter Handle' style={{left:0,position:'absolute',marginLeft: 12,top: -7,width: 20,height: 20,zIndex: 1,borderRadius: '50%',cursor: 'grab',backgroundColor: '#0078ad'}} >
                            <div style={{display: 'flex',justifyContent: 'center',marginTop: 20,textAlign: 'left',fontWeight: 700,fontSize: 12,letterSpacing: -0.06,lineHeight: 1.3333333333}}>4</div>
                            </div>
                      
                          <div aria-valuemax="1000" aria-valuemin="4" ariaValuenow='1000' aria-disabled='false' data-handle-key='1' role='slider' tabIndex={0} aria-label='Maximum Filter Handle' style={{left:'100%',position:'absolute',marginLeft: -12,top: -7,width: 20,height: 20,zIndex: 1,borderRadius: '50%',cursor: 'grab',backgroundColor: '#0078ad'}} >
                            <div style={{display: 'flex',justifyContent: 'center',marginTop: -17,textAlign: 'left',fontWeight: 700,fontSize: 12,letterSpacing: -0.06,lineHeight: 1.3333333333}}>1000</div>
                          </div>
                        </div>
                       
                        </div>*/}

                <div style={{ width: '80%', paddingLeft: 20, paddingRight: 12, display: 'flex', marginTop: 5, marginBottom: 12, }}>
                  <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" />
                </div>

                <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, clear: 'both', paddingLeft: 15, fontWeight: 800, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                  Discount</div>

                <div style={{ width: '80%', paddingLeft: 20, paddingRight: 12, display: 'flex', marginTop: 0, marginBottom: 12, }}>
                  <Slider value={range1} onChange={handleChange1} valueLabelDisplay="auto" />
                </div>


              </section>
            </Box>
          </div>

        </div>
    </div>)
}