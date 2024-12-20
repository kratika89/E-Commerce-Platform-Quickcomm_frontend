import { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'

export default function SortButton(){
   
    const [overState,setoverState]=useState('#b5b5b5')
    return(<div onMouseOver={()=>setoverState('#0c5273')} onMouseLeave={()=>setoverState('#b5b5b5')} style={{marginLeft:730,display:'flex',alignItems:'center',justifyContent:'center',width:200,border:`0.7px solid ${overState}`,height:28,borderRadius:14}}>
          Sort By :Popularity
    </div>)
}