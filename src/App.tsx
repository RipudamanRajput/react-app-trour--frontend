import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextStyle, } from '@shopify/polaris';
import Registration from './Components/Auth/Registration'
import Login from './Components/Auth/Login';
import { Route, Routes, } from 'react-router-dom';
import Panel from './Components/Panel/Panel';

function App() {
  return (
    <Routes >
      <Route path='/' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='panel/*'
        element={<Panel />} />
      <Route path='*' element={<TextStyle>404 Page Not Found</TextStyle>} />
    </Routes >
  )
}



export default App;
