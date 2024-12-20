import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
export default function TextBoxSearch({width="40%"}){
  return(<div style={{width:width,height:50,borderRadius:25,background:'#0c5273',display:'flex',alignItems:'center'}}>

<SearchIcon color='enherit'style={{padding:10,fontSize:30}}/>
<input type='text' style={{width:'70%',height:26,border:0,borderWidth:0,background:'transparent',outline:0,color:'#fff',fontSize:18}} placeholder='Search here...'/>
<ListIcon color='inherit' style={{fontSize:30,padding:10,marginLeft:'auto',marginRight:10}}/>
  </div>)  
}