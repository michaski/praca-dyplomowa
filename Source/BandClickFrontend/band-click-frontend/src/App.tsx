import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Main from './views/main/Main';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <ProtectedRoute path="/app" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
