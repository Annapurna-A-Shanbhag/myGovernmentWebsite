import React, { Component } from 'react'
//import Index from './index.jpg'
//import Info from './info.jpg'
//import Infosys from './infosys.jpg'
import {NavLink} from 'react-router-dom'
import  './welcome.css'
import {connect} from 'react-redux'
import Axios from '../Firebase/axios'
import Modal from '../Register/modal'
import Backdrop from '../Register/backdrop'
import Transition from 'react-transition-group/Transition'
import * as firebase from 'firebase'
import '../Firebase/config'
class Welcome extends Component{
  Arr=[]
  Arr1=[]
  Arr2=[]
  y=[];
  state={
     Arr:[],
     Arr1:[],
     Arr2:[],
     show:false,
     id:'',
  }
  componentWillMount=()=>{
  
    Axios.get('/requestDatabase.json')
    
     .then(response=>{
    for(let x in response.data)
    {
      if(response.data[x].Fname===this.props.attributes[0].value && response.data[x].Email===this.props.attributes[8].value )
      {
        this.Arr.push(response.data[x]);
       this.setState({
         ...this.state,
         Arr:this.Arr,
         id:x
       })
      }
    }
  })
      Axios.get('/commentDatabase.json')
     .then(response=>{
      for(let x in response.data)
    {
      if(response.data[x].name===this.props.attributes[0].value)
      {
        
        if(response.data[x].comment)
        this.Arr1.push(response.data[x]);
        else
        this.Arr2.push(response.data[x]);
        this.setState({
          ...this.state,
          Arr1:this.Arr1,
          Arr2:this.Arr2
        })

      }

    } 
     })
   }
   toggle=()=>{
     this.setState({
       ...this.state,
       show:!this.state.show
     })
   }
   submit=()=>
{
  firebase.database().ref('/requestDatabase').child(this.state.id).update({
    close:true,
    disable:true
  })
  this.setState({
    ...this.state,
    show:!this.state.show
  })
}
    content= {arr:[{
                        name:'Post Request',
                        link:'/welcome/postRequest'
                       },                  
                       {
                        name:'Pending Request',
                        link:'/welcome/pendingRequest'
                       },
                       {
                           name:'Completed Request',
                           link:'/welcome/completedRequest'
                        }]
                    }
          render()
          {
        return(
       <div>
         <Transition
         mountOnEnter
         mountOnExit 
         in={this.state.show} timeout={300}>
      {state=>
     <Modal show={this.state.show} toggle={this.toggle} disable={false} submit={this.submit} id={this.state.id}
     modalBody="Are you sure you want to close this Request????" modalTitle="Warning!!!!"/>
      }
        </Transition>

        <Backdrop show={this.state.show}/> 
            <div className="linkDiv">
           { this.content.arr.map((item)=><NavLink className="links" 
           to={item.link} ><h4>{item.name}</h4></NavLink>)}
            </div>
        
     
      <div>
        {this.state.Arr.map((item)=>
          <div className="welcomeDiv">
          <h1>{item.Statement}</h1>
          <h4>{item.Description}</h4>
          <div class="progress">
     <div class="progress-bar" role="progressbar" aria-valuenow={item.progress} aria-valuemin="0" 
     aria-valuemax="100" style={{width:item.progress}}>
     {item.progress}
        </div>
    </div>
          <h3>Votes</h3>
          {
            this.state.Arr2.map((item1)=>
             <div> {item1.statement===item.Statement?(<h4>{item1.count}</h4>):null}</div>)

          }
          <h3>Comments</h3>
          {
            this.state.Arr1.map((item1)=>
            <div> {item1.statement===item.Statement?(
            <div>  
            <h5>{item1.people}</h5>  
            <h4>{item1.comment}</h4>
            </div>
            ):null}</div>)

          }
          <h3>Close the request???</h3>
          <button class="btn btn-danger" onClick={this.toggle} disabled={item.disable}>CLOSE</button>
          </div>
        )}
      </div>
      </div>
      
    )
        }
      
}
let mapStateToProps=(state)=>{
  return{
     attributes:state.attributes,
     show:state.show
  }
}
export default connect(mapStateToProps)(Welcome)