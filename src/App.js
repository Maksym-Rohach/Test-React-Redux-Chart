import React, { Suspense, Component } from 'react';
import { Route, Switch } from "react-router";

const AdminLayout = React.lazy(() => import("./layout/AdminLayout"))
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
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

          <Route path="/" name="Default"
            render={ props => <AdminLayout { ...props } /> } />

        </Switch>
      </Suspense>
    );
  }
};
export default App;