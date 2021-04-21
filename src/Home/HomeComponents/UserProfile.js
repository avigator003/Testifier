import { makeStyles } from '@material-ui/core';
import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGivenTest } from '../../store/Actions';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CButton } from '@coreui/react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root:{
  flexGrow: 1,
  backgroundColor: "#F6F9FC",
  height:"100%"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
},

  cardContainer:{
   paddingTop:70,
   paddingLeft:20

  },
  card: {
    display:"flex",
    flexDirection:"column",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 5,
    marginTop: 10,
    marginLeft:5,
    marginRight:5,
    width:250
  },
heading:{
  display:"flex",
  flexDirection:"column",
  paddingTop:5,
  paddingBottom:5
 
},
testContainer:{
  display:"flex",
  flexDirection:"row",
 
},
title:{
  fontWeight:"bold"
},
data:{
  paddingLeft:5
}

      
}));


function UserProfile() {
    const dispatch=useDispatch()
    const classes=useStyles()
    const history=useHistory()

        // Logined User
        const user = useSelector((state) => state.user);


        const[test,setTest]=useState([])
        const[spinner,setSpinner]=useState(true)

useEffect(()=>{
    dispatch(
        getGivenTest({id:user.token.user._id},(err, response) => {
          if (err) {
            console.log(err)
          } else {
            console.log("repsonse",response.testGiven.data)
            setTest(response.testGiven.data)
         }}))

         setSpinner(false)

},[])


const testAnalysis=(id)=>{
  history.push({
    pathname: `/usertestanalysis/${id}`,
});

}

    return (
      <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                <CircularProgress color="inherit" size={100} color="primary" />
        </Backdrop>


     <Header/>
     
<CButton variant="outline" color="danger"  style={{width:200,position:"relative",top:80,marginBottom:50,marginLeft:10}}
                 size="md" block onClick={()=>history.push('/give test')} >Get Back</CButton>
         
     {!spinner &&
       <Grid container className={classes.cardContainer} spacing={2}> 
       {test.map((item,index)=>(
       <Grid  item lg={2} className={classes.card}>
          <div className={classes.heading}>
            <div className={classes.testContainer} >
              <p className={classes.title}>Test Name :   </p>  
              <p className={classes.data}>{item?.testId?.testName}</p>
              </div>
              <div className={classes.testContainer}>
              <p className={classes.title}>Test Date :   </p> 
               <p className={classes.data}>{((item.created_at).substring(0,10)).split("-").reverse().join("/")}</p>
            </div>
          </div>
          <CButton variant="outline" color="primary"  onClick={()=>testAnalysis(item?._id)}
          size="sm" block style={{marginTop:8,marginBottom:15}}>View Test Analysis</CButton>
      
        </Grid>
        ))}
     
       </Grid>
}

</div>
    )
}

export default UserProfile
