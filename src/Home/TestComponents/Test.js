import React, { useState, useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getGivenTest, getTests, setLoginSuccess, updateUser } from "../../store/Actions";
import { CalendarToday, ArrowRightAltRounded, TimerRounded, NoteRounded, PeopleAltOutlined } from '@material-ui/icons';
import { CButton, CCol, CFormGroup, CLabel, CSelect } from '@coreui/react';
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
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import ModalBackground from '../../assests/images/background.png'
import Header from '../HomeComponents/Header';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { logoutUser } from '../../store/Actions';
import { notification } from 'antd';
import Logo from '../../assests/images/logo.png'
import Qr from '../../assests/images/qrcode.jpeg'
import { Offline, Online } from "react-detect-offline";
import { Link } from 'react-router-dom';

export default function Test(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    // Logined User
    const user = useSelector((state) => state.user);

    // Test Hooks

    const [visionTestList, setVisionTestList] = useState([])
    const [vajiramTestList, setVajiramTestList] = useState([])
    const [shankarTestList, setShankarTestList] = useState([])
    const [forumTestList, setForumTestList] = useState([])
    const [iasTestList, setIasTestList] = useState([])
    const [insightsTestList, setInsightsTestList] = useState([])
    const [upscTestList, setUpscTestList] = useState([])
    const [insightsTestDaysList, setInsightsTestDaysList] = useState([])
    const [iasBabaTestDaysList, setiasBabaTestDaysList] = useState([])
    const [rauIasTestList, setrauIasList] = useState([])

    const [counter, setCounter] = useState()





    const [spinner, setSpinner] = useState(true);
    const [open, setOpen] = useState(false)
    const [currentTestId, setCurrentTestId] = useState()
    const [count, setCount] = useState(0)
    const [state, setState] = useState({
        polity: false,
        environment: false,
        geography: false,
        economy: false,
        history: false,
        currentAffairs: false,
        artAndCulture: false,
        scienceAndTechnology: false
    });

    const [testCategory, setTestCategory] = useState("0")
    const [search, setSearch] = useState()



    //Set Count
    useEffect(() => {
        dispatch(
            getGivenTest({ id: user?.token.user._id }, (err, response) => {
                if (err) {
                    console.log(err)
                } else {
                    setCounter((response.testGiven.data).length)
                }
            }))


    }, [])





    const handleChange = (event) => {
        setCount(count + 1)
        var name = event.target.name
        if (name == 'polity') {
            setState({
                polity: true,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'history') {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: true,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'economy') {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: true,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'geography') {
            setState({
                polity: false,
                environment: false,
                geography: true,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'environment') {
            setState({
                polity: false,
                environment: true,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'currentAffairs') {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: true,
                artAndCulture: false,
                scienceAndTechnology: false
            })
        }
        else if (name == 'artAndCulture') {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: true,
                scienceAndTechnology: false
            })
        }
        else if (name == 'scienceAndTechnology') {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: true
            })
        }
    };


    // Handle Saerch
    const handleSearch = (value) => {
        setSearch(value)


    }

    // Use Effect for Fetching Test (for Not having Same Test Name)
    //Filtering

    useEffect(() => {
        if (testCategory == "0") {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: true
            })

            dispatch(
                getTests((err, response) => {
                    setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS"))
                    setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi"))
                    setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy"))
                    setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS"))
                    setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score"))
                    setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS"))
                    setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs"))
                    setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days"))
                    setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days"))
                    setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS"))

                    setSpinner(false)
                }))
        }
        else if (testCategory == "Full Length") {
            setState({
                polity: false,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
                artAndCulture: false,
                scienceAndTechnology: true

            })

            dispatch(
                getTests((err, response) => {
                    setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Full Length"))
                    setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Full Length"))
                    setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Full Length"))
                    setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Full Length"))
                    setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Full Length"))
                    setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Full Length"))
                    setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Full Length"))
                    setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Full Length"))
                    setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Full Length"))
                    setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Full Length"))

                }))

                setSpinner(false)
        }
        else if (testCategory == "Sectional") {

            dispatch(
                getTests((err, response) => {
                    if (state['polity']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Polity"))

                    }
                    else if (state['history']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))

                    }
                    else if (state['environment']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))

                    }
                    else if (state['economy']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))

                    }
                    else if (state['geography']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                    }
                    else if (state['currentAffairs']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                    }
                    else if (state['artAndCulture']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Art and Culture"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Art and Culture"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Art and Culture"))
                    }
                    else if (state['scienceAndTechnology']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestDaysList(response.tests.filter(ob => ob.instituteName == "Insights IAS 70 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Science and Technology"))
                        setiasBabaTestDaysList(response.tests.filter(ob => ob.instituteName == "IAS Baba 60 Days" && ob.testCategory == "Sectional" && ob.categoryType == "Science and Technology"))
                        setrauIasList(response.tests.filter(ob => ob.instituteName == "Rau IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Science and Technology"))
                    }
                    
        setSpinner(false)
                }))
        }
        
    }, [testCategory, count])



    // Handle Give Test
    const handleGiveTest = (id) => {
         if (user) {
            var testNumber=user.token.user?.allowedTests
            console.log("user",testNumber,counter)
         
            setCurrentTestId(id)
           if (counter< testNumber) {
                setSpinner(true)
                const timer = setTimeout(() => {
                    history.push({
                        pathname: `/givetest/${id}`,
                    });
                }, 1000);
                return () => clearTimeout(timer);
            }
            else {
                setOpen(true)
            }
        }
        else {
            notification.error({
                message: 'Login First',
                className: 'custom-class',
                style: {
                    position: "realtive",
                    top: 60,
                    width: 200,
                },
            });
        }
    }

    //Close Modal
    const handleCloseModal = () => {
        setOpen(false)
        setCurrentTestId("")
    }


    //Share to Whatsapp
    const handleWhatsappShare = () => {
        var array = user.token.user.numberOfShares
        var index = array.findIndex(item => item.testId == currentTestId);

        if (index == -1) {
            array.push({ number: 1, testId: currentTestId })
            user.token.user.numberOfShares = array
            dispatch(setLoginSuccess(user))
            var userId = user.token.user._id
            var body = user.token.user
            dispatch(
                updateUser({ id: userId, body: body }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                    }
                }))


        }
        else {
            var shares = array[index].number
            var newShares = shares + 1
            array[index].number = newShares
            user.token.user.numberOfShares = array
            dispatch(setLoginSuccess(user))
            var userId = user.token.user._id
            var body = user.token.user

            dispatch(
                updateUser({ id: userId, body: body }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                    }
                    //Update user in db and storage
                }))
        }

        setCurrentTestId("")
        setOpen(false)

    }



    return (
        <div className={classes.root}>

            <Header />








            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => handleCloseModal()}
                closeAfterTransition

                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper1}>
                        <h2 id="transition-modal-title" className={classes.modalHeading}>1st Test is free for everyone</h2>
                        <p id="transition-modal-description"> For more tests please choose a plan in the offers page. </p>
                        <Link to="/offers" style={{ textDecoration: "none" }}>
                            <CButton shape="pill" color="success" className={classes.whatsappButton} >
                                Click to See Offers
                            </CButton>
                        </Link>


                    </div>
                </Fade>
            </Modal>
            <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                <CircularProgress color="inherit" size={100} color="primary" />
            </Backdrop>



                <Grid container className={classes.container} spacing={1} >
                    <Grid item lg={2} style={{ paddingTop: 20 }} md={3} sm={3} xs={12}>
                        <Paper elevation={3} className={classes.filterContainer}>
                            <p className={classes.filterHeading}>FILTER</p>
                            {/* First Filter*/}
                            <div className={classes.filterCategoryContainer}>
                                <p className={classes.filterCategoryHeading}>SUBJECT FILTER</p>
                                <div className={classes.filterCategoryItems}>

                                    <CSelect custom id="select" name="testCategory" className={classes.select}
                                        value={testCategory} onChange={(e) => setTestCategory(e.target.value)}>
                                        <option value="0" selected>All Test</option>

                                        <option value="Full Length">Full Length</option>
                                        <option value="Sectional">Sectional</option>
                                    </CSelect>

                                    {testCategory == "Sectional" &&
                                        <FormControl component="fieldset" className={classes.formControl} >
                                            <FormGroup >




                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['polity']}
                                                            onChange={handleChange}
                                                            name="polity"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Polity</Typography>}
                                                />


                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['environment']}
                                                            onChange={handleChange}
                                                            name="environment"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Environment</Typography>}
                                                />

                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['history']}
                                                            onChange={handleChange}
                                                            name="history"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>History</Typography>}
                                                />



                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['economy']}
                                                            onChange={handleChange}
                                                            name="economy"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Economy</Typography>}
                                                />


                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['geography']}
                                                            onChange={handleChange}
                                                            name="geography"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Geography</Typography>}
                                                />




                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['currentAffairs']}
                                                            onChange={handleChange}
                                                            name="currentAffairs"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Current Affairs</Typography>}
                                                />




                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['artAndCulture']}
                                                            onChange={handleChange}
                                                            name="artAndCulture"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Art and Culture</Typography>}
                                                />



                                                <FormControlLabel
                                                    input
                                                    control={
                                                        <Checkbox
                                                            checked={state['scienceAndTechnology']}
                                                            onChange={handleChange}
                                                            name="scienceAndTechnology"
                                                            className={classes.labelCheckbox}
                                                            disableRipple
                                                            color="default"
                                                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                            {...props}
                                                        />
                                                    }
                                                    label={<Typography variant="body2" color="textSecondary" className={classes.label}>Science and Technology</Typography>}
                                                />

                                            </FormGroup>
                                        </FormControl>
                                    }
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

                    <Grid item lg={10} md={7} sm={8} xs={12} className={classes.testContainer}>

              <h3 style={{padding:10,fontSize:15}}>Official Telegram Channel Link:<a href="https://t.me/rapidias_in" target="_blank">https://t.me/rapidias_in</a> </h3>
              <h3 style={{padding:10,fontSize:15}}>Test Series Private Discussion group:<a href="https://t.me/TestsDiscussion_RapidIAS" target="_blank">https://t.me/TestsDiscussion_RapidIAS</a> </h3>          

                        {/*Vision IAS */}

                        {visionTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Vision IAS</h1>
                                    <Grid container spacing={1}>
                                        {
                                            visionTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>
                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


             {/*Forum IAS */}

             {forumTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Forum IAS</h1>
                                    <Grid container spacing={1}>
                                        {
                                            forumTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>
                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>

                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


           

     {/*UPSC PYQs */}
     {upscTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>UPSC PYQs</h1>
                                    <Grid container spacing={1}>
                                        {
                                            upscTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>

                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }




   {/*Insights IAS */}

   {insightsTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Insights IAS</h1>
                                    <Grid container spacing={1}>
                                        {
                                            insightsTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>

                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


     {/* Rau IAS */}

     {rauIasTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Rau IAS</h1>
                                    <Grid container spacing={1}>
                                        {
                                            rauIasTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>
                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }




  {/*IAS Score */}

  {iasTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>IAS Score</h1>
                                    <Grid container spacing={1}>
                                        {
                                            iasTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>
                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


           {/*Insight IAS 70 Days */}

           {insightsTestDaysList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Insights IAS 70 Days</h1>
                                    <Grid container spacing={1}>
                                        {
                                            insightsTestDaysList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>
                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


                        {/* IAS Baba 60 Days */}

                        {iasBabaTestDaysList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>IAS Baba 60 Days</h1>
                                    <Grid container spacing={1}>
                                        {
                                            iasBabaTestDaysList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>
                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>
                        }


             
                     


                        {/*Vajiram and Ravi */}

                        {vajiramTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Vajiram and Ravi</h1>
                                    <Grid container spacing={1}>
                                        {
                                            vajiramTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            {/* First Content*/}
                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>


                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
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
                            </Paper>

                        }



                        {/*Shankar IAS Academy */}

                        {shankarTestList.length > 0 &&
                            <Paper className={classes.categorypaper} elevation={3}>

                                <div className={classes.categoryContainer}>
                                    <h1 className={classes.testCategory}>Shankar IAS Academy</h1>
                                    <Grid container spacing={1}>
                                        {
                                            shankarTestList.map((item, index) => (
                                                <>
                                                    <Grid item lg={3} md={4} sm={6} xs={12}>
                                                        <Paper className={classes.paper} elevation={3}>
                                                            <p className={classes.testHeading}>{item.testName}</p>

                                                            <div className={classes.testContent}>
                                                                <div className={classes.testContentItems}>
                                                                    {item.testCategory == "Sectional" &&
                                                                        <p className={classes.testContentHeading}>                 {item.categoryType} </p>}
                                                                    {item.testCategory == "Full Length" &&
                                                                        <p className={classes.testContentHeading}>Full Length Test</p>
                                                                    }

                                                                </div>

                                                            </div>

                                                            {/* Second Content*/}
                                                            <div className={classes.testContent}>


                                                                <div className={classes.testContentItems} style={{ marginTop: item.testCategory ? "-10px" : "25px" }}>
                                                                    <NoteRounded color="primary" className={classes.testContentIcons} />
                                                                    <p className={classes.testContentHeading} >{item.numberOfQuestions} Questions</p>
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
                            </Paper>
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
    container: {
        paddingTop: 70,
        height: "100%"
    },
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: 15,
        width: 200,
        height: 190,
        marginTop: 5,
        [theme.breakpoints.down('xs')]: {
            width: "210px",

        },



    },
    categorypaper: {

        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: 15,
        margin: 20,

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
            width: 18,
            height: 18,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
    },
    label: {
        fontSize: 14,
        width: 150
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        borderRadius: 20,
        height: 300,
        width: 380,
        outline: "none",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundImage: `url(${ModalBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 40,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            height: "300px",
            width: "250px",

        },

    },
    modalHeading: {
        fontSize: "30px",
        fontWeight: "bold"
    },
    image: {
        objectFit: "contain",
        height: "50px",
        marginRight: 10,
        [theme.breakpoints.down('xs')]: {
            height: "30px",


        },
    },

    qrcode: {
        height: 250,
        width: 350,
        [theme.breakpoints.down('xs')]: {
            height: 50,
            width: 200,


        },
    },
    filterCategoryItems: {
        position: 'relative',
        left: -10,
        top: -25
    },
    select: {
        position: 'relative',

        top: 15

    },
    grow: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "white",
        position: "fixed"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        color: "black",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        color: "black",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        color: "black",
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    icon: {
        color: "black"
    }, submitButton: {
        height: 40,
        margin: 10,
        marginTop: 20,
        width: 80
    },
    submitButton1: {
        fontSize: 20,
        height: 40,
        margin: 10,
        width: 100
    },
    whatsappButton: {

        marginTop: 30
    }


}));

