import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../charts/ChartLineSimple';
import {getTests } from "../../../../store/Actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";


const TestBrand = ({withCharts})=>{
  const classes=useStyles()
  const dispatch=useDispatch()
  const [testList,setTestList]=useState([])



  // Use Effect for Fetching Test (for Not having Same Test Name)
  useEffect(()=>{
    dispatch(
      getTests((err, response) => {
        setTestList(response.tests)
        console.log(response.tests,"name")
      }))
  
  },[])


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
 
  <CRow>
    {
testList.map((item,index)=>(      
    <CCol sm="6" lg="4">
      <CWidgetBrand
        color="linkedin"
        
        rightFooter=
        {<CButton variant="outline" color="primary" 
        size="sm" block>View Test Details</CButton>
      }
        leftFooter={<CButton variant="outline" color="warning" 
        size="sm" block>Edit Test Details</CButton>
      }
        >
          <CCol sm="6" lg="6" style={{padding:20}}>
             {item.testName}
             </CCol> 
             
          <CCol sm="6" lg="6">
          {(item.created_at)?.substring(0,10).split("-").reverse().join("/")}
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
