import { useState,useEffect } from "react"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
export default function PlusMinusButton(props){
    const [overState,setoverState]=useState('#b5b5b5')
    const [value,setvalue]=useState(0)
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
 //{width=150,background='white',color='#1f3d4c',justifyContent='space-between'}


    return(<div>{value==0?<div onClick={handlePlus}  onMouseOver={()=>setoverState('#1f3d4c')} onMouseLeave={()=>setoverState('#b5b5b5')} style={{cursor:'pointer',width:150,marginTop:7,height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'center',alignItems:'center',color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5,background:'white'}}>
    Add
    </div>:
    <div style={{width:150,marginTop:7,height:45,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <div onClick={handleMinus} style={{cursor:'pointer',width:35,marginTop:8,height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'center',alignItems:'center',color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
    <RemoveIcon/>
    </div>
    <div>{value}</div>
    <div onClick={handlePlus} style={{cursor:'pointer',background:'#0c5273',width:35,marginTop:8,height:35,border:`0.7px solid ${overState}`,display:'flex',justifyContent:'center',alignItems:'center',color:'#fff',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
    <AddIcon/>
    </div>
    </div>

    }
    </div>)

}