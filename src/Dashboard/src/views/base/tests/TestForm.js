import React, { useState, useEffect } from 'react'
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
import CIcon from '@coreui/icons-react'
import DocsLink from '../../../reusable/DocsLink'
import { makeStyles } from "@material-ui/core/styles";
import { Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import api from "../../../../../resources/api";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { saveTest, getTests, getTestById, updateTest } from "../../../../../store/Actions";
import 'antd/dist/antd.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, useLocation } from 'react-router-dom';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);


const validAlphabetRegex = RegExp(/[A-Za-z]/)



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TestForm = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [spinner, setSpinner] = useState(false);
  const [notify, setNotify] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [disable, setDisabled] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editButton, setEditButton] = useState(false)
  const [state, setState] = useState({
    instituteName: '',
    testName: '',
    testCategory: '',
    categoryType: '',
    numberOfQuestions: 0,
    questionPaperLink: '',
    answerPaperLink:'',
    paid:true,
    answers: []
  })

  const [errors, setErrors] = useState({
    instituteName: '',
    testName: '',
    testCategory: '',
    categoryType: '',
    numberOfQuestions: "",
    questionPaperLink: '',
    answerPaperLink:'',
  });

  // Checking is it View ,Edit or Add
  useEffect(() => {
    var name = location?.state?.name
    var id = location?.state?.id
    if (name == "view") {
      setDisabled(true)
      dispatch(
        getTestById(id, (err, response) => {
          if (err)
            console.log(err)
          else {
            setState(response.res.data.data)
            setEdit(true)
          }
        }))



    }
    else if (name == "edit") {
      dispatch(
        getTestById(id, (err, response) => {
          if (err)
            console.log(err)
          else {
            setState(response.res.data.data)
            setEdit(true)
            setEditButton(true)

          }
        }))
  }

  }, [])


  const handleChange = (e) => {
    e.persist();
    
    const { name, value } = e.target;
    if (name == "numberOfQuestions" && value !== "")
      setState((st) => ({ ...st, [name]: parseInt(value) }));
    else
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




//Handle Change Question
  const handleQuestionChange = (i, name, value) => {

    const array = [...state['answers']]
    const found = array.findIndex(function (obj) { return obj.number == i + 1 })

    if (found == -1) {
      if (name == "options")
        array.push({ number: i + 1, options: value, category: '' });
      else
        array.push({ number: i + 1, category: value, options: '' });
    }
    else {
      if (name == "options")
        array[found].options = value
      else
        array[found].category = value
    }
    array.sort(function (a, b) {
      return a.number - b.number;
    });

    setState((st) => ({ ...st, answers: array }));
  }





  //When Editing Question Paper Options Changes
  const handleEditQuestionChange = (i, name, value) => {

    const array = [...state['answers']]
    array[i][name] = value;
    setState((st) => ({ ...st, answers: array }));
  }



  // Handle Add Test Form

  const handleSubmit = (e) => {
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
        message: "Failed to Save.",
      });
    }
  };

  const checkValidity = () => {
    if (state["numberOfQuestions"] === "" || state["instituteName"] === "") {
      setSpinner(false);
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    }




    else {
      if (editButton) {
        var id = location?.state?.id
        dispatch(
          updateTest({ id: id, body: state }, (err, response) => {
            if (err) {
              console.log(err)
              setMessage("Updating Failed")

            } else {
              setNotify(true)
              setSuccess(true)
              setMessage("Updated Successfully")
              const timer = setTimeout(() => {
                history.push('/test/details')
              }, 1000);
              return () => clearTimeout(timer);

            }
            setSuccess(false)
            setSpinner(false);

          })
        );
      }
      else {
        dispatch(
          saveTest(state, (err, response) => {
            if (err) {
              console.log(err)
              setMessage("Saving Failed")

            } else {
              setNotify(true)
              setSuccess(true)
              setState({
                instituteName: '',
                testName: '',
                testCategory: '',
                categoryType: '',
                numberOfQuestions: 0,
                questionPaperLink: '',
                answers: []
              })
              setMessage("Successfully Saved")
            }
            setSuccess(false)
            setSpinner(false);

          })
        );
      }
    }
  };

  const handleClose = () => {
    setSpinner(false);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={spinner} onClick={handleClose}>
        <CircularProgress color="inherit" size={100} color="primary" />
      </Backdrop>

      <Snackbar open={notify}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setNotify(false)}>
        <Alert onClose={() => setNotify(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <CRow>
        <CCol xs="12" md="12" sm="12">
          <CCard>
            <CCardHeader>
              Test Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Name of Institute</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="instituteName" disabled={disable}
                      value={state['instituteName']} onChange={(e) => handleChange(e)}>
                      <option value="" selected >Please select</option>
                      <option value="Vision IAS">Vision IAS</option>
                      <option value="Vajiram and Ravi">Vajiram and Ravi</option>
                      <option value="Shankar IAS Academy">Shankar IAS Academy</option>
                      <option value="Forum IAS">Forum IAS</option>
                      <option value="IAS Score">IAS Score</option>
                      <option value="Insights IAS">Insights IAS</option>
                      <option value="UPSC PYQs">UPSC PYQs</option>
                    </CSelect>

                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Test Name / Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="email-input" placeholder="Test Name / Title" disabled={disable}
                      name="testName" value={state['testName']} onChange={(e) => handleChange(e)} />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Test Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="testCategory" disabled={disable}
                      value={state['testCategory']} onChange={(e) => handleChange(e)}>
                      <option value="0" disabled>Please select</option>

                      <option value="Full Length">Full Length</option>
                      <option value="Sectional">Sectional</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                {state['testCategory'] == "Sectional" &&
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel> Category Type</CLabel>
                    </CCol>
                    <CCol md="9">
                      <RadioGroup row aria-label="position" name="categoryType" disabled={disable}
                        value={state['categoryType']} onChange={(e) => handleChange(e)} >
                        <FormControlLabel
                          value="History"
                          control={<Radio color="primary" size="small" />}
                          label="History"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Polity"
                          control={<Radio color="primary" size="small" />}
                          label="Polity"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Environment"
                          control={<Radio color="primary" size="small" />}
                          label="Environment"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Economy"
                          control={<Radio color="primary" size="small" />}
                          label="Economy" />

                        <FormControlLabel
                          value="Geography"
                          control={<Radio color="primary" size="small" />}
                          label="Geography"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Current Affairs"
                          control={<Radio color="primary" size="small" />}
                          label="Current Affairs" />
                      </RadioGroup>

                    </CCol>
                  </CFormGroup>
                }

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">No. of Questions</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" type="number" placeholder="Number of Questions" disabled={disable}
                      name="numberOfQuestions" value={state['numberOfQuestions']} onChange={(e) => handleChange(e)} />
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Question Paper Link</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" placeholder="Question Paper Link" name="questionPaperLink" disabled={disable}
                      value={state['questionPaperLink']} onChange={(e) => handleChange(e)} />
                  </CCol>
                </CFormGroup>


                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Answer Paper Link</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" placeholder="Answer Paper Link" name="answerPaperLink" disabled={disable}
                      value={state['answerPaperLink']} onChange={(e) => handleChange(e)} />
                  </CCol>
                </CFormGroup>

                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Test Price</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom id="select" name="paid" disabled={disable}
                      value={state['paid']} onChange={(e) => handleChange(e)}>
                      <option value="" selected >Please select</option>
                      <option value={true}>Paid</option>
                      <option value={false}>Unpaid</option>
                     </CSelect>

                  </CCol>
                </CFormGroup>
            
         
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>


      </CRow>

      <CRow>
        <CCol xs="12" md="12" sm="12">
          <CCard>
            <CCardHeader>
              Question Paper
            </CCardHeader>

            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>

                  <CCol md="2" xs="3" sm="2" lg="4">

                    <CLabel htmlFor="hf-email">S No.</CLabel>
                  </CCol>
                  <CCol md="6" xs="5" sm="6" lg="4">
                    <CLabel htmlFor="hf-email">Options</CLabel>
                  </CCol>
                  <CCol xs="4" md="4" sm="4" lg="4">

                    <CLabel htmlFor="hf-email">Category</CLabel>
                  </CCol>

                </CFormGroup>

                <CDropdownDivider />

                {edit ?
                  state['answers'].map((item, index) => (

                    <CFormGroup row>
                      <CCol md="2" xs="2" sm="2" lg="4">
                        <CLabel htmlFor="hf-email">{item.number}</CLabel>
                      </CCol>
                      <CCol md="6" xs="6" sm="6" lg="4">
                        <CInput id="text-input" placeholder="Option" name="options" disabled={disable}
                          value={item.options}
                          onChange={(e) => handleEditQuestionChange(index, e.target.name, e.target.value)} />



                      </CCol>
                      <CCol xs="4" md="4" sm="4" lg="4">
                        <CSelect id="select" name="category" value={item.category} disabled={disable}
                          onChange={(e) => handleEditQuestionChange(index, e.target.name, e.target.value)}>
                          <option value="0" disabled selected>Please select</option>
                          <option value="History">History</option>
                          <option value="Polity">Polity</option>
                          <option value="Environment">Environment</option>
                          <option value="Economy">Economy</option>
                          <option value="Geaography">Geography</option>
                          <option value="Current Affairs">Current Affairs</option>

                        </CSelect>
                      </CCol>

                    </CFormGroup>))
                  :
                  <>
                    {
                      [...Array((state['numberOfQuestions']) ? state['numberOfQuestions'] : 0)].map((value, index) => (

                        <CFormGroup row>
                          <CCol md="2" xs="2" sm="2" lg="4">
                            <CLabel htmlFor="hf-email">{index + 1}</CLabel>
                          </CCol>
                          <CCol md="6" xs="6" sm="6" lg="4">
                            <CInput id="text-input" placeholder="Option" name="options" disabled={disable}
                              value={((state['answers']).filter(ob => ob.number === index + 1))?.options}
                              onChange={(e) => handleQuestionChange(index, e.target.name, e.target.value)} />



                          </CCol>
                          <CCol xs="4" md="4" sm="4" lg="4">
                            <CSelect id="select" name="category" disabled={disable}
                              value={((state['answers']).filter(ob => ob.number === index + 1))?.category}
                              onChange={(e) => handleQuestionChange(index, e.target.name, e.target.value)}>

                              <option value="0" disabled selected>Please select</option>
                              <option value="History">History</option>
                              <option value="Polity">Polity</option>
                              <option value="Environment">Environment</option>
                              <option value="Economy">Economy</option>
                              <option value="Geaography">Geography</option>
                              <option value="Current Affairs">Current Affairs</option>

                            </CSelect>
                          </CCol>

                        </CFormGroup>
                      ))
                    }

                  </>

                }
              </CForm>
            </CCardBody>
            <CCardFooter>
              {editButton ?
                <CButton type="submit" size="md" color="primary" onClick={(e) => handleSubmit(e)}><CIcon name="cil-scrubber" /> Edit Test</CButton>
                :
                <>
                  {disable ? <></> :
                    <CButton type="submit" size="md" color="primary" onClick={(e) => handleSubmit(e)}><CIcon name="cil-scrubber" /> Save Test</CButton>
                  }
                </>
              }
            </CCardFooter>
          </CCard>


        </CCol>
      </CRow>
      {/* 
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              Form
              <small> validation feedback</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="inputIsValid">Input is valid</CLabel>
                <CInput valid id="inputIsValid" />
                <CValidFeedback>Cool! Input is valid</CValidFeedback>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="inputIsInvalid">Input is invalid</CLabel>
                <CInput invalid id="inputIsInvalid" />
                <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              Validation feedback Form
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="inputSuccess2i">Non-required input</CLabel>
                  <CInput className="form-control-success" id="inputSuccess2i" />
                  <CValidFeedback>Non-required</CValidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Required input</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Icon/Text Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input1-group1" name="input1-group1" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group1" name="input2-group1" placeholder="Email" />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-euro" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input3-group1" name="input3-group1" placeholder=".." />
                      <CInputGroupAppend>
                        <CInputGroupText>.00</CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Button Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                      </CInputGroupPrepend>
                      <CInput id="input1-group2" name="input1-group2" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group2" name="input2-group2" placeholder="Email" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary">Submit</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cib-facebook" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="input3-group2" name="input3-group2" placeholder="Search" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary"><CIcon name="cib-twitter" /></CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Dropdowns Groups
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CDropdown className="input-group-prepend">
                          <CDropdownToggle caret color="primary">
                            Dropdown
                          </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CInput id="input1-group3" name="input1-group3" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group3" name="input2-group3" placeholder="Email" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CDropdown className="input-group-prepend">
                        <CDropdownToggle color="primary">Action</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CInput id="input3-group3" name="input3-group3" placeholder=".." />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle caret color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Use the grid for big devices!
              <small> <code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="8">
                    <CInput placeholder=".col-md-8" />
                  </CCol>
                  <CCol md="4">
                    <CInput placeholder=".col-md-4" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="7">
                    <CInput placeholder=".col-md-7" />
                  </CCol>
                  <CCol md="5">
                    <CInput placeholder=".col-md-5" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CInput placeholder=".col-md-6" />
                  </CCol>
                  <CCol md="6">
                    <CInput placeholder=".col-md-6" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="5">
                    <CInput placeholder=".col-md-5" />
                  </CCol>
                  <CCol md="7">
                    <CInput placeholder=".col-md-7" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CInput placeholder=".col-md-4" />
                  </CCol>
                  <CCol md="8">
                    <CInput placeholder=".col-md-8" />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">Action</CButton>
              <CButton size="sm" color="danger">Action</CButton>
              <CButton size="sm" color="warning">Action</CButton>
              <CButton size="sm" color="info">Action</CButton>
              <CButton size="sm" color="success">Action</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Input Grid for small devices!
              <small> <code>.col-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol xs="4">
                    <CInput placeholder=".col-4" />
                  </CCol>
                  <CCol xs="8">
                    <CInput placeholder=".col-8" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="5">
                    <CInput placeholder=".col-5" />
                  </CCol>
                  <CCol xs="7">
                    <CInput placeholder=".col-7" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="6">
                    <CInput placeholder=".col-6" />
                  </CCol>
                  <CCol xs="6">
                    <CInput placeholder=".col-6" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="7">
                    <CInput placeholder=".col-5" />
                  </CCol>
                  <CCol xs="5">
                    <CInput placeholder=".col-5" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="8">
                    <CInput placeholder=".col-8" />
                  </CCol>
                  <CCol xs="4">
                    <CInput placeholder=".col-4" />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">Action</CButton>
              <CButton size="sm" color="danger">Action</CButton>
              <CButton size="sm" color="warning">Action</CButton>
              <CButton size="sm" color="info">Action</CButton>
              <CButton size="sm" color="success">Action</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Username</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="username3" name="username3" autoComplete="name"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Email</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="email3" name="email3" autoComplete="username"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Password</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password3" name="password3" autoComplete="current-password"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="primary">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInput id="username2" name="username2" placeholder="Username" autoComplete="name"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInput type="email" id="email2" name="email2" placeholder="Email" autoComplete="username"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInput type="password" id="password2" name="password2" placeholder="Password" autoComplete="current-password"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="secondary">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="username1" name="username1" placeholder="Username" autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="success">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Form Elements
                <div className="card-header-actions">
                  <CButton color="link" className="card-header-action btn-setting">
                    <CIcon name="cil-settings" />
                  </CButton>
                  <CButton 
                    color="link" 
                    className="card-header-action btn-minimize" 
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon name={ collapsed ? "cil-arrow-top" : "cil-arrow-bottom"} />
                  </CButton>
                  <CButton 
                    color="link" 
                    className="card-header-action btn-close" 
                    onClick={() => setShowElements(false)}
                  >
                    <CIcon name="cil-x" />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Prepended text</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput id="prependedInput" size="16" type="text" />
                        </CInputGroup>
                        <p className="help-block">Here's some help text</p>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Appended text</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInput" size="16" type="text" />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                        <span className="help-block">Here's more help text</span>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedPrependedInput">Append and prepend</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>$</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput id="appendedPrependedInput" size="16" type="text" />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInputButton">Append with button</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInputButton" size="16" type="text" />
                          <CInputGroupAppend>
                            <CButton color="secondary">Go!</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInputButtons">Two-button append</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInputButtons" size="16" type="text" />
                          <CInputGroupAppend>
                            <CButton color="secondary">Search</CButton>
                            <CButton color="secondary">Options</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <div className="form-actions">
                      <CButton type="submit" color="primary">Save changes</CButton>
                      <CButton color="secondary">Cancel</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
      */}
    </>
  )
}

export default TestForm
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));
