import React,{Component} from 'react'
import './start.css'
import {Link} from 'react-router-dom'
class Start extends Component
{
    render()
    {
        return(
            <div>
                <h1 style={{background:'whitesmoke',marginLeft:'300px'}}>WELCOME TO MY GOVERNMENT </h1>
                <div id="div">
                
                </div>
                <div style={{marginLeft:'500px'}}>
               <Link to="/register" ><button class="btn btn-primary" id="btn">Register</button></Link>
                <Link to="/login" ><button class="btn btn-primary" id="btn">Login</button></Link>
                </div>
            </div>
        )
    }
}
export  default Start