import React, {Component} from 'react'
import Register from './Register/register'
//import {Button,Modal} from 'react-bootstrap'
import Welcome from './Welcome/welcome'
import {BrowserRouter} from 'react-router-dom'
import Request from './Request/request' 
import {Route} from 'react-router-dom'
import Pending from './Request/pending'
import Login from './Register/login'
import Start from './Start/start'
import Completed from './Request/completed'
 class App extends Component{
     state={
         show:false,
     }
    handleModal=()=>{
        this.setState({show:!this.state.show})
    }
    render()
    {
        return(
            <BrowserRouter>
           <div>
               <Route path="/" exact component={Start}/>
               <Route path="/register" exact component={Register}/>
                <Route path="/login"  component={Login}/>
               <Route path="/welcome" exact component={Welcome}/>
               <Route path="/welcome/postRequest" component={Request}/>
               <Route path="/welcome/pendingRequest" component={Pending}/>
               <Route path="/welcome/completedRequest" component={Completed}/>
            </div>
            </BrowserRouter>
        )
    }
}
 export default App
