import React, { Component } from "react"
import { Button } from "antd"

const testHOC = (WrappedComponent) => {
  return class HOCComponent extends Component {
    render() {
      return (
        <>
          <WrappedComponent></WrappedComponent>
          <div>这是高阶组件的信息</div>
        </>
      )
    }
  }
}

@testHOC
class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary">你好</Button>
      </div>
    )
  }
}
//看没配置时是否能用
// export default testHOC(App)

export default App