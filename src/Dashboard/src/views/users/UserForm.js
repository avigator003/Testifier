import React ,{useState,useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CDropdownDivider
} from '@coreui/react'
import 'antd/dist/antd.css';
import CIcon from '@coreui/icons-react'
import DocsLink from '../../reusable/DocsLink'
import { makeStyles } from "@material-ui/core/styles";
import { Radio ,RadioGroup} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import api from "../../../../resources/api";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { saveTest,getTests, getUserById,updateUser } from "../../../../store/Actions";
import 'antd/dist/antd.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);


const validAlphabetRegex=RegExp(/[A-Za-z]/)



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

const UserForm = (props) => {

  const classes=useStyles();
  const dispatch=useDispatch()
  const history=useHistory()


    const [collapsed, setCollapsed] = React.useState(true)
    const [showElements, setShowElements] = React.useState(true)
    const [spinner, setSpinner] = useState(false);
    const [display, setDisplay] = useState(false);
    const[notify,setNotify]=useState(false)
    const[message,setMessage]=useState("")
    const[success,setSuccess]=useState(false)
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



//Set User Editing Details
useEffect(()=>{
    const id=props.match.params.id
    dispatch(
        getUserById(id,(err, response) => {
          if(err)
          console.log(err)
          else
          {
          setState(response.res.data.data)
          }
    
        }))
    
},[])


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
              (value.length == 0) 
              ? "" 
              : (!validNameRegex.test(value))
              ? "User Name must be in characters!"
              : (value.length > 20) 
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
    
    

      const handleUpdate = (e) => {
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
              message: "Failed to Update.",
            });
          }
        
      };
    
      function checkValidity() {
        if (!Object.keys(state).every((k) => state[k] !== "")) {
          return notification.warning({
            message: "Fields Should Not Be Empty",
          });
        }  
        
        else {
            const id=props.match.params.id
        return dispatch(
            updateUser({id:id,body:state}, (err, response) => {
              if (err) {
                console.log(err)
              
                notification.error(err);
              } else {
                setNotify(true)
                setMessage("Successfully Updated")
                  const timer = setTimeout(() => {
                    history.push('/users')
                  }, 2000);
                return () => clearTimeout(timer);
              }
          
            })
          );
        }
    
      }
    
      const handleClose = () => {
        setSpinner(false);
      };

  return (
    <>

      <Snackbar open={notify}
       autoHideDuration={6000} 
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={()=>setNotify(false)}>
  <Alert onClose={()=>setNotify(false)} severity="success">
    {message}
  </Alert>
</Snackbar>
      <CRow>
       <CCol xs="12" md="12" sm="12">
          <CCard>
            <CCardHeader>
              User Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput    placeholder="Name"  name="name" value={state['name']} onChange={(e)=>handleChange(e)} />
                </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Username</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput placeholder="Username"  name="userName" value={state['userName']} onChange={(e)=>handleChange(e)} />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput placeholder="Email Address"  type="email" name="emailAddress" value={state['emailAddress']} onChange={(e)=>handleChange(e)} />
                   </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput placeholder="Password"  type="password" name="password" value={state['password']} onChange={(e)=>handleChange(e)}  />
                   </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput placeholder="Phone Number"  type="number" name="phoneNumber" value={state['phoneNumber']} onChange={(e)=>handleChange(e)} />
                   </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">UPSC Attempts</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput placeholder="No. Of Attempts" type="number"  type="upscAttempts" name="upscAttempts" value={state['emailAddress']} onChange={(e)=>handleChange(e)} />
                   </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Additional Subjects</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput placeholder="Additional Subjects"  name="additionalSubjects" value={state['additionalSubjects']} onChange={(e)=>handleChange(e)} />
                   </CCol>
                </CFormGroup>

               
               



              </CForm>
            </CCardBody>
            <CCardFooter >
              <CButton type="submit" size="md" color="success" onClick={(e)=>handleUpdate(e)}><CIcon name="cil-pencil" /> Update User</CButton> 
            </CCardFooter>
          
          </CCard>
        </CCol>


       </CRow>
    </>
  )
}

export default UserForm
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));
