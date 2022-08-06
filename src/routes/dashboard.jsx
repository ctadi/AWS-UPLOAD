
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";

import pagesRoutes from "./pages.jsx";

// material-ui-icons
import DashboardIcon from "material-ui-icons/Dashboard";
import Image from "material-ui-icons/Image";
import Apps from "material-ui-icons/Apps";
import ContentPaste from "material-ui-icons/ContentPaste";
import GridOn from "material-ui-icons/GridOn";
import Place from "material-ui-icons/Place";
import WidgetsIcon from "material-ui-icons/Widgets";
import Timeline from "material-ui-icons/Timeline";
import DateRange from "material-ui-icons/DateRange";



var dashRoutes = [
  {
    collapse: true,
    path: "/components",
    name: "Components",
    state: "openComponents",
    icon: Apps,
    views: [
      {
        path: "/components/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons
      },
      {
        path: "/components/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem
      },
      {
        path: "/components/panels",
        name: "Panels",
        mini: "P",
        component: Panels
      },
      {
        path: "/components/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert
      },
      {
        path: "/components/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications
      },
      { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
      {
        path: "/components/typography",
        name: "Typography",
        mini: "T",
        component: Typography
      }
    ]
  },
  {
    collapse: true,
    path: "/forms",
    name: "Forms",
    state: "openForms",
    icon: ContentPaste,
    views: [
      {
        path: "/forms/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
