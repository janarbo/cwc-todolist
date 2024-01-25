import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Flex, Center, Box} from '@chakra-ui/react';


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
    <Center>
      <Box width="1/3" marginTop='4'>
        <Flex>
          <Input
            type="text"
            placeholder="Enter Todo Title"
            value={todoTitle}
            onChange={handleInputChange}
            mb={2}
            mr={2}
          />
          <Button colorScheme="blue" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </Flex>
      </Box>
  </Center>
  );
};


export default TodoForm;
