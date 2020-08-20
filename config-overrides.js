/**
 * @file config-overrides.js
 * @author Pan lin feng
 * 基于customize和react-app-rewired的定制化配置文件
 */

//引入一些相关的customize-cra 方法
const {
  override,
  addLessLoader,
  addDecoratorsLegacy,
} = require("customize-cra")
const modifyVars = require("./lessVars")

module.exports = override(
  addLessLoader({
    lessOptions: {
      modifyVars,
      javascriptEnabled: true,
    },
  }),
  addDecoratorsLegacy()
)
