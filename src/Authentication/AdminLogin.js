import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { loginUser, setLoginSuccess } from "../store/Actions";
import { Grid, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import loginBackground from '../assests/images/login.png'
import { notification } from "antd";
import { Spin } from "antd";
import api from "../resources/api";
import { useDispatch, useSelector } from "react-redux";



const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  
function AdminLogin(props) {
    const classes = useStyles()
    const dispatch=useDispatch()
    const [spinner, setSpinner] = useState(false);
    const[state,setState]=useState({
                  email:'',
                  password:''
        })
        
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

        const handleChange = (e) => {
            e.persist();
            const { name, value } = e.target;
            setState((st) => ({ ...st, [name]: value }));
            var err = errors;
            switch (name) {
              case "emailAddress":
                err.emailAddress = validEmailRegex.test(value)
                  ? ""
                  : "Email is not valid!";
                break;
              case "password":
                err.password =
                  value.length < 6 ? "Password must be at least 6 characters" : "";
                break;
              default:
                break;
            }
            setErrors({ ...err });
          };
          

          const handleLogin = (e) => {
            e.preventDefault();
            setSpinner(true);
            const validateForm = (error) => {
              let valid = true;
              Object.values(error).forEach((val) => val.length > 0 && (valid = false));
              return valid;
            };
            if (validateForm(errors)) {
              checkValidity();
            } else {
              setSpinner(false);
              return notification.error({
                message: "Failed to Login.",
              });
            }
          };
        
          const checkValidity = () => {
            if (state["emailAddress"] === "" || state["password"] === "") {
              setSpinner(false);
              return notification.warning({
                message: "Fields Should Not Be Empty",
              });
            } else {
              dispatch(
                loginUser({ ...state, type: "admin" }, (err, response) => {
                  if (err) {
                    notification.error(err)
               
                    console.log(err)
                  } else {
                    notification.success(response)
                    let user = JSON.parse(window.localStorage.getItem('Test.user'))
                    user = user.token.user
                    user.updated_at = new Date()
                    
                    api.post(`user/update/${user._id}`, user).then((res)=>{
                      console.log(res)
                    }).catch((err)=>{
                      console.log(err)
                    })
                    
                  }
                  setSpinner(false);
                })
              );
            }
          };
        

    return (
        <Grid container className={classes.loginContainer} justify="center" alignItems="center">
            <Grid item xs={12} md={8} lg={8} sm={8} className={classes.imageContainer}>
                <img src={loginBackground} className={classes.backgroundImage} alt="" />
            </Grid>
            <Grid item xs={12} md={3} lg={3} sm={3} className={classes.formContainer}>
                <h2>Hello, </h2>
                <h2>Welcome Back</h2>
                <TextField id="standard-basic" label="Email" color="primary" className={classes.input} name="emailAddress" value={state['emailAddress']} onChange={(e)=>handleChange(e)}/>
                <p className={classes.error}>
                          {errors.emailAddress}
                 </p>
                   
                <TextField id="standard-basic" label="Password" color="primary" className={classes.input} name="password" value={state['password']} onChange={(e)=>handleChange(e)} />
                <p className={classes.error}>
                          {errors.password}
                        </p>
                   
                <div className={classes.checkbox}>
                    <FormControlLabel
                        control={<Checkbox checked={true} name="gilad" color="primary" />}
                        label="Remember Me"
                    />
                    <p>Forgot Password?</p>
                </div>
                <Button variant="contained" color="primary" className={classes.button} onClick={(e)=>handleLogin(e)} >
                    Login
                </Button>
                <h4>Don't Have an Account ? Click Here!</h4>
               
            </Grid>
            <Grid item xs={12} md={1} lg={1} sm={1} className={classes.formContainer} />

        </Grid>

    )
}

export default AdminLogin
const useStyles = makeStyles((theme) => ({
  loginContainer:{
    padding:40,
    paddingTop:100,
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
    },
    error:{
        color:"red",
        position:"relative",
        top:-10
    }

}));
