import React,{Component} from 'react'
import Axios from '../Firebase/axios'
import  '../Welcome/welcome.css'
class Completed extends Component
{
    Arr=[]
  Arr1=[]
  Arr2=[]
  y=[];
  state={
     Arr:[],
     Arr1:[],
     Arr2:[],
  }
  statement=[];
  componentWillMount=()=>{
    Axios.get('/requestDatabase.json')
    .then(response=>{
        let j=0;
        for(let x in response.data)
        {
        if(response.data[x].close===true)
        {
            this.statement[j++]=response.data[x].Statement;
        this.Arr.push(response.data[x]);
        }
      }
      this.setState({
        ...this.state,
        Arr:this.Arr,
      })
    })
      Axios.get('/commentDatabase.json')
          .then(response=>{
            for(let j=0;j<this.statement.length;j++)
            {
           for(let i in response.data)
         {
           if(response.data[i].statement===this.statement[j])
           {
             if(response.data[i].comment)
             {
                
             this.Arr1.push(response.data[i]);
             }
             else
             this.Arr2.push(response.data[i]);
     
           }
        }
     
         } 
         this.setState({
            ...this.state,
            Arr1:this.Arr1,
            Arr2:this.Arr2
          })
          })
          .catch(response1=>alert("sorry"+response1.data));
    
  }

    render()
    {
        return(
            <div>
            {this.state.Arr.map((item)=>
              <div className="welcomeDiv">
              <h1>{item.Statement}</h1>
              <h4>{item.Description}</h4>
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
              </div>
            )}
          </div>
        )
    }
}
export default Completed