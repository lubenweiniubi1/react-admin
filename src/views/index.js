import { lazy } from "react"
// import Dashboard from "./Dashboard"
// import Settings from "./Settings"
// import ArticleList from "./Article"
// import ArticleEdit from "./Article/Edit"
// import Login from "./Login"
// import NotFound from "./NotFound"

//下面是懒加载
const Dashboard = lazy(() => import("./Dashboard"))
const Settings = lazy(() => import("./Settings"))
const ArticleEdit = lazy(() => import("./Article/Edit"))
const ArticleList = lazy(() => import("./Article"))
const Login = lazy(() => import("./Login"))
const NotFound = lazy(() => import("./NotFound"))

export { Dashboard, Settings, ArticleEdit, ArticleList, Login, NotFound }
