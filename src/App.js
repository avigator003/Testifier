import './App.css';
import React from 'react'
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Omr from './Components/Omr';
import Landing from './Home/Landing';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './Dashboard/src/scss/style.scss';
import Test from './Home/TestComponents/Test';
import { makeStyles } from '@material-ui/core/styles';
import TestForm from './Dashboard/src/views/base/tests/TestForm';
import { useSelector, useDispatch } from "react-redux";


const TheLayout = React.lazy(() => import('./Dashboard/src/containers/TheLayout'));


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
 
function App() {
  const classes=useStyles()
 
  const user = useSelector((state) => state.user);
   console.log("user",user)

  return (
    <div className={classes.Appcontainer}>
      
        <Router>
          <React.Suspense fallback={loading}>

          {user ?
            (
              user.token.user.admin ? (
                <Switch>
                   <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              </Switch>
              ) :
                (
                  <Switch>
                 
                  <Route exact path="/givetest" name="Page 404" render={props => <Test {...props}/>} />
                  <Route exact path="/givetest/:id" name="Page 404" render={props => <Omr {...props}/>} />
                  <Redirect from='*' to='/givetest' />
                  </Switch>
                ))
            :
    (
              <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                  <Route exact path="/register" name="Register Page" render={props => <Registration {...props}/>} />
                  <Redirect from='*' to='/login' />
              </Switch>
            )}



 
          </React.Suspense>
      </Router>
      
    </div>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  Appcontainer: {
    backgroundColor:"white"
  },
 
}));