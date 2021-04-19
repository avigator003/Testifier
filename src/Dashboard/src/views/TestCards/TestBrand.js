import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../charts/ChartLineSimple';
import {getTests } from "../../../../store/Actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import {deleteTest } from "../../../../store/Actions";
import { notification } from 'antd';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const TestBrand = ({withCharts})=>{
  
  const classes=useStyles()
  const history=useHistory()
  const dispatch=useDispatch()
  const [testList,setTestList]=useState([])

  const [spinner,setSpinner]=useState(false)
  const [message, setMessage] = useState("")
  const [notify, setNotify] = useState(false)

    


  // Use Effect for Fetching Test (for Not having Same Test Name)
  useEffect(()=>{
    TestDetails()
     },[])


  //get Test Details
  const TestDetails=()=>{
    setSpinner(true)
    dispatch(
      getTests((err, response) => {
        setTestList(response.tests)
        setSpinner(false)
      }))

  }

  // View Test Details
  const handleViewTest=(id)=>{
    history.push({
      pathname: `/test/view/${id}`,
      state: { name: 'view',id:id }
  });
  }

  // Edit Test Details
  const handleEditTest=(id)=>{
    history.push({
      pathname: `/test/edit/${id}`,
      state: { name: 'edit',id:id}
  });

  }


  
  // Delete Test Details
  const handleDeleteTest=(id)=>{
    setSpinner(true)
    dispatch(
      deleteTest({ id: id}, (err, response) => {
        if (err) {
          setMessage("Deleting Failed")

        } else {
          setMessage("Deleted Successfully")
          setNotify(true)
          TestDetails()
   
         }
      
      })
    );
  }


  
  const handleClose = () => {
    setSpinner(false);
  };
  return withCharts ?
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="facebook"
        rightHeader="89k"
        rightFooter="friends"
        leftHeader="Edit Test"
        leftFooter="feeds"
      >
        <CIcon
          name="cib-facebook"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label="Friends"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="twitter"
        rightHeader="973k"
        rightFooter="followers"
        leftHeader="1.792"
        leftFooter="tweets"
      >
        <CIcon
          name="cib-twitter"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[1, 13, 9, 17, 34, 41, 38]}
          label="Followers"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="linkedin"
        rightHeader="500+"
        rightFooter="contracts"
        leftHeader="292"
        leftFooter="feeds"
      >
        <CIcon
          name="cib-linkedin"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[78, 81, 80, 45, 34, 12, 40]}
          label="Contracts"
          labels="months"
        />
      </CWidgetBrand>
    </CCol> 

    <CCol sm="6" lg="3">
      <CWidgetBrand
        rightHeader="12"
        rightFooter="events"
        leftHeader="4"
        leftFooter="meetings"
        color="gradient-warning"
      >
        <CIcon
          name="cil-calendar"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[35, 23, 56, 22, 97, 23, 64]}
          label="Followers"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>
  </CRow> :
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
    {
testList.map((item,index)=>(      
    <CCol sm="6" lg="4">
      <CWidgetBrand
        color="linkedin"
        
        rightFooter=
        {
        <>
        <CButton variant="outline" color="primary" 
        size="sm" block onClick={()=>handleViewTest(item._id)}>View Test Details</CButton>
        
        <CButton variant="outline" color="danger" 
        size="sm" block onClick={()=>handleDeleteTest(item._id)}>Delete Test</CButton>
        </>
      }
        leftFooter={
        <>
        <CButton variant="outline" color="warning"  style={{marginTop:15}}
        size="sm" block onClick={()=>handleEditTest(item._id)}>Edit Test Details</CButton>
        </>
      }
        >
          <CCol sm="6" lg="6" style={{padding:20}}>
             {item.testName}
             </CCol> 
             
          <CCol sm="6" lg="6">
          {item.instituteName}
          </CCol>
         

      </CWidgetBrand>
    </CCol>
))}
{/** 
    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="twitter"
        rightHeader="973k"
        rightFooter="followers"
        leftHeader="1.792"
        leftFooter="tweets"
      >
        <CIcon
          name="cib-twitter"
          height="56"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="linkedin"
        rightHeader="500+"
        rightFooter="contracts"
        leftHeader="292"
        leftFooter="feeds"
      >
        <CIcon
          name="cib-linkedin"
          height="56"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        rightHeader="12"
        rightFooter="events"
        leftHeader="4"
        leftFooter="meetings"
        color="gradient-warning"
      >
        <CIcon
          name="cil-calendar"
          height="56"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>
    */}
  </CRow>
</>
  
}

TestBrand.propTypes = {
  withCharts: PropTypes.bool
}


export default TestBrand


const useStyles = makeStyles((theme) => ({

  cardHeading: {
   display:"flex",
   flexDirection:"row",
   alignItems:"flex-start",
   justifyContent:"flex-end"
  },

}));
