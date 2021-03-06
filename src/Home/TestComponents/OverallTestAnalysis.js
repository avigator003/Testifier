import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader,CRow,CCol,CDataTable,CPagination } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, TextField, FormControlLabel, Checkbox, Button, Backdrop } from "@material-ui/core";
import Avatar from 'react-avatar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllTestsGiven, getTestById, saveGivenTest } from '../../store/Actions';
import { useDispatch ,useSelector} from 'react-redux';
import { notification } from "antd";
import CheckCircleOutlined from '@material-ui/icons/CheckCircleOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import Badge from '../../assests/images/badge.png'
import Header from '../HomeComponents/Header'
import TextArea from 'antd/lib/input/TextArea';
import {
  CBadge,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import CircularProgress from '@material-ui/core/CircularProgress';

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
  

  const[totalMarksPaper,setTotalMarksPaper]=useState()
  const[getTotalMarks,setGetTotalMarks]=useState()
  const[accuracy,setAccuracy]=useState()
  const[totalQuestion,setTotalQuestions]=useState()
  const[totalAttempted,setTotalAttempted]=useState()
  const[timeSpent,totalTimeSpent]=useState()
  const[currentTest,setCurrentTest]=useState()
  const[feedback,setFeedback]=useState("")





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
  const[spinner,setSpinner]=useState(true)

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  const [page, setPage] = useState(currentPage)
  const [testsData, setTestsData] = useState()

  const pageChange = newPage => {
      currentPage !== newPage && history.push(`/overall/:id?page=${newPage}`)
  }

  useEffect(() => {
      currentPage !== page && setPage(currentPage)
  }, [currentPage, page])



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
    var SkippedNumber=(state.filter(item => item.value == "s")).length
    var correctNumber=(state.filter(item => item.value == "r")).length
    var wrongNumber=(state.filter(item => item.value == "w")).length
  
     setTotalQuestions(totlaQuestions)
     setTotalAttempted(totlaQuestions-SkippedNumber)
     setTotalMarksPaper(totlaQuestions*2)
     setGetTotalMarks(((correctNumber*2)-(wrongNumber*0.67)).toFixed(2))
     setAccuracy(((correctNumber/(totlaQuestions-SkippedNumber)).toFixed(2))*100)



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
    var cLabel=`Correct (${correctNumber} correct-${correctNumber*2} marks)`
    var wLabel=`Incorrect (${wrongNumber} incorrect-${(wrongNumber*0.67).toFixed(2)} marks)`
    var sLabel=`Skipped (${SkippedNumber} Questions)`
   
    setCorrectLable(cLabel)
    setWrongLable(wLabel)
    setSkippedLable(sLabel)




    // Info Analysis
    var newInfoArray = []
    dispatch(
      getTestById(id, (err, response) => {
          if (err)
              console.log(err)
          else {
              var object=response.res.data.data
              setCurrentTest(object)
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
          percentageArray:newPercentageArray,
          overall:{totalQuestion:totlaQuestions,totalAttempted:totlaQuestions-SkippedNumber,
            totalMarksPaper:totlaQuestions*2,totalMarks:((correctNumber*2)-(wrongNumber*0.67)).toFixed(2),
            accuracy:(correctNumber/totlaQuestions).toFixed(2)},
       }, (err, response) => {
          if (err) {
            setMessage("Not Submitted")
            console.log(err)
          } else {
            setMessage("Test Submitted")
            dispatch(
              getAllTestsGiven((err, response) => {
                var TestName=props.location.state.testName
                  console.log("reposme",response)
                  
                   var newArray=(response?.testsGiven)?.filter(test=>test.testId?.testName==TestName)
                  var array=  newArray?.sort(function(a, b) {
                  return b.overall.totalMarks-a.overall.totalMarks
              });
              console.log(array)
              setTestsData(array)
              setSpinner(false)
            }))
        
    
         }}))


     

   
           }
      }))


     
  }, [])



  const handleFeedback=()=>{
    dispatch(
      saveGivenTest({feedback:feedback,}, (err, response) => {
        if (err) {
          
          console.log(err)
        } else {
          history.push('/givetest')
       }}))


  }

  return (
    <>
       <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                <CircularProgress color="inherit" size={100} color="primary" />
            </Backdrop>

    <Header/>
    <div className={classes.analysisContainer}>
    
   <h1 style={{color:message=="Test Submitted"?"#5BB85D":"#DA534F",textAlign:"center",margin:40}}>
   <a href={currentTest?.answerPaperLink} target="_blank" style={{textDecoration:"none",marginTop:50}}>  
                      <h5 style={{textDecoration:"none",marginTop:20}}>View Answers (Click Here)</h5>
                      </a>
                          
     <CheckCircleOutlined style={{fontSize:40,marginRight:10}}/>
     {message}</h1>

  <Grid  container  className={classes.card} justify="center" alignItems="center">
    
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
            {index+1<=34  &&
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

{ answersCount>68  &&

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



{/* Overall Report*/ }
<Grid container justify="center" alignItems="center">

<Grid item lg={12} xs={12} >
  <CCard className={classes.overallAnalysisContainer}>
    <CCardHeader>
      Test Feedback 
   </CCardHeader>

   <Grid container justify="center" alignItems="center">
   <Grid item lg={5} md={5} sm={8} xs={12} >

    <CCardBody>
   
  Feedback :<TextArea rows={10} value={feedback} onChange={e=>setFeedback(e.target.value)}/>
    </CCardBody>
    </Grid>
</Grid>
  </CCard>
</Grid>
</Grid>


<CRow>
                <CCol xl={12} >
                    <CCard >
                        <CCardHeader size={50}>
                            Leaderboard
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={testsData}
                                fields={[
                                    { key: 'studentName', _classes: 'font-weight-bold' },
                                     'Marks', 'Correct','Incorrect','accuracy'
                                ]}
                                hover
                                striped
                                itemsPerPage={10}
                                activePage={page}
                                clickableRows
                                //   onRowClick={(item) => history.push(`/users/${item.id}`)}
                                scopedSlots={{
                                    'studentName':
                                        (item) => (
                                            <td>
                                                {
                                                    item?.userId?.userName
                                                }
                                            </td>
                                        ),
                                    'Marks':
                                        (item) => (
                                            <td>
                                                  <div style={{display:"flex",flexDirection:"row"}}>
                                                             <p style={{paddingLeft:20,paddingRight:10}}>{item.overallAnalysis?.Correct} Correct</p>
                                                            <p style={{paddingLeft:40,paddingRight:10}}>{item.overallAnalysis?.Incorrect} Incorrect</p>
                                                            <p style={{paddingLeft:30,paddingRight:10}}>{item.overallAnalysis?.Skipped} Skipped</p>
                                                   </div>
                               
                                                {
                                                  <span style={{padding:10,borderRadius:5,border:"1px solid grey",marginLeft:40}}>{item?.overall?.totalMarks} Marks
                                                  </span>
                                                     }
                                            </td>
                                        ),
                                    'Correct':
                                        (item,index) => (
                                            
                                            <td>
                                                {
                                                    index==0&&
                                                   <div style={{display:"flex",flexDirection:"row"}}>
                                                             <p style={{paddingLeft:20,paddingRight:10}}>10%</p>
                                                            <p style={{paddingLeft:40,paddingRight:10}}>50%</p>
                                                            <p style={{paddingLeft:30,paddingRight:10}}>100%</p>
                                                   </div>
                                }
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                                  
                                                {
                                                    item?.confidenceLevelAnalysis?.map(item=>(
                                                        <p style={{paddingLeft:10,paddingRight:10}}>
                                                        {item.correct?item.correct:"0"} Ques.
                                                        </p>
                                                    ))
                                                }
                                                
                                                </div>
                                            </td>
                                        
                                        
                                        ),


                                    'Incorrect':
                                            (item,index) => (
                                               <td>
                                                    {
                                                        index==0&&
                                                       <div style={{display:"flex",flexDirection:"row"}}>
                                                            <p style={{paddingLeft:20,paddingRight:10}}>10%</p>
                                                            <p style={{paddingLeft:40,paddingRight:10}}>50%</p>
                                                            <p style={{paddingLeft:30,paddingRight:10}}>100%</p>
                                                        </div>
                                    }
                                          <div style={{display:"flex",flexDirection:"row"}}>
                                                      
                                                    {
                                                        item?.confidenceLevelAnalysis?.map(item=>(
                                                            <p style={{paddingLeft:10,paddingRight:10}}>
                                                            {item.wrong?item.wrong:"0"} Ques.
                                                            </p>
                                                        ))
                                                    }
                                                    
                                                    </div>
                                                </td>
                                            
                                               ),
                                    "accuracy":
                                    (item,index) => (
                                            
                                        <td>
                                            {
                                                index==0&&
                                               <div style={{display:"flex",flexDirection:"row"}}>
                                                         <p style={{paddingLeft:20,paddingRight:10}}>10%</p>
                                                        <p style={{paddingLeft:40,paddingRight:10}}>50%</p>
                                                        <p style={{paddingLeft:30,paddingRight:10}}>100%</p>
                                               </div>
                            }
                                  <div style={{display:"flex",flexDirection:"row"}}>
                                              
                                            {
                                                item.confidenceLevelAnalysis?.map(item=>(
                                                    <p style={{paddingLeft:10,paddingRight:10}}>
                                                    {item?.accuracy?(item.accuracy).toFixed(2):"0"} %
                                                    </p>
                                                ))
                                            }
                                            
                                            </div>
                                        </td>
                                    
                                    ),


                                }}
                            />
                            <CPagination
                                limit={5}
                                activePage={page}
                                onActivePageChange={pageChange}
                                pages={40}
                                doubleArrows={false}
                                align="center"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
  


      <div className={classes.submitButton}>
          
          <CButton variant="outline" color="primary" 
                 size="md" block onClick={()=>handleFeedback()} >Save Analysis</CButton>
      </div>
      

    </div>
    </>
  )
}

export default OverallTestAnalysis

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
  
},
backdrop: {
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
},






}));
