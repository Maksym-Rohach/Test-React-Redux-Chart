import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { AppFooter, AppHeader, AppSidebar, AppSidebarFooter,
         AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer,
         AppSidebarNav2 as AppSidebarNav } from '@coreui/react';
import navigation from '../navs';
import routes from '../routes/adminRoutes';

const AdminFooter = React.lazy(() => import('../components/Footer'));
const AdminHeader = React.lazy(() => import('../components/AdminNavbar'));

class AdminLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    const { login } = this.props;

    let isAccess = false;
    if(login.isAuthenticated)
    {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Admin')
          isAccess = true;
      }
    }

    const content = (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
          <AdminHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body " >
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" >
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    )
                      : (null);
                  })}
                  <Redirect from="/" to="/admin/clients" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <AdminFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
    return (
      isAccess ? content
        : <Redirect to="/login" />
    )
  }
}

const mapStateToProps = (state) => {
  return {
   
  };
}

AdminLayout.propTypes =
  {
    logout: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
  }

export default connect(mapStateToProps)(AdminLayout);


// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import PerfectScrollbar from "perfect-scrollbar";
// import AdminNavbar from "../components/AdminNavbar.jsx";
// import Footer from "../components/Footer.jsx";
// import Sidebar from "../components/Sidebar.jsx";
// import FixedPlugin from "../components/FixedPlugin.jsx";

// import routes from "../routes.js";

// //import logo from "assets/img/react-logo.png";

// var ps;

// class Admin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       backgroundColor: "blue",
//       sidebarOpened:
//         document.documentElement.className.indexOf("nav-open") !== -1
//     };
//   }
//   componentDidMount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       document.documentElement.className += " perfect-scrollbar-on";
//       document.documentElement.classList.remove("perfect-scrollbar-off");
//       ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
//       let tables = document.querySelectorAll(".table-responsive");
//       for (let i = 0; i < tables.length; i++) {
//         ps = new PerfectScrollbar(tables[i]);
//       }
//     }
//   }
//   componentWillUnmount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps.destroy();
//       document.documentElement.className += " perfect-scrollbar-off";
//       document.documentElement.classList.remove("perfect-scrollbar-on");
//     }
//   }
//   componentDidUpdate(e) {
//     if (e.history.action === "PUSH") {
//       if (navigator.platform.indexOf("Win") > -1) {
//         let tables = document.querySelectorAll(".table-responsive");
//         for (let i = 0; i < tables.length; i++) {
//           ps = new PerfectScrollbar(tables[i]);
//         }
//       }
//       document.documentElement.scrollTop = 0;
//       document.scrollingElement.scrollTop = 0;
//       this.refs.mainPanel.scrollTop = 0;
//     }
//   }
//   // this function opens and closes the sidebar on small devices
//   toggleSidebar = () => {
//     document.documentElement.classList.toggle("nav-open");
//     this.setState({ sidebarOpened: !this.state.sidebarOpened });
//   };
//   getRoutes = routes => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       } else {
//         return null;
//       }
//     });
//   };
//   handleBgClick = color => {
//     this.setState({ backgroundColor: color });
//   };
//   getBrandText = path => {
//     for (let i = 0; i < routes.length; i++) {
//       if (
//         this.props.location.pathname.indexOf(
//           routes[i].layout + routes[i].path
//         ) !== -1
//       ) {
//         return routes[i].name;
//       }
//     }
//     return "Brand";
//   };
//   render() {
//     return (
//       <>
//         <div className="wrapper">
//           <Sidebar
//             {...this.props}
//             routes={routes}
//             bgColor={this.state.backgroundColor}
//             logo={{
//               outterLink: "https://www.creative-tim.com/",
//               text: "Creative Tim",
//               //imgSrc: logo
//             }}
//             toggleSidebar={this.toggleSidebar}
//           />
//           <div
//             className="main-panel"
//             ref="mainPanel"
//             data={this.state.backgroundColor}
//           >
//             <AdminNavbar
//               {...this.props}
//               brandText={this.getBrandText(this.props.location.pathname)}
//               toggleSidebar={this.toggleSidebar}
//               sidebarOpened={this.state.sidebarOpened}
//             />
//             <Switch>{this.getRoutes(routes)}</Switch>
//             {// we don't want the Footer to be rendered on map page
//             this.props.location.pathname.indexOf("maps") !== -1 ? null : (
//               <Footer fluid />
//             )}
//           </div>
//         </div>
//         <FixedPlugin
//           bgColor={this.state.backgroundColor}
//           handleBgClick={this.handleBgClick}
//         />
//       </>
//     );
//   }
// }

// export default Admin;
