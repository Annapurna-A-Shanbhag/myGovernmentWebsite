import React,{Component} from 'react'
import './display.css'
class Displaycomment extends Component
{
    render()
    {
        return(
         <div className="property">  
        <h4>Comments</h4>
              {(this.props.item.Statement===this.props.check ) ?(this.props.arr1.map((item1)=>{
                return(
                  <div className="displayDiv">
                  {this.props.item.Statement===item1.statement?(<div>
                   <p>{item1.people}</p>
                   <h4>{item1.comment}</h4>
                     </div>):null}
                   </div>   
                )})):null}
        </div> 
        )
    }
}
export default Displaycomment