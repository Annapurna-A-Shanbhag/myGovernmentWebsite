import React,{Component} from 'react'
import  './Register.css'
// import {Modal, ModalBody} from 'react-bootstrap'
import {connect} from 'react-redux'
//import { Button } from 'react-bootstrap';
import * as firebase from 'firebase'
import '../Firebase/config'
import Transition from 'react-transition-group/Transition'
import Backdrop from './backdrop'
import Modal from './modal'
class Register extends Component{
 state={
      modalTitle:'',
      modalBody:'',
       show:false,
       disable:true
     }
keys=['Fname','Lname','Gender','Date','Address','Photo',"proof",'Mobile','Email','Password'];
password1
password2
disable
modalTitle
modalBody
classes=["modal"];
toggle=()=>{
       this.setState({
         ...this.state,
         disable:true,
         show:false
       })
      
     }
submit=()=>{
        let obj={}
        for(let i=0;i<this.keys.length;i++)
        {
            obj[this.keys[i]]=this.props.attributes[i].value;
        }
        firebase.database().ref('/userDatabase').push(
          obj
    )
}
checking=()=>{
  let test=1;
    this.password1=this.props.attributes[9].value;
    this.password2=this.props.attributes[10].value;
    for(let attr of this.props.attributes)
    {
      if(attr.value==='')
      {
        this.modalTitle="Warning:(";
        this.modalBody="You "+" didn't fill "+attr.labal;
        this.disable=true;
        test=0;
       break;
      }
    }
     if(test)
     
    {
      if(this.password1!=this.password2)
      {
      this.modalTitle="Warning :(";
      this.modalBody=this.props.attributes[0].value+" "+this.props.attributes[1].value+" Passwords are not matching";
      this.disable=true;
    }
    else
    {
      this.modalTitle="Successful :)";
      this.modalBody=this.props.attributes[0].value+" "+this.props.attributes[1].value+" you have successfylly registered";
      this.disable=false;
    }
  }
    this.setState({
      ...this.state,
      modalTitle:this.modalTitle,
      modalBody:this.modalBody,
      disable:this.disable,
      show:true,
    })
 

}
  render()
  {
      return(
       <div className="registerDiv" >
  

  
  <Transition
         mountOnEnter
         mountOnExit 
         in={this.state.show} timeout={300}>
      {state=>
     <Modal show={this.state.show} toggle={this.toggle} disable={this.state.disable} submit={this.submit}
     modalBody={this.state.modalBody} modalTitle={this.state.modalTitle}/>
      }
        </Transition>

        <Backdrop show={this.state.show}/> 


        {this.props.attributes.map((item,index)=>
        <table>
        <td><h3 id="labal"><span class="label label-primary" >{item.labal}</span></h3></td>
         <div class="form-group">
            {(item.labal!='Gender')?(<td><input type="text"  id="inputDiv" class="form-control" 
            type={item.type} placeholder={item.placeholder} 
            value={item.value} onInput={(event)=>{this.props.inputHandler(event,index)}} /></td>):
           (<select class="form-control" value={item.value} onInput={(event)=>{this.props.inputHandler(event,index)}} id="inputDiv">
                {item.option.map((item1)=>
                <option>{item1}</option>)}
                </select>)}
               </div>
         </table>
         )
        }

         <button class="btn btn-success" style={{marginLeft:'250px'}} 
         onClick={this.checking}>SUBMIT</button>
           
           


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
let mapDispatchToProps=(dispatch)=>{
    return{
        inputHandler:(event,index)=>dispatch({type:'inputHandler',evt:event,index:index,arr1:[]})
    }
    }
    

export default connect(mapStateToProps,mapDispatchToProps)(Register)