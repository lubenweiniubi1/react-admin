import React from "react"
import { render } from "react-dom"

import { mainRouter } from "./routes"

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import App from "./App"

import "./index.less"
render(
  <Router>
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
  </Router>,
  document.querySelector("#root")
)
