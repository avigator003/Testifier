import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import Avatar from 'react-avatar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getGivenTestById, getTestById, saveGivenTest } from '../../store/Actions';
import { useDispatch ,useSelector} from 'react-redux';
import { notification } from "antd";
import CheckCircleOutlined from '@material-ui/icons/CheckCircleOutlined';
import { useHistory } from 'react-router-dom';
import Badge from '../../assests/images/badge.png'



function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}





function UserTestAnalysis(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history=useHistory()
  const[totalMarksPaper,setTotalMarksPaper]=useState()
  const[getTotalMarks,setGetTotalMarks]=useState()
  const[accuracy,setAccuracy]=useState()
  const[totalQuestion,setTotalQuestions]=useState()
  const[totalAttempted,setTotalAttempted]=useState()
  const[timeSpent,totalTimeSpent]=useState()





  const [correctNumber, setCorrectNumber] = useState()
  const [wrongNumber, setWrongNumber] = useState()
  const [skippedNumber, setSkippedNumber] = useState()
  const[correctLabel,setCorrectLable]=useState()
  const[wrongLabel,setWrongLable]=useState()
  const[skippedLabel,setSkippedLable]=useState()


  const [sectionalArray, setSectionalArray] = useState([])
  const [confidenceArray, setConfidenceArray] = useState([])
  const [infoArray,setInfoArray]=useState([])
  const[answersCount,setAnswersCount]=useState(0)
  const[percentageArray,setPercentageArray]=useState([])
  const[message,setMessage]=useState()

    // Logined User
    const user = useSelector((state) => state.user);


  // Getting All the Results
  useEffect(() => {
  const id = props.match.params.id

  dispatch(
    getGivenTestById({id:id},(err, response) => {
      if (err) {
        console.log(err)
      } else {
          var array=response.testAnalysis.data
        console.log("re",response.testAnalysis.data)
        setPercentageArray(array.percentageArray)
        setSectionalArray(array.sectionalAnalysis)
        setConfidenceArray(array.confidenceLevelAnalysis)
        setInfoArray(array.userInfoAnalysis)
        var correctNumber=array.overallAnalysis.Correct
        var wrongNumber=array.overallAnalysis.Incorrect
        var SkippedNumber=array.overallAnalysis.Skipped
       
        setCorrectNumber(correctNumber)
        setWrongNumber(wrongNumber)
        setSkippedNumber(SkippedNumber)
        var cLabel=`Correct (${correctNumber} correct-${correctNumber*2} marks)`
        var wLabel=`Incorrect (${wrongNumber} incorrect-${(wrongNumber*0.67).toFixed(2)} marks)`
        var sLabel=`Skipped (${SkippedNumber} Questions)`
       
        setCorrectLable(cLabel)
        setWrongLable(wLabel)
        setSkippedLable(sLabel)
          
     setTotalQuestions(array.overall.totalQuestion)
     setTotalAttempted(array.overall.totalAttempted)
     setTotalMarksPaper(array.overall.totalMarksPaper)
     setGetTotalMarks(array.overall.totalMarks)
     setAccuracy(array.overall.accuracy)

     setAnswersCount(array.overall.totalQuestion)
      
    }}))
   
  }, [])



  return (
    <div className={classes.analysisContainer}>
    

  <Grid  container  className={classes.card} justify="center" alignItems="center" >
    
    <Grid item  className={classes.backgroundImageContainer}>
     <img src={Badge} className={classes.backgroundImage} alt="" />
     </Grid>
     <Grid item lg={12} className={classes.congrats} >
     <Grid  container justify="center" alignItems="center">
       <Grid item lg={5}/>
     <Grid item lg={1} className={classes.congratsHeading}> Congrats  </Grid>
      <Grid  item lg={1} className={classes.congratsName}>{user.token.user.userName}</Grid>
      <Grid item lg={5}/>
     </Grid>
     </Grid>
     
     <Grid item lg={2} xs={0}/>  
     <Grid item lg={2} className={classes.score} xs={12}>
      <p className={classes.totalScore}>{getTotalMarks}/{totalMarksPaper}</p> 
      <p className={classes.border}></p>
      <p className={classes.scoreHeading}>Score</p>
     </Grid>  
     <Grid item lg={2} className={classes.score} xs={12}>
     <p className={classes.totalScore}>{totalAttempted}/{totalQuestion}</p> 
      <p className={classes.border}></p>
      <p className={classes.scoreHeading}>Qs Attempted</p>
   
     </Grid>  
     <Grid item lg={2} className={classes.score} xs={12}>
     <p className={classes.totalScore}>15 m 22s </p> 
      <p className={classes.border}></p>
      <p className={classes.scoreHeading}>Time Spent</p>
   
     </Grid>  
     <Grid item lg={2} className={classes.score} xs={12}>
     <p className={classes.totalScore}>{accuracy} %</p> 
      <p className={classes.border}></p>
      <p className={classes.scoreHeading}>Accuracy</p>
   
     </Grid>  
     
     <Grid item lg={2}/>
      
  


     </Grid>







{/* Overall Report*/ }
      <Grid container justify="center" alignItems="center">

        <Grid item lg={12} xs={12} >
          <CCard className={classes.overallAnalysisContainer}>
            <CCardHeader>
              Overall Report
           </CCardHeader>
     
           <Grid container justify="center" alignItems="center">
           <Grid item lg={5} md={5} sm={8} xs={12} >
        
            <CCardBody>
           
              <CChartDoughnut

                className={classes.chart}
                datasets={[
                  {
                    backgroundColor: [
                      '#5BB85D',
                      '#DA534F',
                      '#FDB55A',

                    ],
                    data: [correctNumber, wrongNumber, skippedNumber]
                  }
                ]}
                
                labels={[correctLabel,wrongLabel,skippedLabel]}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
              
            </CCardBody>
            </Grid>
      </Grid>
          </CCard>
        </Grid>
      </Grid>



{/* Sectional Report*/ }
      <CCard className={classes.sectionalAnalysisContainer}>
        <CCardHeader>
          Section Wise Analysis of Test
        </CCardHeader>
        <CCardBody className={classes.section}>
          {sectionalArray.map((item,index)=>(
          <Grid container >
            <Grid item lg={5} md={5} sm={5} xs={12} className={classes.sectionLeft} >
               
            <h3 className={classes.sectionHeading}>{index+1}. {(item.section)[0].category}</h3>
          
              <div className={classes.progress} >
                <LinearProgressWithLabel value={item.percentageCorrect} className={classes.progressBar} />
              </div>
            </Grid>
            <Grid item lg={1} md={1} sm={1} />
          
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.avatarContainers} >
            {item.section.map(ob=>(                            
            
            <div className={classes.avatarCont}>
              <Avatar size="30" round={true} name={ob.questionNumber<=9?(ob.questionNumber).toString():
                (ob.questionNumber<=99?
                ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1):
                ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1)+' '+((ob.questionNumber).toString()).charAt(2))}
                 color={ob.value=="s"?"#FFA333":(ob.value=="r"?"#5BB85D":"#DA534F")}
                fgColor={ob.value=="s"?"black":"white"} className={classes.avatarLogo}  textSizeRatio={3} />
            </div>
        ))}
            </Grid>
          </Grid>
))}
        </CCardBody>
      </CCard>





{/* Confidence Leve; Report*/ }
<CCard className={classes.sectionalAnalysisContainer}>
        <CCardHeader>
        Confidence Level Analysis of Test
      </CCardHeader>
        <CCardBody className={classes.section}>
          {confidenceArray.map((row,index)=>(
            <>
          <Grid container >
            <Grid item lg={5} md={5} sm={5} xs={12} className={classes.sectionLeft} >
            <p style={{fontSize:20,fontWeight:"bold"}}>{row.percentage}%</p>
            <div className={classes.confidenceHeading} >
              <p className={classes.confidenceTag}>Attempted</p>
              <p className={classes.confidenceTag}>Correct</p>
              <p className={classes.confidenceTag}>Wrong</p>
              <p className={classes.confidenceTag}>Marks</p>
              <p className={classes.confidenceTag}>Accuracy</p>
           </div>
          
          
              <div className={classes.confidenceData} >
              <p className={classes.confidenceTagData}>{row.attempted}</p>
              <p className={classes.confidenceTagData}>{row.correct}</p>
              <p className={classes.confidenceTagData}>{row.wrong}</p>
              <p className={classes.confidenceTagData}>{(row.marks).toFixed(2)}</p>
              <p className={classes.confidenceTagData}>{(row.accuracy).toFixed(2)}</p>
           </div>
            </Grid>
            <Grid item lg={1} md={1} sm={1} />
          
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.avatarContainers} >
            {row.avatar.map(ob=>(                            
            
            <div className={classes.avatarCont}>
              <Avatar size="30" round={true} name={ob.questionNumber<=9?(ob.questionNumber).toString():
                (ob.questionNumber<=99?
                ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1):
                ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1)+' '+((ob.questionNumber).toString()).charAt(2))}
                 color={ob.value=="s"?"#FFA333":(ob.value=="r"?"#5BB85D":"#DA534F")}
                fgColor={ob.value=="s"?"black":"white"} className={classes.avatarLogo}  textSizeRatio={3} />
            </div>
        ))}
            </Grid>
          </Grid>
          <p style={{borderBottom:"1px solid lightgrey"}}></p>
          </>
))}
        </CCardBody>
      </CCard>

   
{/* Info Report*/ }
<CCard className={classes.infoAnalysisContainer}>
        <CCardHeader>
          User Answers Analysis of Test
        </CCardHeader>

        <CCardBody className={classes.section}>
          <Grid container justify="center"  spacing={2}>

            <Grid item lg={4} xs={12} >
            <TableContainer component={Paper}>
             <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Question No.</TableCell>
            <TableCell align="left">User Answer</TableCell>
            <TableCell align="left">Correct Answer</TableCell>
            <TableCell align="left">Confidence Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>     
          {infoArray.map((row,index)=>(
            <>
            {index+1<=34 &&
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="left">
             <Avatar size="20" round={true} name={row.userAnswer!==undefined?row.userAnswer:" "} 
             color={row.userAnswer!==undefined?(row.userAnswer==row.correctAnswer?"#5BB85D":"#DA534F"):"#FDB55A"}
             fgColor={"white"} className={classes.avatarLogo} textSizeRatio={2} />
              </TableCell>
              <TableCell align="left">{row.correctAnswer}</TableCell>
              <TableCell align="left">{!percentageArray[index]?"MISC.":percentageArray[index]+" %"}</TableCell>
        
            </TableRow>
            }
            </>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
          
      </Grid>

{ answersCount>34  &&
          <Grid item lg={4} xs={12} >
            <TableContainer component={Paper}>
             <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Question No.</TableCell>
            <TableCell align="left">User Answer</TableCell>
            <TableCell align="left">Correct Answer</TableCell>
            <TableCell align="left">Confidence Level</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>     
          {infoArray.map((row,index)=>(
            <>
            {(index+1>34 && index+1 <=68) &&
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="left">
             <Avatar size="20" round={true} name={row.userAnswer!==undefined?row.userAnswer:" "} 
             color={row.userAnswer!==undefined?(row.userAnswer==row.correctAnswer?"#5BB85D":"#DA534F"):"#FDB55A"}
             fgColor={"white"} className={classes.avatarLogo} textSizeRatio={2} />
                          
                    
              </TableCell>
     
              <TableCell align="left">{row.correctAnswer}</TableCell>
              <TableCell align="left">{!percentageArray[index]?"MISC.":percentageArray[index]+" %"}</TableCell>
           </TableRow>
            }
            </>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
          
      </Grid>
} 

{ answersCount>68 &&

      <Grid item lg={4} xs={12}>
            <TableContainer component={Paper}>
             <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Question No.</TableCell>
            <TableCell align="left">User Answer</TableCell>
            <TableCell align="left">Correct Answer</TableCell>
            <TableCell align="left">Confidence Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>     
          {infoArray.map((row,index)=>(
            <>
            {index+1>68 &&
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="left">
             <Avatar size="20" round={true} name={row.userAnswer!==undefined?row.userAnswer:" "} 
             color={row.userAnswer!==undefined?(row.userAnswer==row.correctAnswer?"#5BB85D":"#DA534F"):"#FDB55A"}
             fgColor={"white"} className={classes.avatarLogo} textSizeRatio={2} />
                          
                    
              </TableCell>
     
              <TableCell align="left">{row.correctAnswer}</TableCell>
              <TableCell align="left">{!percentageArray[index]?"MISC.":percentageArray[index]+" %"}</TableCell>
        
            </TableRow>
            }
            </>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
          
      </Grid>
}
          
         
          
         
          </Grid>

        </CCardBody>
      </CCard>


      <div className={classes.submitButton}>
          
          <CButton variant="outline" color="primary" 
                 size="md" block onClick={()=>history.push('/userprofile')} >Back to Profile</CButton>
                 </div>
      

    </div>
  )
}

export default UserTestAnalysis

const useStyles = makeStyles((theme) => ({
  analysisContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor:"#D3D3D3",
    
  
  },
  overallAnalysisContainer: {
    display:"flex",
    margin: 10,
    height:"350px", 
  
  },
  infoAnalysisContainer:{
  margin:10
  },
  chart: {
    width: "500px",
    height:"500px", 
    paddingRight:5,
    paddingLeft:5,
    [theme.breakpoints.down('xs')]: {
      width: "315px",
      position: "relative",
      left: -60
    },

  },
  sectionalAnalysisContainer: {

    padding: 20,
    margin: 10
  },
  progess: {
    display: "flex",
    flexDirection: "row",
  },
  section: {
    display: "flex",
    flexDirection: "column"
  },
  
  avatar: {
    cursor: "pointer",
    border: "1px solid #DF46DE",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    margin: 10,
},
avatarLogo: {
marginLeft:5,
marginRight:5
},
avatarContainers:{
  display: "flex",
  flexDirection: "row",
  marginTop:0,
  padding:10,
  marginBottom:20,
  
  overflowY: "hidden" ,
  overflow:"scroll",
  },
sectionHeading:{
  fontSize:15
},
sectionLeft:{
  marginBottom:30
  
},
avatarCont:{
  width:"40px",


},
submitButton: {
  width:300,
  marginTop:50,
  marginBottom:50,
  alignItems:"center",
  justifyContent:"center",

  [theme.breakpoints.down('lg')]: {
      position:"relative",
      left:500

  },
  [theme.breakpoints.down('sm')]: {
      position:"relative",
      left:200

  },

  [theme.breakpoints.down('xs')]: {
      width:200,
      position:"relative",
      left:20

  }
},
avatarCell:{
  display:"flex",
  flexDirection:"row",
  overflowX:"scroll",
  width:600
},
confidenceHeading:{
  display:"flex",
  flexDirection:"row",
  [theme.breakpoints.down('xs')]: {
  overflow:"scroll",
  overflowY:"hidden"
}

},
confidenceData:{
  display:"flex",
  flexDirection:"row",
  [theme.breakpoints.down('xs')]: {
    overflow:"scroll",
    overflowY:"hidden"
  }
},
confidenceTag:{
  width:100,
  padding:5,
  fontWeight:"bold"
},
confidenceTagData:{
  width:100,
  padding:5,
  paddingLeft:11
},
backgroundImage: {
  height: "30px",
  width: "30px",
 

},
backgroundImageContainer: {
  borderRadius:50,
  padding:10,
  backgroundColor:"#5E83A3"
   

},

card: {
  backgroundColor: "#211D24",
  borderRadius: 10,
  padding: 10,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  padding: 10,
  marginBottom: 5,
  marginTop: 10,
  width:"60%",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  marginLeft:300,
  height:200,
  [theme.breakpoints.down('xs')]: {
    width:"90%",
  margin:10,
   height:500,
 

  }
},
congrats:{
  textAlign:"center",
  marginTop:10,
  marginBottom:10,
  [theme.breakpoints.down('xs')]: {
   marginLeft:50,
   position:"relative",
   left:-40

  }

},
congratsHeading:{
  fontWeight:"bold",
  fontSize:20,
  color:"#8C7E3D",
  [theme.breakpoints.down('xs')]: {
    paddingLeft:10,
    position:"relative",
    left:10   
     }
   

},
congratsName:{
  fontSize:20,
  color:"white",
  fontWeight:500,
  paddingLeft:25
 
},
score:{
  display:"flex",
  flexDirection:"column",
  paddingLeft:40,
  marginRight:5,
  marginLeft:5,
  marginTop:10
},
border:{
  borderBottom:"1px solid #273864",

},
totalScore:{
  color:"white",

},
scoreHeading:{
  position:"relative",
  top:-10,
  
}






}));
