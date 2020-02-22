import React, { Suspense, Component } from 'react';
import { Route, Switch, Redirect } from "react-router";
import './App.scss';

const AdminLayout = React.lazy(() => import("./layout/AdminLayout"))
//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class App extends Component {

  state = {
    isLoading: false,
    isError: false
  }

  componentDidMount() {

  }

  render() {

  
    return (

      <Suspense fallback={ <div>Загрузка...</div> }>
        <Switch>
          <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
          <Redirect from="/" to="/admin/persons" />

        </Switch>
      </Suspense>
    );
  }
};
export default App;