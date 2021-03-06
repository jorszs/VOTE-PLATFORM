//Layout
import LayoutAdmin from "../layouts/layoutAdmin";
import LayoutBasic from "../layouts/layoutBasic";

//Admin pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/users";

//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//others
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/admin",
        exact: false,
        component: LayoutAdmin,
        routes: [
            {
                path: "/admin",
                exact: true,
                component: AdminHome,
            },
            {
                path: "/admin/login",
                exact: true,
                component: AdminSignIn,
            },
            {
                path: "/admin/users",
                exact: true,
                component: AdminUsers
            },
            {
                component: Error404
            }

        ]

    },
    {
        path: "/",
        exact: false,
        component: LayoutBasic,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true,
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }

        ]
    }
]

export default routes;