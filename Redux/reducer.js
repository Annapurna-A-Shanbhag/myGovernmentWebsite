let initial={
    attributes:[{
        labal:'First Name',
        placeholder:'First Name',
        type:'text',
        value:''
    },
    { 
     labal:'Last Name',
     placeholder:'Last Name',
     type:'text',
     value:''
    },
    {
     labal:'Gender',
     type:'select',
     option:['Male','Female','Others'],
     value:'Male'
    },
    {
        labal:'Date Of Birth',
     placeholder:'dd-mm-yyyy',
     type:'text',
     value:''
    },
    { 
     labal:'Address',
     placeholder:'Address',
     type:'text',
     value:''
    },
    {
     labal:'Photo',
     type:'file',
     value:''
    },
    {
     labal:'Proof',
     type:'file',
     value:''
    },
    {
        labal:'Mobile Number',
        type:'number',
        placeholder:'Mobile Number',
        value:''
    },
    {
     labal:'Email',
     type:'email',
     placeholder:'Email',
     value:''
    },
    {
     labal:'Password',
     type:'password',
     placeholder:'password',
     value:'',
    },
    {
     labal:'Confirmed Password',
     type:'password',
     placeholder:'Confirmed password',
     value:'',
    },

   ],
show:false
}
let reducer=(state=initial,action)=>{
    if(action.type==='inputHandler')
    {
        let target=action.evt.target.value;
        let attribute=state.attributes.slice();
        attribute[action.index].value=target;
        attribute.value=target;
       state={
           ...state,
           attributes:attribute
       }
    }
    //alert(state.attributes[1].value);
    if(action.type==='loginInput')
    {
        let attribute=state.attributes.slice();
       
        for(let i=0;i<action.arr1.length;i++)
        {
             attribute[i].value=action.arr1[i];
        }
        state={
            ...state,
            attributes:attribute
        }

    }
    return state;
     
}
export default reducer