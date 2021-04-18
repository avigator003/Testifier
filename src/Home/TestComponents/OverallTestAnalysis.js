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
import { getTestById, saveGivenTest } from '../../store/Actions';
import { useDispatch ,useSelector} from 'react-redux';
import { notification } from "antd";
import CheckCircleOutlined from '@material-ui/icons/CheckCircleOutlined';
import { useHistory } from 'react-router-dom';



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





function OverallTestAnalysis(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history=useHistory()
  
  const [correctNumber, setCorrectNumber] = useState()
  const [wrongNumber, setWrongNumber] = useState()
  const [skippedNumber, setSkippedNumber] = useState()
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

    var state = props.location.state.array


    const id = props.match.params.id

// Set Percentage Array
    var newPercentageArray=state.map(item=>item.percentage)
    setPercentageArray(state.map(item=>item.percentage))


    // Total Questions
    var totlaQuestions=state.length




    // Section Analysis
    var newSectionalArray = []
    const uniqueCategoryNames = Array.from(new Set(state.map((item) => item.category)))
    for (var i = 0; i < uniqueCategoryNames.length; i++) {
      var newArrayObjects = state.filter(item => item.category == uniqueCategoryNames[i])
      newArrayObjects.sort(function (a, b) {
        return a.questionNumber - b.questionNumber;
      });
       
      var percentageCorrect=(((newArrayObjects.filter(item => item.value == 'r')).length)/newArrayObjects.length)*100
      newSectionalArray.push({section:newArrayObjects,percentageCorrect:percentageCorrect})
    }
    
    setSectionalArray(newSectionalArray)




  //Confidence Level Analysis
  var newConfidenceArray = []
  const uniqueConfidenceObjects = Array.from(new Set(state.map((item) => item.percentage)))
  const percentageArray=uniqueConfidenceObjects.filter(e => typeof(e)!=='undefined')
  
  for (var i = 0; i < percentageArray.length; i++) {
    var newArrayObjects = state.filter(item => item.percentage == percentageArray[i])
    var attempts=newArrayObjects.length

    
    var coorectArray=newArrayObjects.filter(item => item.value =='r')
    var wrongArray=newArrayObjects.filter(item => item.value =='w')
  
    var correct=newArrayObjects.length-wrongArray.length
    var wrong=newArrayObjects.length-coorectArray.length

    var marks=(correct*2)-(0.667*wrong)
    

    var accuracy=(correct/attempts)*100
    var avatarArray=[]
    for (var j = 0; j < newArrayObjects.length; j++)
    {
          avatarArray.push({value:newArrayObjects[j].value,questionNumber:newArrayObjects[j].questionNumber})
    }
     avatarArray.sort(function (a, b) {
      return a.questionNumber - b.questionNumber;
    });
  
    newConfidenceArray.push({percentage:percentageArray[i],attempted:attempts,
    correct:correct,wrong:wrong,marks:marks,accuracy:accuracy,avatar:avatarArray})
   }
   newConfidenceArray.sort(function (a, b) {
    return a.percentage - b.percentage;
  });
    
  setConfidenceArray(newConfidenceArray)




    // OverAll Analysis
    var correctNumber=(state.filter(item => item.value == "r")).length
    var wrongNumber=(state.filter(item => item.value == "w")).length
    var SkippedNumber=(state.filter(item => item.value == "s")).length
    setCorrectNumber(correctNumber)
    setWrongNumber(wrongNumber)
    setSkippedNumber(SkippedNumber)



    // Info Analysis
    var newInfoArray = []
    dispatch(
      getTestById(id, (err, response) => {
          if (err)
              console.log(err)
          else {
              var object=response.res.data.data
              var answerArray=object.answers.map(item=>item.options)
              var userAnsArray=props.location.state.userAnswer
              for(var i=0;i<answerArray.length;i++)
              {
                newInfoArray.push({correctAnswer:answerArray[i].toUpperCase(),userAnswer:userAnsArray[i]})
              }
               setAnswersCount(newInfoArray.length)
               setInfoArray(newInfoArray)
                       
      dispatch(
        saveGivenTest({userId:user.token.user._id,testId:id,
          overallAnalysis:{Correct:correctNumber,Incorrect:wrongNumber,Skipped:SkippedNumber},
          sectionalAnalysis:newSectionalArray,
          confidenceLevelAnalysis:newConfidenceArray,
          userInfoAnalysis:newInfoArray,
          percentageArray:newPercentageArray
       }, (err, response) => {
          if (err) {
            setMessage("Not Submitted")
            console.log(err)
          } else {
            
            setMessage("Test Submitted")
         }}))


   
           }
      }))


     
  }, [])



  return (
    <div className={classes.analysisContainer}>
    
   <h1 style={{color:message=="Test Submitted"?"#5BB85D":"#DA534F",textAlign:"center",margin:40}}>
            
     <CheckCircleOutlined style={{fontSize:40,marginRight:10}}/>
     {message}</h1>

 
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
                
                labels={['Correct', 'Incorrect', 'Skipped']}
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


      
{/* Confidence Level Report*/ }
<CCard className={classes.sectionalAnalysisContainer}>
        <CCardHeader>
          Confidence Level Analysis of Test
        </CCardHeader>
        <CCardBody className={classes.section}>
          <Grid container justify="center" alignItems="center">
            <Grid item lg={12} >
            <Grid container justify="center" alignItems="center">
            <Grid item lg={12} xs={5} >
         
         
            <TableContainer component={Paper}  >
         
              <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Confidence Level</TableCell>
            <TableCell align="right">Attempted</TableCell>
            <TableCell align="right">Correct</TableCell>
            <TableCell align="right">Wrong</TableCell>
            <TableCell align="right">Marks</TableCell>
            <TableCell align="right">Accuracy</TableCell>
            <TableCell align="center">Questions</TableCell>
     
     
          </TableRow>
        </TableHead>
        <TableBody>     
          {confidenceArray.map((row,index)=>(
     
            <TableRow key={index}>
              <TableCell align="center">{row.percentage} %</TableCell>
              <TableCell align="right">{row.attempted}</TableCell>
              <TableCell align="right">{row.correct}</TableCell>
              <TableCell align="right">{row.wrong}</TableCell>
              <TableCell align="right">{(row.marks).toFixed(2)}</TableCell>
              <TableCell align="right">{(row.accuracy).toFixed(2)}</TableCell>
              <TableCell align="left">
              {
                row.avatar.map((ob,index)=>(
                  <Avatar size="30" round={true} name={ob.questionNumber<=9?(ob.questionNumber).toString():
                    (ob.questionNumber<=99?
                    ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1):
                    ((ob.questionNumber).toString()).charAt(0)+' '+((ob.questionNumber).toString()).charAt(1)+' '+((ob.questionNumber).toString()).charAt(2))}
                     color={ob.value=="s"?"#FFA333":(ob.value=="r"?"#5BB85D":"#DA534F")}
                  fgColor={ob.value=="s"?"black":"white"} className={classes.avatarLogo}  textSizeRatio={3} />
            
                 ))}
                 </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
          
      </Grid>
          
         
          </Grid>
            </Grid>
          
         
          </Grid>

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
            {index+1<=30 &&
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

{ answersCount>30  &&
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
            {(index+1>30 && index+1 <=60) &&
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

{ answersCount>60  &&

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
            {index+1>60 &&
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
                 size="md" block onClick={()=>history.push('/givetest')} >Save Analysis</CButton>
                 </div>
      

    </div>
  )
}

export default OverallTestAnalysis

const useStyles = makeStyles((theme) => ({
  analysisContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor:"#D3D3D3"
  
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


}));
