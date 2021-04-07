import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import loginBackground from '../assests/images/login.png'
function Login() {
    const classes = useStyles()
    return (
        <Grid container className={classes.loginContainer} justify="center" alignItems="center">
            <Grid item xs={12} md={8} lg={8} sm={8} className={classes.imageContainer}>
                <img src={loginBackground} className={classes.backgroundImage} alt="" />
            </Grid>
            <Grid item xs={12} md={3} lg={3} sm={3} className={classes.formContainer}>
                <h2>Hello, </h2>
                <h2>Welcome Back</h2>
                <TextField id="standard-basic" label="Username" color="primary" className={classes.input} />
                <TextField id="standard-basic" label="Password" color="primary" className={classes.input} />
                <div className={classes.checkbox}>
                    <FormControlLabel
                        control={<Checkbox checked={true} name="gilad" color="primary" />}
                        label="Remember Me"
                    />
                    <p>Forgot Password?</p>
                </div>
                <Button variant="contained" color="primary" className={classes.button} >
                    Login
                </Button>
                <h4>Don't Have an Account ? Click Here!</h4>
               
            </Grid>
            <Grid item xs={12} md={1} lg={1} sm={1} className={classes.formContainer} />

        </Grid>

    )
}

export default Login
const useStyles = makeStyles((theme) => ({
  loginContainer:{
    padding:40,
    paddingTop:80
  },

    backgroundImage: {
        height: "400px",
        width: "480px",
        [theme.breakpoints.down('sm')]: {
            height: "300px",
            width: "380px",
         
          },
          [theme.breakpoints.down('xs')]: {
            height: "300px",
            width: "380px",
         
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
    }

}));
