import React, { useReducer, useState } from 'react';

// Initial state for the reducer
const initialState = { todos: [] };

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'addTodo':
      // Correcting to spread state.todos, not state
      return { todos: [...state.todos, action.payload] };
    case 'remove':
      // Correcting to return filtered todos
      return { todos: state.todos.filter((_, index) => index !== action.payload) };
    default:
      // Correcting to throw new Error with capital 'E'
      throw new Error('UNKNOWN ACTION TYPE');
  }
};

function Todo() {
  const [inputValue, setInputValue] = useState('');
  // Correcting useReducer hook usage
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = () => {
    // Correcting typo 'playload' to 'payload'
    dispatch({ type: 'addTodo', payload: inputValue });
    setInputValue(''); // Clear the input field after adding
  };

  const handleRemoveClick = (index) => {
    // Correcting to use type instead of action
    dispatch({ type: 'remove', payload: index });
  };

  return (
    <div>
      <label htmlFor="todo">Todo</label>
      <input value={inputValue} onChange={handleChange} type="text" name="todo" id="todo" />
      <button onClick={handleAddClick}>Add Todo</button>

      <ul>
        {/* Correcting to return <li> element */}
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}
            {/* Correcting onClick handler to pass index */}
            <button onClick={() => handleRemoveClick(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
