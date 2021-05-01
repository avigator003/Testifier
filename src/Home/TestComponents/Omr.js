import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green, red, orange } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid";
import { Radio, RadioGroup, Paper } from "@material-ui/core";
import { getTestById, saveGivenTest } from '../../store/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Timer from '../../Components/Timer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CButton } from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { notification } from "antd";
import Header from '../HomeComponents/Header';



const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const OrangeRadio = withStyles({
    root: {
        color: orange[400],
        '&$checked': {
            color: orange[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);




function Omr(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history=useHistory()

    
    // Logined User
    const user = useSelector((state) => state.user);

    const [answerArray, setAnswerArray] = useState([])
    const [percentageArray, setPercentageArray] = useState([])
    const [test, setTest] = useState()
    const [spinner, setSpinner] = useState(false);
    const [answerSet,setAnswerSet]=useState([])
    const[numberOfQuestions,setNumberOfQuestions]=useState()
    const[testId,setTestId]=useState()
    const[time,setTime]=useState()

    // Handle Test id
    useEffect(() => {
        const id = props.match.params.id
        setTestId(id)
        dispatch(
            getTestById(id, (err, response) => {
                if (err)
                    console.log(err)
                else {
                    var object=response.res.data.data
                    setAnswerSet(object.answers.map(item=>({option:item.options,category:item.category})))
                    setNumberOfQuestions(object.numberOfQuestions)
                    setTest(object)
                    
          var seconds=3600;
          if(object.numberOfQuestions<=50)
              seconds=3600
          else
              seconds=7200
          console.log(seconds)
          const tim = new Date();
          setTime(tim.setSeconds(tim.getSeconds() + seconds))
                }
            }))

        
            




            setSpinner(false)
     }, [])


     // Handle Omr Answers
    const handleOmrAnswer = (event,option, index) => {
        event.preventDefault()
        let array = [...answerArray]
        array[index] = option
        setAnswerArray(array)
    }

   // Handle Omr NAswers Percentage
    const handleOmrAnswerPercentage = (event,option, index) => {
        event.preventDefault()
        let array = [...percentageArray]
        array[index] = option
        setPercentageArray(array)
    }



    // Handle Test Submit
    const handleSubmitTest=()=>{
      
     setSpinner(true)
     var array=[]
     for(var i=0;i<answerSet.length;i++)
     {     
            if(answerArray[i]==undefined)
               array.push({value:'s',questionNumber:i+1,category:answerSet[i].category})   
            else if(answerSet[i].option===answerArray[i]?.toLowerCase())
                array.push({value:'r',percentage:percentageArray[i],questionNumber:i+1,category:answerSet[i].category})
            else
                array.push({value:'w',percentage:percentageArray[i],questionNumber:i+1,category:answerSet[i].category})    
     }

             const timer = setTimeout(() => {
                history.push({
                    pathname: `/overall/${testId}`,
                    state:{array:array,userAnswer:answerArray,testName:test?.testName}
                });
           setSpinner(false)
            }, 2000);
            return () => clearTimeout(timer);
        
          }
           
    return (
<>
<Header/>
       
        <div className={classes.root}>
        <p style={{color:"red",fontWeight:"bold",fontSize:30,padding:10,paddingTop:40}}>Please don’t refresh the page or click back button.</p>
   
        {
        !spinner?
        <div className={classes.omrContainer}>
            <div className={classes.headingContainer}>
                  <h1>{test?.testName}</h1>
                  <a href={test?.questionPaperLink} target="_blank" style={{textDecoration:"none",}}>  
                      <h5>Question Paper (Click Here)</h5>
                      </a>
                

        {/**    <Timer  time={numberOfQuestions>50?7200000:3600000}/> */}
    {time&&    
    <div style={{padding:20,backgroundColor:"white",borderRadius:10,height:60}}>
    <Timer expiryTimestamp={time} handleAnalysis={handleSubmitTest} style={{position:"retive",top:-40}}/>
    </div>
    }
                           </div>                        

            <Paper elevation={3} className={classes.paper}>

                <Grid container className={classes.rowContainer}>

                    {/* Omr Items */}
                    <Grid item xs={12} sm={12} md={1} lg={1} />

                    {
                        [...Array(3),].map((value, index) => (
                            <>

                                <Grid item xs={12} sm={12} md={3} lg={3} key={index} className={classes.columnContainer}>

                                    <div className={classes.feedbackContainer}>
                                        <div>Confidence Percentage</div>
                                        <div className={classes.feedbackHeading}>
                                            <div className={classes.confidenceLevel}>10%</div>
                                            <div className={classes.confidenceLevel}>50%</div>
                                            <div className={classes.confidenceLevel}>100%</div>


                                        </div>
                                    </div>

                                    {
                                        [...Array(35),].map((value, i) => (
                                            <>
                                            {
                                                (35 * index) + (i + 1)<=numberOfQuestions &&
                                            <div className={classes.avatarContainer} key={i}>
                                                <div className={classes.index}>
                                                    <p className={classes.indexText}>
                                                        {(35 * index) + (i + 1)}
                                                    </p>
                                                </div>
                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"A"} color={answerArray[(35 * index) + i] === "A" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "A" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={(e) => handleOmrAnswer(e,"A", (35 * index) + i)} textSizeRatio={2} />
                                                </div>
                                                <div className={classes.avatar}>

                                                    <Avatar size="15" round={true} name={"B"} color={answerArray[(35 * index) + i] === "B" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "B" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={(e) => handleOmrAnswer(e,"B", (35 * index) + i)} textSizeRatio={2} />
                                                </div>

                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"C"} color={answerArray[(35 * index) + i] === "C" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "C" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={(e) => handleOmrAnswer(e,"C", (35 * index) + i)} textSizeRatio={2} />
                                                </div>

                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"D"} color={answerArray[(35 * index) + i] === "D" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "D" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={(e) => handleOmrAnswer(e,"D", (35 * index) + i)} textSizeRatio={2} />
                                                </div>



                                                <RadioGroup
                                                    aria-label="position"
                                                    name="position"
                                                    value={answerArray[(35 * index) + i]?.percentage}
                                                    onChange={(e) => handleOmrAnswerPercentage(e,e.target.value, ((35 * index) + i))}
                                                    className={classes.feedback}
                                                    row
                                                >
                                                    <RedRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="10"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'C' }}
                                                        label="10%"
                                                        labelPlacement="bottom"
                                                    />

                                                    <OrangeRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="50"
                                                        name="radio-button-demo"
                                                        label="50%"
                                                        labelPlacement="bottom"
                                                        inputProps={{ 'aria-label': 'C' }}

                                                    />

                                                    <GreenRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="100"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'C' }}
                                                        label="100%"
                                                        labelPlacement="bottom"

                                                    />

                                                </RadioGroup>
                                            </div>}

                                            </>
                                        ))
                                   
                                    }
                                </Grid>
                            </>
                        ))}

                    <Grid item xs={12} sm={12} md={1} lg={1} />

                </Grid>
            </Paper> 
            <div className={classes.submitButton}>
            <CButton variant="outline" color="primary" 
            size="md" block onClick={(e) => handleSubmitTest(e)} >Submit Test</CButton>
            </div>
           
            </div>:
                  <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                  <p style={{ marginRight: 20 }}>Submitting Test</p>
                  <CircularProgress color="inherit" size={100} color="primary" />
              </Backdrop>
  
      
                                }
        </div>
        </>
    )
}

export default Omr


const useStyles = makeStyles((theme) => ({
    omrContainer:{
    display:"flex",
    flexDirection:"column"
    },
    root: {
        flexGrow: 1,
        padding: "50px",
        backgroundColor: "#F6F9FC",
        [theme.breakpoints.down('xs')]: {
            padding: "10px",

        },



    },
    paper: {
        padding: 20,
        borderRadius: 20,
        [theme.breakpoints.down('xs')]: {
            padding: "10px",

        },


    },
    rowContainer: {

        display: "flex",
        flexDirection: "row",
    },
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #DF46DE",
        borderRadius: 10,
        margin: "10px",
        width: "100%",
        [theme.breakpoints.down('md')]: {
            width: "900px",

        },
        [theme.breakpoints.down('xs')]: {
            margin: "0px",
            marginBottom:10
      
        },
      
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        "&:nth-child(odd)": {
            backgroundColor: "#FCC8FC"
        },

    },
    index: {
        fontSize: "10px",
        color: "black",
        width: "30px",
        borderRight: "1px solid #DF46DE",
        height: 40,
        position: "relative",
        left: -3,
        fontWeight: 800,
        [theme.breakpoints.down('md')]: {
            left: 3,
            width: "20px",
        },


    },
    avatar: {
        cursor: "pointer",
        border: "1px solid #DF46DE",
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        margin: 2,
    },
    avatarLogo: {
        cursor: "pointer",
        position: "relative",
        top: -3,
        left: -0.5,
        [theme.breakpoints.down('sm')]: {
            top: -2.5
        },

    },
    feedbackContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid black",
    },
    feedback: {
        borderLeft: "1px solid #DF46DE",
        height: "40px",
    },
    feedbackHeading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        [theme.breakpoints.down('sm')]: {
            marginRight: 80,

        },
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,

        },

    },
    confidenceLevel: {
        marginRight: 10,
        fontSize: 12,
        [theme.breakpoints.down('sm')]: {
            marginRight: 10,

        },
        [theme.breakpoints.down('xs')]: {
            marginRight: 10,

        }
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
    
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
      headingContainer:{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between",
          marginBottom:50,
          [theme.breakpoints.down('xs')]: {
            display:"flex",
            flexDirection:"column",
         
        }

      }



}));
