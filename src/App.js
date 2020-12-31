import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Home from './containers/Home/Home';
import AdminLogin from './containers/AdminLogin/AdminLogin';
import SuperAdminPanel from './containers/SuperAdminPanel/SuperAdminPanel';
import UserAdminList from './containers/SuperAdminPanel/UserAdminList/UserAdminList';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login/superadmin" component={AdminLogin} />
      <Route path="/panel/superadmin" component={SuperAdminPanel} />
      <Route path="/list/superadmin/:dataType?" component ={UserAdminList} />
    </Switch>
  );
}

export default App;
