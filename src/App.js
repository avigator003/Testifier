import './App.css';
import React from 'react'
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Omr from './Components/Omr';
import Landing from './Home/Landing';
import 'antd/dist/antd.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './Dashboard/src/scss/style.scss';

const TheLayout = React.lazy(() => import('./Dashboard/src/containers/TheLayout'));


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
 
function App() {
  
  return (
    <div className="App">
      
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/*
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              */}
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
   
    </div>
  );
}

export default App;
