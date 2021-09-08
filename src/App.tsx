
import { Home } from './pages/Home';
import {NewRoom} from './pages/NewRoom'; 

import { Route, BrowserRouter, Switch}  from 'react-router-dom'; 


import { AuthContextProvider}  from './contexts/AuthContext'
import { Room } from './pages/Rooms';

function App() {
 

  return (
     <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route path="/"  exact component={Home} />
          <Route path='/room/new' exact component={NewRoom}/>
          <Route path ='/rooms/:id' component={Room}></Route>
        </Switch>
      </AuthContextProvider>
     </BrowserRouter> 
  );
}

export default App;
