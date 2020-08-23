import React, { Component, Suspense } from "react"
import { Loading } from "./component"

import { Route, Switch, Redirect } from "react-router-dom"
import { adminRouter } from "./routes"
import { Frame } from "./component"

class App extends Component {
  render() {
    return (
      <Frame>
        <Suspense fallback={<Loading />}>
          <Switch>
            {adminRouter.map((route) => {
              return (
                <Route
                  key={route.pathname}
                  path={route.pathname}
                  exact={!!route.exact}
                  render={(routerProps) => {
                    return <route.component {...routerProps}></route.component>
                  }}
                ></Route>
              )
            })}
            <Redirect
              to={adminRouter[0].pathname}
              from="/admin"
              exact
            ></Redirect>
            <Redirect to="/404"></Redirect>
          </Switch>
        </Suspense>
      </Frame>
    )
  }
}

export default App
