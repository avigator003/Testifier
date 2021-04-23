import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, FormControlLabel, Checkbox, Button,Stepper ,Step,StepLabel,Typography  } from "@material-ui/core";
import registerBackground from '../assests/images/signup.png'
import GoogleButton from 'react-google-button'
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { register } from "../store/Actions";
import { Spin } from "antd";
import api from "../resources/api";
import { Link, useHistory } from 'react-router-dom';
import Header from '../Home/HomeComponents/Header';


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

function getSteps() {
    return ['Step 1', 'Step 2' ];
  }


function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Step 1';
      case 1:
        return 'Step 2';
      default:
        return 'Unknown stepIndex';
    }
  }


function Registration(props) {
    
    const classes = useStyles()
    const dispatch = useDispatch();
    const history=useHistory();


    const [display, setDisplay] = useState(false);
    const [state, setState] = useState({
      name: "",
      userName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      upscAttempts:"",
      additionalSubjects:""
    });
    const [error, setError] = useState({
      name: "",
      userName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      upscAttempts:"",
      additionalSubjects:""
    });
  
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    const handleChange = (e) => {
      e.persist();
      setDisplay(false)
      const { name, value } = e.target;
      let errors = error;
      switch (name) {
        case "name":
          errors.name =
              (value.length == 0) 
              ? "" 
              : (!validNameRegex.test(value))
              ? " Name must be in characters!"
              : (value.length > 20) 
              ? " Name must be less than 20 characters long!" 
              : "";
         break;
        case "userName":
          errors.userName =
            (value.length == 0) ? "" : (value.length > 20) 
             ? "User Name must be less than 20 characters long!" 
            : "";
          break;
        case "emailAddress":
          errors.emailAddress = validEmailRegex.test(value)
            ? ""
            : "Email is not valid!";
          break;
        case "upscAttempts":
          errors.upscAttempts =
            value === "" ? "Should be a Number" : "";
          break;
          case "additionalSubjects":
          errors.additionalSubjects =
            value === "" ? "" : "";
          break;
        case "phoneNumber":
          errors.phoneNumber =
            value.length < 10 || value.length > 13
              ? "phone number must be between 10 and 13 digits"
              : "";
          break;
        case "password":
          errors.password =
            value.length < 6 ? "Password must be at least 6 characters" : "";
          break;
        default:
          break;
      }
      setError({ ...errors });
      setState((st) => ({ ...st, [e.target.name]: e.target.value }));
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
        const validateForm = (error) => {
          let valid = true;
          Object.values(error).forEach((val) => val.length > 0 && (valid = false));
          return valid;
        };

        console.log("eroor",error)
        if (validateForm(error)) {
          checkValidity();
        } else {
          return notification.warning({
            message: "Failed to Register.",
          });
        }
      
    };
  
    function checkValidity() {
      if (!Object.keys(state).every((k) => state[k] !== "")) {
        return notification.warning({
          message: "Fields Should Not Be Empty",
        });
      }  else {
        return dispatch(
          register(state, (err, response) => {
            if (err) {
              notification.error(err);
            } else {
              
              props.history.push('/login')
              notification.success(response);
            }
          })
        );
        


      }
      
    }
  
    
    return (
        <>
      <Header/>

        <Stepper activeStep={activeStep} alternativeLabel style={{paddingTop:100}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        <Grid container className={classes.loginContainer} justify="center" alignItems="center">
        <Grid item xs={12} md={8} lg={8} sm={8} className={classes.imageContainer}>
            <img src={registerBackground} className={classes.backgroundImage}  alt="" />
        </Grid>
        {activeStep===0?
    
        <Grid item xs={12} md={3} lg={3} sm={3} className={classes.formContainer}>
            
            <h2>Register yourself and</h2>
            <h2> ace your Academics</h2>
            <TextField id="standard-basic" label="Name" color="primary" className={classes.input} name="name" value={state['name']} onChange={(e)=>handleChange(e)} />
            <TextField id="standard-basic" label="Username" color="primary" className={classes.input} name="userName" value={state['userName']} onChange={(e)=>handleChange(e)}/>
            <TextField id="standard-basic" label="E-mail" color="primary" className={classes.input} name="emailAddress" value={state['emailAddress']} onChange={(e)=>handleChange(e)}/>
            <TextField id="standard-basic" label="Password" color="primary" className={classes.input} name="password" value={state['password']} onChange={(e)=>handleChange(e)}/>
            
            <div className={classes.checkbox}>
              <Link to="/login" style={{textDecoration:"none"}}>
            <h4 className={classes.login}>Have an Account ? Click Here!</h4>
            </Link>
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleNext} >
                Proceed
            </Button>
            <p className={classes.forgot}>Forgot Password?</p>
        
            <h2 style={{textAlign:"center"}}>OR</h2>
            <div className={classes.googleButton}>
            <GoogleButton  onClick={() => { console.log('Google button clicked') }}/>
            </div>
           
        </Grid>
        :  <Grid item xs={12} md={3} lg={3} sm={3} className={classes.formContainer}>
            
        <h2>Complete Profile !!</h2>
        <TextField id="standard-basic" label="Phone Number" color="primary" className={classes.input} name="phoneNumber" value={state['phoneNumber']} onChange={(e)=>handleChange(e)}/>
        <TextField id="standard-basic" type="number" label="UPSC Attempts" color="primary" className={classes.input} name="upscAttempts" value={state['upscAttempts']} onChange={(e)=>handleChange(e)}/>
        <TextField id="standard-basic" label="Additional Subjects" color="primary" className={classes.input} name="additionalSubjects" value={state['additionalSubjects']} onChange={(e)=>handleChange(e)}/>
        
        <div className={classes.checkbox}>
            <h4 className={classes.login}>Have an Account ? Click Here!</h4>
            </div>
            <div className={classes.buttonContainer}> 
                 <Button onClick={handleBack}  variant="contained" className={classes.backButton} color="primary">
                Back
              </Button>
            
            <Button variant="contained" color="primary" className={classes.button} onClick={(e)=>handleRegister(e)} >
                Register
            </Button>
            </div>
            <p className={classes.forgot}>Forgot Password?</p>
        
            <h2 style={{textAlign:"center"}}>OR</h2>
            <div className={classes.googleButton}>
            <GoogleButton  onClick={() => { console.log('Google button clicked') }}/>
            </div>
           
         
    </Grid>
  
    }
        <Grid item xs={12} md={1} lg={1} sm={1} className={classes.formContainer} />

    </Grid>
    </>

    )
}

export default Registration

const useStyles = makeStyles((theme) => ({
    loginContainer:{
      padding:40,
      paddingTop:80
    },
  
      backgroundImage: {
          height: "400px",
          width: "600px",
          [theme.breakpoints.down('sm')]: {
              height: "300px",
              width: "500px",
           
            },
            [theme.breakpoints.down('xs')]: {
              height: "300px",
              width: "500px",
           
            },
  
      },
      imageContainer: {
  
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
  
      },
      checkbox: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
      },
      input: {
          width: "100%",
          marginBottom: 15
      },
      button: {
          width: "100%",
          marginBottom: 15
      },
      googleButton:{
        width: "100%",
        marginBottom: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
  
      },
      backButton: {
        marginRight: theme.spacing(1),
        
        width: "100%",
        marginBottom: 15
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      login:{
        fontSize:"15px",
        width:"150%",
        textAlign:"center"
      },
      forgot:{
      fontSize:"15px",
      width:"100%",
      textAlign:"center"
      },
      buttonContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
  

      }
  }));
  