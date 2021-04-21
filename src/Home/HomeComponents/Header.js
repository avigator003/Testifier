import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
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
import { logoutUser } from '../../store/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CButton, CCol, CFormGroup, CLabel, CSelect } from '@coreui/react';
import Logo from '../../assests/images/logo.png'


const useStyles = makeStyles((theme) => ({
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
  },
  submitButton: {
    height: 40,
    margin: 5,
    marginTop: 20,
    width: "100%"
  },
  aboutButton: {
    height: 40,
    margin: 5,
    marginTop: 20,
    width: "100%"
  },privacyButton: {
    height: 40,
    margin: 5,
    marginTop: 20,
    width: "100%"
  },contactButton: {
    height: 40,
    margin: 5,
    marginTop: 20,
    width: "300px"
  },courseButton: {

    height: 40,
    margin: 5,
    marginTop: 20,
    width: 150
  },
  submitButton1: {
    fontSize: 20,
    height: 40,
    margin: 10,
    width: 100
  },
}));

export default function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()


  // Logined User
  const user = useSelector((state) => state.user);

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


  const handleLogout = () => {
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
      <MenuItem onClick={() => history.push('/userprofile')}>
        <AssignmentInd style={{ marginRight: 10 }} />Profile</MenuItem>
      <MenuItem onClick={() => handleLogout()}>
        <ExitToApp style={{ marginRight: 10 }} />  Logout
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
      style={{ width: 400 }}
    >

      {!user ?
        <>




          <MenuItem className={classes.submitButton1}>

            <CButton variant="outline" color="primary"
              size="md" block onClick={() => history.push('/login')}
            >Login</CButton>
          </MenuItem>
          <MenuItem className={classes.submitButton1}>

            <CButton variant="outline" color="primary"
              size="md" block onClick={() => history.push('/register')}
            >Signup</CButton>
          </MenuItem>

        </>

        :
        <>
          <MenuItem  >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => history.push('/userprofile')}
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={() => handleLogout()}>
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
        </>
      }
    </Menu>
  );






  return (
    <div className={classes.grow}>

      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src={Logo} style={{ width: 60, height: 60, marginRight: 10 }} alt="" />

        Rapid IAS
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
            {!user ?
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              
              
              <div style={{display:"flex",flexDirection:"row",position:"relative",left:-280}} >
              
                <div className={classes.submitButton}>
                  <Link to="/Login" style={{textDecoration:"none"}}>
                  <p  style={{width:60}}>Home</p></Link>
                </div>

                <div className={classes.submitButton} >
                  <Link to="/Login" style={{textDecoration:"none"}}>
                    <p  style={{width:100}}>More Courses</p></Link>
                </div>

                <div className={classes.submitButton}>
                  <Link to="/Login" style={{textDecoration:"none"}}>
                  <p  style={{width:70}}>About Us</p></Link>
                </div>

                <div className={classes.submitButton}>
                  <Link to="/Login" style={{textDecoration:"none"}}>
                  <p  style={{width:80}}>Contact Us</p></Link>
                </div>

                
                <div className={classes.submitButton}>
                  <Link to="/Login" style={{textDecoration:"none"}}>
                  <p  style={{width:100}}>Privacy Policy</p></Link>
                </div>

</div>

<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <div className={classes.submitButton}>
                  <CButton variant="outline" color="primary"
                    size="md" block onClick={() => history.push('/login')}
                  >Login</CButton>
                </div>
                <div className={classes.submitButton}>

                  <CButton variant="outline" color="primary"
                    size="md" block onClick={() => history.push('/register')}
                  >Signup</CButton>
                </div>

</div>
              </div>

              :
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
            }
          </div>

          {/*
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="black"
                    style={{ outline: "none" }}
                >
                    <MoreIcon />
                </IconButton>
            </div>
        */}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="black"
              style={{ outline: "none" }}
            >
              {!user ?
                <>
                  <div className={classes.submitButton}>

                    <CButton variant="outline" color="primary"
                      size="md" block onClick={() => history.push('/login')}
                    >Login</CButton>
                  </div>
                  <div className={classes.submitButton}>

                    <CButton variant="outline" color="primary"
                      size="md" block onClick={() => history.push('/register')}
                    >Signup</CButton>
                  </div>

                </>

                :
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
              }
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>



  );
}
