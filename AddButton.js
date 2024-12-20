import { useEffect, useState } from "react"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function AddButton(props) {
    const [overState,setoverState]=useState('#b5b5b5')
    const [value,setvalue]=useState(0)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    useEffect(function(){
    setvalue(props.qty)
    },[props.qty])
    const handlePlus=()=>{
        var v=value
        v++
        setvalue(v)
        props.onChange(v)
    }
    const handleMinus=()=>{
        var v=value
        v--
        setvalue(v)
        props.onChange(v)
    }
    return(<div>{value==0?<div onClick={handlePlus} onMouseOver={()=>setoverState('#0c5273')} onMouseLeave={()=>setoverState('#b5b5b5')}  style={{cursor:'pointer',width:'auto',height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'space-between',alignItems:'center',color:'#0c5273',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
      <div style={{marginLeft:10}}> Add</div>
      <div style={{color:'#0c5273',fontSize:20,fontWeight:700,marginRight:10,marginBottom:6}}>+</div>
    </div>:<div style={{width:100,height:35,display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:matches? 165:104}}>
    <div onClick={handleMinus} style={{cursor:'pointer',width:35,marginTop:8,height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'center',alignItems:'center',color:'#0c5273',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
    -
    </div>
    <div>{value}</div>
    <div onClick={handlePlus} style={{cursor:'pointer',width:35,marginTop:8,height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'center',alignItems:'center',color:'#0c5273',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
    +
    </div>
    </div>}
    </div>)

}