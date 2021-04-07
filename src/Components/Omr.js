import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green, red, orange } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid";
import { Radio } from "@material-ui/core";


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

function Omr() {
    const classes = useStyles();

    const [answerArray, setAnswerArray] = useState([])

    const handleOmr = (option, index) => {
        console.log(index, option)
        let array = [...answerArray]
        array[index] = option
        console.log(array)
        setAnswerArray(array)
    }
    return (
        <div className={classes.root}>

            <Grid container className={classes.rowContainer}>

                {/* Omr Items */}
                <Grid item xs={12} sm={12} md={1} lg={1} />

                {
                    [...Array(3),].map((value, index) => (
                        <>

                        <Grid item xs={12} sm={12} md={3} lg={3} key={index} className={classes.columnContainer}>
                        <div style={{borderBottom:"1px solid black",display:"flex",flexDirection:"row"}}>
                 
                 
                         <div >go</div>
                         <div style={{borderLeft:"1px solid black",height:50}}>
                         <div className={classes.feedbackHeading}>
                             <div>hey</div>
                             <div>hey</div>
                             <div>hey</div>
                                          
                         </div>

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
                                            <Avatar size="15" round={true} name={"A"} color={answerArray[(35 * index) + (i + 1)] === "A" ? "black" : "transparent"}
                                                fgColor={answerArray[(35 * index) + (i + 1)] === "A" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                onClick={() => handleOmr("A", (35 * index) + (i + 1))} textSizeRatio={2} />
                                        </div>
                                        <div className={classes.avatar}>

                                            <Avatar size="15" round={true} name={"B"} color={answerArray[(35 * index) + (i + 1)] === "B" ? "black" : "transparent"}
                                                fgColor={answerArray[(35 * index) + (i + 1)] === "B" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                onClick={() => handleOmr("B", (35 * index) + (i + 1))} textSizeRatio={2} />
                                        </div>

                                        <div className={classes.avatar}>
                                            <Avatar size="15" round={true} name={"C"} color={answerArray[(35 * index) + (i + 1)] === "C" ? "black" : "transparent"}
                                                fgColor={answerArray[(35 * index) + (i + 1)] === "C" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                onClick={() => handleOmr("C", (35 * index) + (i + 1))} textSizeRatio={2} />
                                        </div>

                                        <div className={classes.avatar}>
                                            <Avatar size="15" round={true} name={"D"} color={answerArray[(35 * index) + (i + 1)] === "D" ? "black" : "transparent"}
                                                fgColor={answerArray[(35 * index) + (i + 1)] === "D" ? "white" : "#DF46DE"} className={classes.avatarLogo}
                                                onClick={() => handleOmr("D", (35 * index) + (i + 1))} textSizeRatio={2} />
                                        </div>


                                        <div className={classes.feedback}>
                                            <RedRadio
                                                size="small"
                                                value="c"
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'C' }}
                                                label="10%"
                                                labelPlacement="bottom"
                                            />

                                            <OrangeRadio
                                                size="small"
                                                value="c"
                                                name="radio-button-demo"
                                                label="50%"
                                                labelPlacement="bottom"
                                                inputProps={{ 'aria-label': 'C' }}

                                            />

                                            <GreenRadio
                                                size="small"
                                                value="c"
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'C' }}
                                                label="100%"
                                                labelPlacement="bottom"
                                            
                                            />
                                        </div>

                                    </div>

                                ))

                            }
                        </Grid>
</>
                    ))}

                <Grid item xs={12} sm={12} md={1} lg={1} />

            </Grid>
        </div>
    )
}

export default Omr


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px"
    },
    rowContainer: {

        display: "flex",
        flexDirection: "row",
    },
    columnContainer: {
        border: "1px solid #DF46DE",
        margin: "5px",
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
        top: -2.5,
        [theme.breakpoints.down('sm')]: {
            top: -2.5
        },

    },

    feedback: {
        borderLeft: "1px solid #DF46DE",
        height: "40px"
    },
    feedbackHeading: {
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end"
    }



}));
