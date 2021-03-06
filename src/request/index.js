import axios from "axios"
import { message } from "antd"

const isDev = process.env.NODE_ENV === "development"
const service = axios.create({
  baseURL: isDev ? "http://rap2.taobao.org:38080/app/mock/264851" : "",
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem("authToken"),
    authToken: "itisatokenplaceholder",
  })
  return config
})

service.interceptors.response.use((resp) => {
  if (resp.data.code === 200) {
    return resp.data
  } else {
    //全局处理错误
    message.error(resp.data.errMsg)
  }
})

// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
  return service.post("/api/v1/articleList", {
    offset,
    limited,
  })
}

// 通过id删除文章
export const deleteArticle = (id) => {
  return service.delete(`/api/v1/article/${id}`)
}
