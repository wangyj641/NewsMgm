import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../views/sandbox/home/Home'
import Nopermission from '../../views/sandbox/nopermission/Nopermission'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/UserList'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Published from '../../views/sandbox/publish-manage/Published'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import axios from 'axios'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset
}

export default function NewsRouter() {

  const [BackRouteList, setBackRouteList] = useState([])
  useEffect(() => {
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then(res => {
      setBackRouteList([...res[0].data, ...res[1].data])
    })
  }, [])

  const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUserPermission = (item) => {
    return rights.includes(item.key)
  }

  return (
    <Switch>
      {
        BackRouteList.map(item => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
          }
          return null
        }
        )
      }


      <Redirect from="/" to="/home" exact />
      {
        BackRouteList.length > 0 && <Route path="*" component={Nopermission} />
      }

    </Switch>
  )
}
