import React from 'react'
import './modal.css'
import {Link} from 'react-router-dom'
let modal=(props)=>{

let classes=props.show?'modalOpen':'modalClosed';
return(
<div   id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" className={classes}>
<div className="modal-dialog" role="document"  >
  <div className="modal-content">
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">{props.modalTitle}</h4>
    </div>
    <div className="modal-body">
        {props.modalBody}
    </div>
    <div class="modal-footer">
    <Link to='/welcome'><button type="button" className="btn btn-success" disabled={props.disable} onClick={props.submit}>Okay</button></Link>
     <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.toggle} >Close</button>
    </div>
  </div>
</div>
</div>)
}
export  default modal