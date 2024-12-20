import { makeStyles } from "@mui/styles"
var userStyle = makeStyles({
    root: {
        width: '100%',
        height: '100%',
       display:'flex',
       justifyContent:'center',
       alignItems:'center'
    },
    box: {
        width: '500px',
        height: 'auto',


        background: '#dcdde1',
        padding: 10,
        margin: 10,

    },
    headingStyle: {
        marginLeft: 10,
        fontSize: 24,

    }
    ,
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        width: 70,
        height: 60,
    },
    errorMessageStyle:
      {color: '#d32f2f',"fontFamily":"\"Roboto\", \"Helvetica\", \"Arial\", sans-serif","fontWeight":"400","fontSize":"0.75rem","lineHeight":"1.66","letterSpacing":"0.03333em","textAlign":"left","marginTop":"3px","marginRight":"14px","marginBottom":"0","marginLeft":"14px"}
,
displayBox : {
    width: '800',
    height: 'auto',
    background: '#dcdde1',
    padding: 10,
    margin: 10,

}})
export {userStyle}