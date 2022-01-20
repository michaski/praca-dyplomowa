import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Main from './views/main/Main';
import { Provider } from 'react-redux';
import store from './store';
import Register from './views/register/Register';
import AllBands from './views/bands/all/AllBands';
import ManagedBands from './views/bands/managed/ManagedBands';
import SharedSectionMainPage from './views/shared/main/SharedSectionMainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route path="/shared" component={SharedSectionMainPage} />
            <ProtectedRoute path="/bands/managed" component={ManagedBands} />
            <ProtectedRoute path="/bands/all" component={AllBands} />
            <ProtectedRoute path="/app" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
