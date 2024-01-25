import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import MainPage from './components/MainPage';
import { ChakraProvider } from '@chakra-ui/react'


const App = () => {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/add" element={<TodoForm onAddTodo={() => {}} />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
    </ChakraProvider>

  );
};

export default App;
