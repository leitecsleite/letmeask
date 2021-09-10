
import { Home } from './pages/Home';
import {NewRoom} from './pages/NewRoom'; 

import { Route, BrowserRouter, Switch}  from 'react-router-dom'; 


import { AuthContextProvider}  from './contexts/AuthContext'
import { Room } from './pages/Rooms';
import { AdminRoom } from './pages/AdminRoom';

function App() {
 

  return (
     <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route path="/"  exact component={Home} />
          <Route path='/room/new' exact component={NewRoom}/>
          <Route path ='/rooms/:id' component={Room} />
          <Route path ='/admin/rooms/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
     </BrowserRouter> 
  );
}

export default App;
