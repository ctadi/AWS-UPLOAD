import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/upload", name: "Home", component: RegularForms },
  { path: "/", name: "Home", component: LoginPage }
];

export default indexRoutes;
