import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button ,TextField,Grid} from '@material-ui/core'
import emailBackground from '../../assests/images/email.png'
import EmailIcon from '@material-ui/icons/Email';
function ContactUs() {
    const classes=useStyles()
    return (
    <Grid container className={classes.container} justify="center" alignItems="center">
        <Grid item xs={12} md={6} lg={6} sm={6} className={classes.imageContainer}>
        <img src={emailBackground} className={classes.backgroundImage} alt="" />
        </Grid>

     <Grid item xs={12} md={6} lg={6} sm={6} className={classes.formContainer}>
         <EmailIcon className={classes.emailIcon}/>
         <TextField
          id="outlined-name-input"
          label="Name"
          variant="outlined"
          className={classes.root}
          InputLabelProps={{style:{color:"#fff"}}}
        /> 
        <TextField
          id="outlined-email-input"
          label="Email"
          variant="outlined"
          className={classes.root}
          InputLabelProps={{
            style:{color:"#fff"}
          }}
        /> 
        
        <TextField
          id="outlined-message-input"
          label="Message"
          variant="outlined"
          multiline
          rowsMax={5}
          className={classes.root}
          InputLabelProps={{
                style:{color:"#fff"}
          }}
        /> 
        <Button variant="contained" className={classes.button} >SUBMIT</Button>

        </Grid>
        </Grid>
    )
}

export default ContactUs

const useStyles = makeStyles((theme) => ({
   container:{
     backgroundColor: "#191919",
     padding:50,
     display:"flex",
     flexDirection:"row"
  },
  contactHeading:{
   color:"white",
   fontSize:20,
   fontWeight:800
  },
  root: {
      margin:20,
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373233",
      backgroundColor: "#373233",
      width:"75%",
      borderRadius:10
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "teal",
      backgroundColor: "teal",
      color:"white",
    },
    [theme.breakpoints.down('xs')]: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#373233",
            backgroundColor: "#373233",
            width:"100%"
          },
        
      },
      [theme.breakpoints.down('sm')]: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#373233",
            backgroundColor: "#373233",
            width:"100%"
          },
        
      },


  },
  formContainer:{
      display:"flex",
      flexDirection:"column"
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

},

backgroundImage: {
    height: "400px",
    width: "400px",
    outline:"none",
    borderRadius:"50%",
    [theme.breakpoints.down('sm')]: {
        height: "250px",
        width: "250px",
     
      },
      [theme.breakpoints.down('xs')]: {
        height: "300px",
        width: "300px",
     
      },

},
emailIcon:{
    color:"white",
    fontSize:80,
    marginLeft:20
    
},
button: {
    backgroundColor: 'black',
    color: '#fff',
    width:"30%",
    height:50,
    marginLeft:25,
    marginTop:10,
    borderRadius:0,
    '&:hover': {
      backgroundColor: '#fff',
      color: 'black',
  },
  
}
  }));
  
