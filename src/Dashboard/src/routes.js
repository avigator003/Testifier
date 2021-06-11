import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const TestForm = React.lazy(() => import('./views/base/tests/TestForm'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Tests = React.lazy(() => import('./views/TestCards/TestCards'));

const TestApproval = React.lazy(() => import('./views/base/tests/TestApproval'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const UserForm = React.lazy(() => import('./views/users/UserForm'));
const RecentTests = React.lazy(() => import('./views/base/tests/RecentTests'));

const UserTestAnalysis = React.lazy(() => import('../../Home/HomeComponents/UserTestAnalysis'));



const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/test/details', name: 'Tests', component: Tests },
  { path: '/test/recent', name: 'Recent Tests', component: RecentTests },
  { path: '/test/approvals', name: 'Tests approvals', component: TestApproval },
  { path: '/test/add', name: 'Add Test', component: TestForm ,exact:true},
  { path: '/test/edit/:id', name: 'Edit Test', component: TestForm },
  { path: '/test/view/:id', name: 'View Test', component: TestForm },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/user/edit/:id', exact: true, name: 'Edit User', component: UserForm },
  { path: '/usertestanalysis/:id', exact: true, name: 'User Test Analysis', component: UserTestAnalysis }
];

export default routes;
