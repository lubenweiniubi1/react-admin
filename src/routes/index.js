import {
  Dashboard,
  Settings,
  ArticleEdit,
  ArticleList,
  Login,
  NotFound,
} from "../views"
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons"

export const mainRouter = [
  {
    pathname: "/login",
    component: Login,
  },
  {
    pathname: "/404",
    component: NotFound,
  },
]

export const adminRouter = [
  {
    pathname: "/admin/dashboard",
    component: Dashboard,
    title: "仪表盘",
    isNav: true,
    icon: UserOutlined,
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章管理",
    isNav: true,
    icon: LaptopOutlined,
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: NotificationOutlined,
  },

  {
    pathname: "/admin/article/edit/:id",
    component: ArticleEdit,
  },
]
