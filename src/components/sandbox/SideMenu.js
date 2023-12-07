import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom'
import {
  UserOutlined
} from '@ant-design/icons';
import axios from 'axios'
import { connect } from 'react-redux'

const { Sider } = Layout;
const { SubMenu } = Menu

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />
  //.......
}

function SideMenu(props) {
  const [meun, setMeun] = useState([])
  useEffect(() => {
    axios.get("/rights?_embed=children").then(res => {
      console.log(res.data)
      setMeun(res.data)
    })
  }, [])

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  // set user access right for view， if user is a super user, it wil show all information
  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        //  console.log(props)
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }

  // console.log(props.location.pathname)
  const selectKeys = [props.location.pathname]
  const openKeys = ["/" + props.location.pathname.split("/")[1]]
  console.log(props)
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed} >
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo" >World News Management System</div>
        <div style={{ flex: 1, "overflow": "auto" }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} className="aaaaaaa" defaultOpenKeys={openKeys}>
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}

export default connect(mapStateToProps)(withRouter(SideMenu))