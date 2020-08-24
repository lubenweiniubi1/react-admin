import React, { Component } from "react"
import { Layout, Menu } from "antd"
import logo from "./logo.png"

import "./frame.less"
import { adminRouter } from "../../routes"
import { withRouter } from "react-router-dom"

const menus = adminRouter.filter((route) => route.isNav === true)
const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    console.log(this.props)
    return (
      <Layout style={{ height: "100%" }}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt=""></img>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={this.props.history.location.pathname}
              onClick={this.onMenuClick}
              style={{ height: "100%", borderRight: 0 }}
            >
              {menus.map((item) => {
                return (
                  <Menu.Item key={item.pathname}>
                    <item.icon></item.icon>
                    {item.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "16px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: "white",
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame
