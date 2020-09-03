import React,{Component} from 'react'
import {connect} from 'react-redux'
import Axios from '../Firebase/axios'
import './request.css'
import * as firebase from 'firebase'
import '../Firebase/config'
import Transition from 'react-transition-group/Transition'
import Backdrop from '../Register/backdrop'
import Modal from '../Register/modal'
class Request extends Component{
     textArea=''
     input=''
     file=''
     check=0;
     checking=0;
     modalBody;
     modalTitle;
     disable;
    state={
      show:false,
     disable:true,
     modalBody:"",
     modalTitle:""
    }
      toggle=()=>{
        this.setState({
          ...this.state,
          show:!this.state.show
        })
      }
     storeDatabse=()=>
    {
      let info={};
        
          if(this.check===0)
         {
          info['Fname']=this.props.attributes[0].value;
          info['Lname']=this.props.attributes[1].value;
          info['Email']=this.props.attributes[8].value;
          info['Statement']=this.input;
          info['Description']=this.textArea;
          info['Proof1']=this.file;
          info['close']=false;
          info['disable']=false;
          info['progress']=0;
         Axios.post('./requestDatabase.json',info)
         .then(response=>{
          }
         )
         .catch(response=>alert('no'+response));
         firebase.database().ref('/commentDatabase').push({
           name:this.props.attributes[0].value,
           email:this.props.attributes[8].value,
           statement: info['Statement'],
           count:0,
           people:["dummy"],
           change:[false],
   
         })  

         }
        }
      submit=()=>{
        this.checking=0;
        let show=false
        if(this.input==='' || this.textArea==='' || this.file==='')
        {
          this.modalBody='Fill all the fields'
              this.modalTitle='Warning :('
              this.disable=true
              show=true
              this.checking=1
              this.setState({
                ...this.state,
                modalBody:this.modalBody,
                modalTitle:this.modalTitle,
                disable:this.disable,
                show:true
                })
        }
        if(this.checking===0)
        {
        Axios.get('./requestDatabase.json')
        .then(response=>{
          for(let x in response.data)
          {
            if(response.data[x].Statement===this.input)
            {
              this.modalBody='Sorry give some unique statement'
              this.modalTitle='Warning :('
              this.disable=true
             this.check=1;
            }

          }
          if(this.check==0)
          {
            this.modalBody=this.props.attributes[0].value+' You have successfully posted Request'
              this.modalTitle='Successful :)'
              this.disable=false
          }
          this.setState({
            ...this.state,
            modalBody:this.modalBody,
            modalTitle:this.modalTitle,
            disable:this.disable,
            show:true
            })
        })
        }
    
      
    }
     onInput=(event)=>{
       this.check=0;
        this.textArea=event.target.value;
    }
     onInput1=(event)=>{
      this.check=0;
      this.input=event.target.value;
    }
     onInput2=(event)=>{
      this.check=0;
        this.file=event.target.value;
      }
      render(){
    return(
         <div className="requestDiv">
             <Transition
         mountOnEnter
         mountOnExit 
         in={this.state.show} timeout={300}>
      {state=>
     <Modal show={this.state.show} toggle={this.toggle} disable={this.state.disable} submit={this.storeDatabse} 
     modalBody={this.state.modalBody} modalTitle={this.state.modalTitle}/>
      }
        </Transition>

        <Backdrop show={this.state.show}/>
         <table>
        {this.props.attributes.map((item,index)=>{
        if(item.labal!='Photo' && item.labal!='Password' && item.labal!='Confirmed Password' && item.labal!='Proof' )
        return(
        <tr>
         <td><h3 id="labal"><span class="label label-primary">{item.labal}</span></h3></td>
            <td><input type="text" class="form-control" type={item.type}   id="inputDiv"
            value={item.value} onInput={(event)=>{this.props.inputHandler(event,index)}}  disabled={true}/></td>
         </tr>)})      
         }
          <tr>
             <td><h3 id="labal"><span class="label label-primary">Request statement</span></h3></td>
             <td><input  class="form-control" type="text" onInput={this.onInput1}  id="inputDiv"/></td>
         </tr>
         <tr>
             <td><h3 id="labal"><span class="label label-primary" >Request Description</span></h3></td>
             <td ><textarea class="form-control"   onInput={this.onInput}  id="inputDiv"/></td>
        </tr>
        <tr>
             <td><h3 id="labal"><span class="label label-primary">Attach any proof</span></h3></td>
             <td><input  class="form-control" type="file"  onInput={this.onInput2}  id="inputDiv"/></td>
         </tr>
         </table>
       <button class="btn btn-success"style={{marginLeft:'250px'}} onClick={this.submit}>Submit</button>
         </div>)

}
}
let mapStateToProps=(state)=>{
    return{
       attributes:state.attributes,
       show:state.show
    }
}
export default connect(mapStateToProps)(Request)