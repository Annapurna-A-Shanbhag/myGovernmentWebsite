import React,{Component} from 'react'
import '../../Firebase/config'
import * as firebase from 'firebase'
import './display.css'
class Add extends Component
{
    target=''
    statements=''
    addDatabase1=(name,statement,Email)=>{
        if(this.target!='' && statement===this.statements)
        {
        firebase.database().ref('/commentDatabase').push({
            statement,
            name,
            Email,
            comment:this.target,
            people:this.props.people
            })
           this.target='';
            this.statements='';
        }
        
    }
    addComments=(event,statement)=>{
         this.target=event.target.value;
         this.statements=statement;
     }
    render()
    {
        return(
            <div className="property">
                <h4>Progress</h4>
                {(this.props.item.Statement===this.props.check)?
                <div class="progress">
                <div class="progress-bar" role="progressbar"  aria-valuemin="0" aria-valuemax="100"style={{width:this.props.item.progress}} >
                <span class="sr-only">{this.props.item.progress}</span>
                </div>
              </div>:null}
            <h4>Add Comments</h4>
               {(this.props.item.Statement===this.props.check) ?(
            <div>
            <input type="text"  
            onInput={(event)=>{this.addComments(event,this.props.item.Statement)}}/>
            <button onClick={ ()=>{this.addDatabase1(this.props.item.Fname,this.props.item.Statement,this.props.item.Email)}}>
                <span class="glyphicon glyphicon-ok-sign"></span></button>
                </div>
                ):null}
                </div>
        )
    }

}
export default Add