import React, { Suspense } from "react"
import { render } from "react-dom"
import { ConfigProvider } from "antd"
import { mainRouter } from "./routes"
import zhCN from "antd/es/locale/zh_CN"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Loading } from "./component"

import App from "./App"

import "./index.less"
render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Suspense fallback={<Loading></Loading>}>
        <Switch>
          <Route
            path="/admin"
            render={(routeProps) => {
              //todo：权限，需要登陆才能访问/admin
              return <App {...routeProps} />
            }}
          ></Route>
          {mainRouter.map((route) => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                component={route.component}
              />
            )
          })}
          <Redirect to="/admin" exact from="/"></Redirect>
          <Redirect to="/404"></Redirect>
        </Switch>
      </Suspense>
    </Router>
  </ConfigProvider>,
  document.querySelector("#root")
)
