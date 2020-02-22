import React from 'react';

const PersonsChart = React.lazy(() => import("../views/PersonsChart"));

const adminRoutes = [
    { path: '/admin/persons', exact: true, name: 'Home', component: PersonsChart  },
   
];
export default adminRoutes;