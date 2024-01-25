import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

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
      const response = await axios.get<Todo[]>('http://localhost:3333/todos', { withCredentials: true });
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
      const response = await axios.post('http://localhost:3333/todos', todoData, { withCredentials: true });

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
    <Center>
      <Box width="1/3" marginTop="100">
        <TodoForm onAddTodo={handleAddTodo} />
        <Text textAlign="center" fontSize="xl" fontWeight="bold" mb="2">
          Todo List
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Number</Th>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{todo.title}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};


export default TodoList;
