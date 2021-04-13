import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green, red, orange } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid";
import { Radio, RadioGroup, Paper } from "@material-ui/core";
import { getTestById } from '../store/Actions';
import { useDispatch } from 'react-redux';
import Timer from './Timer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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

    const [answerArray, setAnswerArray] = useState([])
    const [percentageArray, setPercentageArray] = useState([])
    const [test, setTest] = useState()
    const [spinner, setSpinner] = useState(true);
  


    // Handle Test id
    useEffect(() => {
        const id = props.match.params.id
        dispatch(
            getTestById(id, (err, response) => {
                if (err)
                    console.log(err)
                else {
                    setTest(response.res.data.data)
                }
            }))
            setSpinner(false)


    }, [])


    const handleOmrAnswer = (option, index) => {
        console.log(option, index)
        let array = [...answerArray]
        array[index] = option
        console.log(array)
        setAnswerArray(array)
    }


    const handleOmrAnswerPercentage = (option, index) => {
        let array = [...percentageArray]
        array[index] = option
        console.log(array)
        setPercentageArray(array)
    }



    return (

        <div className={classes.root}>
            
        {
        !spinner?
        <>
            <h1>{test?.testName}</h1>
            
            <Timer  time={test?.numberOfQuestions>50?7200000:3600000}/>
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
                                            <div className={classes.avatarContainer} key={i}>
                                                <div className={classes.index}>
                                                    <p className={classes.indexText}>
                                                        {(35 * index) + (i + 1)}
                                                    </p>
                                                </div>
                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"A"} color={answerArray[(35 * index) + i] === "A" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "A" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={() => handleOmrAnswer("A", (35 * index) + i)} textSizeRatio={2} />
                                                </div>
                                                <div className={classes.avatar}>

                                                    <Avatar size="15" round={true} name={"B"} color={answerArray[(35 * index) + i] === "B" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "B" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={() => handleOmrAnswer("B", (35 * index) + i)} textSizeRatio={2} />
                                                </div>

                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"C"} color={answerArray[(35 * index) + i] === "C" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "C" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={() => handleOmrAnswer("C", (35 * index) + i)} textSizeRatio={2} />
                                                </div>

                                                <div className={classes.avatar}>
                                                    <Avatar size="15" round={true} name={"D"} color={answerArray[(35 * index) + i] === "D" ? "black" : "transparent"}
                                                        fgColor={answerArray[(35 * index) + i] === "D" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                        onClick={() => handleOmrAnswer("D", (35 * index) + i)} textSizeRatio={2} />
                                                </div>



                                                <RadioGroup
                                                    aria-label="position"
                                                    name="position"
                                                    value={answerArray[(35 * index) + i]?.percentage}
                                                    onChange={(e) => handleOmrAnswerPercentage(e.target.value, ((35 * index) + i))}
                                                    className={classes.feedback}
                                                    row
                                                >
                                                    <RedRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="10%"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'C' }}
                                                        label="10%"
                                                        labelPlacement="bottom"
                                                    />

                                                    <OrangeRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="50%"
                                                        name="radio-button-demo"
                                                        label="50%"
                                                        labelPlacement="bottom"
                                                        inputProps={{ 'aria-label': 'C' }}

                                                    />

                                                    <GreenRadio
                                                        className={classes.radio}
                                                        size="small"
                                                        value="100%"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'C' }}
                                                        label="100%"
                                                        labelPlacement="bottom"

                                                    />

                                                </RadioGroup>
                                            </div>


                                        ))

                                    }
                                </Grid>
                            </>
                        ))}

                    <Grid item xs={12} sm={12} md={1} lg={1} />

                </Grid>
            </Paper>
            </>:
              <Backdrop className={classes.backdrop} open={spinner} onClick={()=>setSpinner(false)}>
              <p style={{marginRight:20}}>Preparing OMR Sheet</p>
              <CircularProgress color="inherit" size={100} color="primary" />
            </Backdrop>
      
                                }
        </div>
    )
}

export default Omr


const useStyles = makeStyles((theme) => ({
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

    radios: {
    },
    
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },



}));
