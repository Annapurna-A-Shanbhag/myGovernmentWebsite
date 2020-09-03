import React,{Component} from 'react'
import './login.css'
import Modal from './modal'
import Backdrop  from './backdrop'
import Transition from 'react-transition-group/Transition'
import Axios from '../Firebase/axios'
import {connect} from 'react-redux'
class Login extends Component{
    state={
         user:'',
         pass:'',
         modalTitle:'',
         modalBody:'',
         show:false,
         disable:true
    }
    modalBody;
    modalTitle;
    check=0;
    disable;
    count=0;
    arr=[];
   checking=()=>{
    Axios.get('/userDatabase.json')
    .then(response=>{
        for(let x in response.data)
        {
            //alert(this.state.user+' '+this.state.pass+response.data[x].Email+' '+response.data[x].Password);
            if(this.state.user===response.data[x].Email && this.state.pass===response.data[x].Password)
            {
               
               this.modalTitle='Successful :)'
               this.modalBody=response.data[x].Fname+' '+response.data[x].Lname+' you have successfully Logged in';
               this.check=1;
               this.disable=false
               //'Gender','Address','Photo',"proof",'Mobile','Email','Password'
               this.arr.push(response.data[x].Fname,response.data[x].Lname,response.data[x].Gender,response.data[x].Date,response.data[x].Address,
                response.data[x].Photo,response.data[x].proof,response.data[x].Mobile,response.data[x].Email,response.data[x].Password)
               break;
            }
        }
        if(this.check===0)
            {
                this.modalTitle='Warning :('
               this.modalBody='Your email and passwords are not matching ';
               this.disable=true;
            }
            this.setState({

                ...this.state,
                modalBody:this.modalBody,
                modalTitle:this.modalTitle,
                disable:this.disable,
                show:true,
        
            })
         
        this.props.inputHandler1(this.arr)
    })
      

   }
   toggle=()=>{
    this.setState({
      ...this.state,
      disable:true,
      show:false
    })
   
  }
    inputHandler=(event,place)=>
    { 
        let target=event.target.value;
        if(place=='Email')
        {
            this.setState({
                ...this.state,
                user:target
            })
        }
        else
        {
            this.setState({
                ...this.state,
                pass:target
            })
        }
    }
render()
{
    return(
        <div className="loginDiv" >
        <Transition
         mountOnEnter
         mountOnExit 
         in={this.state.show} timeout={300}>
      {state=>
        <Modal show={this.state.show} toggle={this.toggle} disable={this.state.disable}
        modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} />
      }
      </Transition>
      <Backdrop show={this.state.show}/>
        <h3  id="inputDiv"><span class="label label-primary" >Enter your Email</span></h3>
        <input type="text" class="form-control" placeholder="Email"  id="inputDiv" onInput={(event)=>this.inputHandler(event,'Email')}/>
        <h3 id="inputDiv"><span class="label label-primary" >Enter your Password</span></h3>
        <input type="password"  class="form-control" placeholder="Password"  id="inputDiv"
         onInput={(event)=>this.inputHandler(event,'Password')}/>
       <button style={{marginLeft:'150px',marginTop:'50px'}}class="btn btn-success" 
       onClick={this.checking} >SUBMIT</button>
        </div>
    )
}


}

let mapDispatchToProps=(dispatch)=>{
    return{
        inputHandler1:(arr)=>dispatch({type:'loginInput',arr1:arr,evt:'',index:''})
    }
    }
export default connect(null,mapDispatchToProps)(Login)