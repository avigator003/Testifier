import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, FormControlLabel, Checkbox, Button,Stepper ,Step,StepLabel,Typography  } from "@material-ui/core";
import registerBackground from '../assests/images/signup.png'
import GoogleButton from 'react-google-button'


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


function Registration() {
    
    const classes = useStyles()
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
  
    
    return (
        <>
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (<></>
        )}
      </div>

        <Grid container className={classes.loginContainer} justify="center" alignItems="center">
        <Grid item xs={12} md={8} lg={8} sm={8} className={classes.imageContainer}>
            <img src={registerBackground} className={classes.backgroundImage}  alt="" />
        </Grid>
        {activeStep===0?
    
        <Grid item xs={12} md={3} lg={3} sm={3} className={classes.formContainer}>
            
            <h2>Register yourself and</h2>
            <h2> ace your Academics</h2>
            <TextField id="standard-basic" label="Name" color="primary" className={classes.input} />
            <TextField id="standard-basic" label="Username" color="primary" className={classes.input} />
            <TextField id="standard-basic" label="E-mail" color="primary" className={classes.input} />
            <TextField id="standard-basic" label="Password" color="primary" className={classes.input} />
            
            <div className={classes.checkbox}>
            <h4 className={classes.login}>Have an Account ? Click Here!</h4>
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
        <TextField id="standard-basic" label="Phone Number" color="primary" className={classes.input} />
        <TextField id="standard-basic" label="UPSC Attempts" color="primary" className={classes.input} />
        <TextField id="standard-basic" label="Additional Subjects" color="primary" className={classes.input} />
        
        <div className={classes.checkbox}>
            <h4 className={classes.login}>Have an Account ? Click Here!</h4>
            </div>
            <div className={classes.buttonContainer}> 
                 <Button onClick={handleBack}  variant="contained" className={classes.backButton} color="primary">
                Back
              </Button>
            
            <Button variant="contained" color="primary" className={classes.button} onClick={handleNext} >
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
  