import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

interface Todo {
  id: number;
  title: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:3000/todos', { withCredentials: true });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoData: any) => {
    try {
      console.log('Adding todo...', todoData);
      const response = await axios.post('http://localhost:3000/todos', todoData, { withCredentials: true });

      if (response.status === 201) {
        console.log('Todo added successfully!');
        await fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <TodoForm onAddTodo={handleAddTodo} />
    </div>
  );
};

export default TodoList;
