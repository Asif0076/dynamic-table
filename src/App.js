import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import TableForm from './component/TableForm';
import TableList from './component/TableList';
import SingleTable from './component/SingleTable';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/create-table">Create Table</Link>
              </li>
              <li>
                <Link to="/tables">All Tables</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/create-table">
              <TableForm/>
            </Route>
            <Route path="/tables">
              <TableList/>
            </Route>
            <Route path="/table/:id">
              <SingleTable />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;