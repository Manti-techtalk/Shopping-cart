import React,{useReducer} from 'react'

const initialState = {count: 0}

const reducer = (state,action)=>{
    switch(action.type){
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        case 'reset':
            return {count: state.count * 0}
        default:
            throw new Error('UNKOWN ACTION TYPE')
    }
}

function Counter() {
    const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div>
        <h1>{state.count}</h1>
        <button onClick={()=>dispatch({type:'increment'})}>Add</button>
        <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
        <button onClick={()=>dispatch({type:'decrement'})}>Subtract</button>
    </div>
  )
}

export default Counter