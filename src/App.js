import React, { Component } from "react"
import { Button } from "antd"

import { Route, Switch, Redirect } from "react-router-dom"
import { adminRouter } from "./routes"

class App extends Component {
  render() {
    return (
      <div>
        <div>公共部分</div>
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
          <Redirect to={adminRouter[0].pathname} from="/admin" exact></Redirect>
          <Redirect to='/404'  ></Redirect>
        
        </Switch>
      </div>
    )
  }
}

export default App
