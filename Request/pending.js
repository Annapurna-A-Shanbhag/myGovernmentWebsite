import React,{Component} from 'react'
import Axios from '../Firebase/axios'
import '../Request/pending.css'
import Button from './Comments/ButtonHandling'
import Add from './Comments/add'
import {connect} from 'react-redux'
import Display from './Comments/display'
 class Pending extends Component
 {
    state={
        posts:null,
        check:'',
        classes:["pendingDiv"],
        background:' '
    }
     arr=[];
     arr1=[];
     arr2={};
     style='';
     count=[];
     count=0;
     val=''
     style={};
 componentDidMount=()=>{
    Axios.get('/requestDatabase.json')
     .then(response=>{
    for(let x in response.data)
    {
    if(response.data[x].close===false)
    this.arr.push(response.data[x]);
    }
    this.setState({posts:this.arr})
    })
      .catch(response=>alert("sorry"+response.data));
   }
   componentDidUpdate=()=>{
    Axios.get('/commentDatabase.json')
    .then(response=>{
      for(let x in response.data)
      {
          if(response.data[x].comment)
       this.arr1.push(response.data[x]);
      else
      {
        this.arr2[x]=response.data[x];
     }
  }
    })
    }

    
    maximize=(statement)=>{
        this.setState({
            ...this.state,
        check:statement,
        classes:[...this.state.classes,"maximize"]
        })
    }
    minimize=(statement)=>{
        let x=this.state.classes;
        x.splice(1,1);
        this.setState({
            ...this.state,
        check:'',
        classes:x

        })
        
    }
     render()
     {  
    return(
       <div>
          {this.arr.map((item)=>
          {   if(item.Statement===this.state.check || this.state.check==='')
             {
              return( 
              <div className={this.state.classes.join(' ')}>
              {(this.state.check==='')?(<button  onClick={()=>{this.maximize(item.Statement)}} 
              id="button" >
                <span class="glyphicon glyphicon-plus-sign"></span></button>):null}
                {(this.state.check===item.Statement)?(<button  
                onClick={()=>{this.minimize(item.Statement)}}  className="button">
                <span class="glyphicon glyphicon-minus-sign"></span></button>):null}
              <h2>{item.Statement}</h2>
              <h5>{item.Fname+" "+item.Lname}</h5>
              {(item.Statement===this.state.check)?(<h4 id="description">{item.Description}</h4>):null}
              {(item.Statement===this.state.check)?
              (<Button item={item} arr2={this.arr2} count={this.count} className="btn" 
              change={this.val} people={this.props.attributes[0].value}/>):null}
             <Add item={item} check={this.state.check} people={this.props.attributes[0].value} />
              <Display item={item} arr1={this.arr1} check={this.state.check}/>              
              {this.style=null}
              {this.arr1=[]}
              </div>
              )
             }
          }
    
          )}
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
 export default connect(mapStateToProps)(Pending)