import React,{Component} from 'react'
import * as firebase from 'firebase'
import '../../Firebase/config'
import {connect} from 'react-redux'
import './button.css'
import './display.css'
class ButtonHandling extends Component
{
    count=0;
    disable=false;
    classes='';
    people=[];
    changes=[];
   state={
       count:0,
       disable:false,
       classes:''
   }   
    vote=(statement)=>{

        for(let x of Object.keys(this.props.arr2))
        {
         if(this.props.arr2[x].statement===statement)
         {
                 this.setState({
                     count:this.props.arr2[x].count+1,
                     disable:true,
                     classes:'background'
                 })
                 this.people=this.props.arr2[x].people.slice();
                 this.changes=this.props.arr2[x].change.slice();
                 //alert(typeof(this.people));
                 this.people.push(this.props.attributes[7].value);
                 this.changes.push(true);
            // alert( this.classes+"  "+ this.disable)
            firebase.database().ref('/commentDatabase').child(x).update({
                count:this.props.arr2[x].count+1,
                change:this.changes,
                people:this.people
              })
          this.count+=1;
           }
          }
    }
         
    render()
    {
        for(let i of Object.keys(this.props.arr2))
        {
          if(this.props.arr2[i].statement===this.props.item.Statement)
          {
            this.count=this.props.arr2[i].count;
               for(let j=0;j<this.props.arr2[i].people.length;j++)
               {
                   if(this.props.arr2[i].people[j]==this.props.attributes[7].value)
                   {
                    if(this.props.arr2[i].change[j]===true)
                    {
                        this.change=true;
                        this.classes="background";
                        this.disable=true;
                       }
                   }
               }
              
           
          }
        }

        return(
         <div className="property">
             <button onClick={()=>this.vote(this.props.item.Statement)} 
             disabled={this.state.disable||this.disable} className={this.state.classes||this.classes}>
                 <span class="glyphicon glyphicon-thumbs-up" id="pendingSpan" ></span></button>
                <h4>{this.state.count||this.count}</h4>
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
export default connect(mapStateToProps)(ButtonHandling)