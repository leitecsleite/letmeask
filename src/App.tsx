import React, { useState } from 'react';
import { createContext} from 'react';

import { Home } from './pages/Home';
import {NewRoom} from './pages/NewRoom'; 

import { Route, BrowserRouter }  from 'react-router-dom'; 

 export const TestContext = createContext({} as any);

function App() {
  const [value, setValue] = useState('teste')

  return (
     <BrowserRouter>
       <TestContext.Provider value={ {value, setValue}}>
        <Route path="/"  exact component={Home} />
        <Route path='/room/new' component={NewRoom}/>
       </TestContext.Provider> 
     </BrowserRouter> 
  );
}

export default App;
