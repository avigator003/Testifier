import React, { useState, useEffect } from 'react';
import { makeStyles ,fade} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getTests, setLoginSuccess, updateUser } from "../../store/Actions";
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
    const [open, setOpen] = useState(false)
    const [currentTestId, setCurrentTestId] = useState()
    const [count,setCount]=useState(0)
    const [state, setState] = useState({
        polity: false,
        environment: false,
        geography: false,
        economy: false,
        history: false,
        currentAffairs: false,
    });

    const [testCategory, setTestCategory] = useState("0") 
    const[search,setSearch]=useState()

      
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    
    const handleLogout=()=>{
      setAnchorEl(null);
      handleMobileMenuClose();
      dispatch(logoutUser())
      history.push('/')
  }
  


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <AssignmentInd style={{marginRight:10}}/>Profile</MenuItem>
      <MenuItem onClick={()=>handleLogout()}>
      <ExitToApp style={{marginRight:10}}/>  Logout
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
          <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={()=>handleLogout()}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  






    const handleChange = (event) => {
        setCount(count+1)
        var name = event.target.name
        if (name == 'polity') {
            setState({
                polity: true,
                environment: false,
                geography: false,
                economy: false,
                history: false,
                currentAffairs: false,
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
            })
        }
    };


    // Handle Saerch
    const handleSearch=(value)=>{
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
                }))

        }
        else if(testCategory == "Sectional"){

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
                    }
                    else if (state['history']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "History"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "History"))

                    }
                    else if (state['environment']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Environment"))

                    }
                    else if (state['economy']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Economy"))

                    }
                    else if (state['geography']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Geography"))

                    }
                    else if (state['currentAffairs']) {
                        setVisionTestList(response.tests.filter(ob => ob.instituteName == "Vision IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setVajiramTestList(response.tests.filter(ob => ob.instituteName == "Vajiram and Ravi" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setShankarTestList(response.tests.filter(ob => ob.instituteName == "Shankar IAS Academy" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setForumTestList(response.tests.filter(ob => ob.instituteName == "Forum IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setIasTestList(response.tests.filter(ob => ob.instituteName == "IAS Score" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setInsightsTestList(response.tests.filter(ob => ob.instituteName == "Insights IAS" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))
                        setUpscTestList(response.tests.filter(ob => ob.instituteName == "UPSC PYQs" && ob.testCategory == "Sectional" && ob.categoryType == "Current Affairs"))

                    }
                }))
        }
    }, [testCategory,count])


    // Logined User
    const user = useSelector((state) => state.user);

    // Handle Give Test
    const handleGiveTest = (id) => {
        setCurrentTestId(id)

        const sharedTestItem = user.token.user.numberOfShares.filter(ob => ob.testId == id)
        const countShares = sharedTestItem[0]?.number


        if (countShares >= 2) {
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
         
         <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Testifier
          </Typography>
          {/** 
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e)=>handleSearch(e.target.value)}
            />
          </div>
          */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* 
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon className={classes.icon}/>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon className={classes.icon} />
              </Badge>
            </IconButton>
            */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.icon} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="black"
              style={{outline:"none"}}
            >
              <MoreIcon  />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>

         
         
         
         
         
         
         
         
         
         
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
                        <h2 id="transition-modal-title" className={classes.modalHeading}>Unlock Test</h2>
                        <p id="transition-modal-description">Share Test to 2 times to unlock</p>
                        <WhatsappShareButton url={"Hey Testifier Share your tests"}>

                            <CButton shape="pill" color="success" className={classes.whatsappButton} onClick={() => handleWhatsappShare()}>
                                <WhatsappIcon size={32} round={true} className={classes.image} />

              Share to Whatsapp
              </CButton>
                        </WhatsappShareButton>



                    </div>
                </Fade>
            </Modal>
            <Backdrop className={classes.backdrop} open={spinner} onClick={() => setSpinner(false)}>
                <p style={{ marginRight: 20 }}>Preparing Test</p>
                <CircularProgress color="inherit" size={100} color="primary" />
            </Backdrop>

            <Grid container className={classes.container} >
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
                                                        icon={<span className={classes.icon} />}
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
                                                        icon={<span className={classes.icon} />}
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
                                                        icon={<span className={classes.icon} />}
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
                                                        icon={<span className={classes.icon} />}
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
                                                        icon={<span className={classes.icon} />}
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
                                                        icon={<span className={classes.icon} />}
                                                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                                                        {...props}
                                                    />
                                                }
                                                label={<Typography variant="body2" color="textSecondary" className={classes.label}>Current Affairs</Typography>}
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

                <Grid item lg={10} md={7} sm={8} xs={12}>



                    {/*Vajiram and Ravi */}

                    {vajiramTestList.length > 0 &&
                        <Paper className={classes.categorypaper} elevation={3}>

                            <div className={classes.categoryContainer}>
                                <h1 className={classes.testCategory}>Vajiram and Ravi</h1>
                                <Grid container spacing={1}>
                                    {
                                        vajiramTestList.map((item, index) => (
                                            <>
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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
                                                <Grid item lg={2} md={4} sm={6} xs={12}>
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



                    {/*Vision IAS */}

                    {visionTestList.length > 0 &&
                        <Paper className={classes.categorypaper} elevation={3}>

                            <div className={classes.categoryContainer}>
                                <h1 className={classes.testCategory}>Vision IAS</h1>
                                <Grid container spacing={1}>
                                    {
                                        visionTestList.map((item, index) => (
                                            <>
                                                <Grid item lg={2} md={4} sm={6} xs={6}>
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
        paddingTop: 70
    },
    formControl: {
        margin: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: 15,
        width: 165,
        height: 190,
        [theme.breakpoints.down('xs')]: {
            width: "210px",

        },



    },
    categorypaper: {

        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: 15,
        margin: 20
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
        width: 500,
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
            height: "250px",
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
    whatsappButton: {
        height: 80,
        width: 300,
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
      appbar:{
    backgroundColor:"white",
    position:"fixed"
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        display: 'none',
        color:"black",
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        color:"black",
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
        color:"black",
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
      icon:{
        color:"black"
      }
    

}));

