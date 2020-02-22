import React from 'react';

const PersonsChart = React.lazy(() => import("../views/PersonsChart"));
const CommentsChart = React.lazy(() => import("../views/CommentsChart"));

const adminRoutes = [
    { path: '/admin/persons', exact: true, name: 'Persons', component: PersonsChart  },
    { path: '/admin/comments', exact: true, name: 'Comments', component: CommentsChart  }
];
export default adminRoutes;