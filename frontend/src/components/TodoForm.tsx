import React, { useState } from 'react';
import axios from 'axios';

interface TodoFormProps {
  onAddTodo: (todoData: any) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleAddTodo = async () => {
    try {
      if (todoTitle.trim() !== '') {
        console.log('Adding todo...', { title: todoTitle });
        const response = await axios.post('http://localhost:3000/todos', { title: todoTitle });

        if (response.status === 201) {
          console.log('Todo added successfully!');
          onAddTodo(response.data); 
          setTodoTitle('');
        }
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Todo Title"
        value={todoTitle}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
