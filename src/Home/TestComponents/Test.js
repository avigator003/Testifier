import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { getTests } from "../../store/Actions";
import { CalendarToday, ArrowRightAltRounded, TimerRounded, NoteRounded, PeopleAltOutlined } from '@material-ui/icons';
import { CButton } from '@coreui/react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { Typography } from 'antd';

export default function Test(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()


    const [visionTestList, setVisionTestList] = useState([])
    const [vajiramTestList, setVajiramTestList] = useState([])
    const [shankarTestList, setShankarTestList] = useState([])
    const [forumTestList, setForumTestList] = useState([])
    const [iasTestList, setIasTestList] = useState([])
    const [insightsTestList, setInsightsTestList] = useState([])
    const [upscTestList, setUpscTestList] = useState([])
    const [spinner, setSpinner] = useState(false);

    const [state, setState] = React.useState({
        vision: true,
        vajiram: false,
        upsc: false,
        insights: false,
        score: false,
        shankar: false,
        forum: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    // Use Effect for Fetching Test (for Not having Same Test Name)
    useEffect(() => {
        dispatch(
            getTests((err, response) => {
                setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS"))
                setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi"))
                setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy"))
                setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS"))
                setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score"))
                setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS"))
                setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs"))
            }))
    }, [])


    // Handle Give Test
    const handleGiveTest = (id) => {
        setSpinner(true)

        const timer = setTimeout(() => {
            history.push({
                pathname: `/givetest/${id}`,
            });
        }, 1000);
        return () => clearTimeout(timer);


    }


    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                <p style={{ marginRight: 20 }}>Preparing Test</p>
                <CircularProgress color="inherit" size={100} color="primary" />
            </Backdrop>

            <Grid container spacing={1}>
                <Grid item lg={3} style={{ paddingTop: 20 }} md={3} sm={3} xs={12}>
                    <Paper elevation={3} className={classes.filterContainer}>
                        <p className={classes.filterHeading}>FILTER</p>

                        {/* First Filter*/}
                        <div className={classes.filterCategoryContainer}>
                            <p className={classes.filterCategoryHeading}>Institute</p>
                            <div className={classes.filterCategoryItems}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormGroup>
                                        



                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['vision']}
                                                    onChange={handleChange}
                                                    name="vision"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>Vision IAS</Typography>}
                                        />

                                        
<FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['vajiram']}
                                                    onChange={handleChange}
                                                    name="vajiram"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>Vajiram and Ravi</Typography>}
                                        />
                                        
                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['shankar']}
                                                    onChange={handleChange}
                                                    name="shankar"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>Shankar IAS Academy</Typography>}
                                        />



                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['forum']}
                                                    onChange={handleChange}
                                                    name="forum"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>Forum IAS</Typography>}
                                        />


                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['score']}
                                                    onChange={handleChange}
                                                    name="score"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>IAS Score</Typography>}
                                        />




                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['insights']}
                                                    onChange={handleChange}
                                                    name="insights"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>Insights IAS</Typography>}
                                        />



                                        <FormControlLabel
                                            input
                                            control={
                                                <Checkbox
                                                    checked={state['upsc']}
                                                    onChange={handleChange}
                                                    name="upsc"
                                                    className={classes.root}
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                    icon={<span className={classes.icon} />}
                                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                    {...props}
                                                />
                                            }
                                            label={<Typography variant="body2" color="textSecondary" className={classes.label}>UPSC PYQs</Typography>}
                                        />


                                    </FormGroup>
                                </FormControl>
                            </div>

                        </div>


                        {/* Second Filter*/}
                        <div className={classes.filterCategoryContainer}>

                            <div className={classes.filterCategoryItemsContainer}>
                                <div className={classes.filterCategoryItems}>

                                </div>

                            </div>

                        </div>


                    </Paper>

                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>



                    {/*Vajiram and Ravi */}

                    {vajiramTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>Vajiram and Ravi</h1>
                            <Grid container spacing={4}>
                                {
                                    vajiramTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            {item.testCategory == "Sectional" ?
                                                                <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p> :

                                                                <p className={classes.testContentHeading}>Full Length Test</p>
                                                            }
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions > 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block onClick={() => handleGiveTest(item._id)} >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }


                    {/*Shankar IAS Academy */}

                    {shankarTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>Shankar IAS Academy</h1>
                            <Grid container spacing={4}>
                                {
                                    shankarTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }


                    {/*Forum IAS */}

                    {forumTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>Forum IAS</h1>
                            <Grid container spacing={4}>
                                {
                                    forumTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }


                    {/*IAS Score */}

                    {iasTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>IAS Score</h1>
                            <Grid container spacing={4}>
                                {
                                    iasTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }



                    {/*Insights IAS */}

                    {insightsTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>Insights IAS</h1>
                            <Grid container spacing={4}>
                                {
                                    insightsTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }


                    {/*UPSC PYQs */}
                    {upscTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>UPSC PYQs</h1>
                            <Grid container spacing={4}>
                                {
                                    upscTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>

                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }



                    {/*Vision IAS */}

                    {visionTestList.length > 0 &&
                        <div className={classes.categoryContainer}>
                            <h1 className={classes.testCategory}>Vision IAS</h1>
                            <Grid container spacing={4}>
                                {
                                    visionTestList.map((item, index) => (
                                        <>
                                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                                <Paper className={classes.paper} elevation={3}>
                                                    <p className={classes.testHeading}>{item.testName}</p>

                                                    {/* First Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <p className={classes.testContentHeading}>Category :                 {item.categoryType} </p>
                                                        </div>

                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                            <TimerRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions >= 50 ? "2" : "1"} Hr</p>
                                                        </div>


                                                        <div className={classes.testContentItems}>
                                                            <NoteRounded color="primary" className={classes.testContentIcons} />
                                                            <p className={classes.testContentHeading}>{item.numberOfQuestions} Questions</p>
                                                        </div>
                                                    </div>


                                                    {/* Second Content*/}
                                                    <div className={classes.testContent}>
                                                        <div className={classes.testContentItems}>
                                                        </div>


                                                        {/*  Test Button*/}

                                                        <div className={classes.testContentItems} style={{ width: "100%", margin: 10 }}>
                                                            <CButton variant="outline" color="primary"
                                                                size="md" block >Start Test</CButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </>
                                    ))}
                            </Grid>
                        </div>
                    }


                </Grid>
            </Grid>

        </div>

    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F6F9FC"
    },
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: 15
    },
    categoryContainer: {
        margin: 20,
        marginBottom: 60
    },
    testHeading: {
        borderBottom: "1px solid lightgrey",
        padding: theme.spacing(1),

    },
    testCategory: {
        marginBottom: 20
    },
    testContent: {
        display: "flex",
        felxDirection: "row",
        justifyContent: "space-between"

    },
    testContentItems: {
        display: "flex",
        felxDirection: "row",

    },
    testContentHeading: {
        position: "relative",
        top: -2,
        fontSize: "12px"
    },
    testContentIcons: {
        fontSize: '15px',
        marginRight: 10
    },
    filterContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: "#F5F5F5"
    },
    filterHeading: {
        fontSize: "20px",
        fontWeight: "bold",
        borderBottom: "1px solid black",
        textAlign: "center",
        paddingBottom: 10,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
    },
    label: {
        fontSize: 14,
        width:150
    }
}));

