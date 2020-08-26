import React, { Component } from "react"
import { Card, Button, Table, Tag, Radio } from "antd"
import { getArticles } from "../../request"
import moment from "moment"
import XLSX from "xlsx"

const { Group } = Radio
const titleDisplayMap = {
  id: "id",
  title: "标题",
  author: "作者",
  createAt: "创建时间",
  amount: "阅读量",
}

console.log(moment())
export default class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
    }
  }

  createColumns = (columnKeys) => {
    const cols = columnKeys.map((item) => {
      if (item === "amount") {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
            const { amount } = record
            //根据数字大小做条件渲染
            return (
              <Tag color={amount > 200 ? "red" : "green"}>{record.amount}</Tag>
            )
          },
        }
      } else if (item === "createAt") {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
            const { createAt } = record

            return moment(createAt).format("YYYY年MM月DD日 HH:mm:ss")
          },
        }
      }

      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    cols.push({
      title: "操作",
      key: "action",
      render: (text, record, index) => {
        return (
          <Group>
            <Button value="1" size="small" type="ghost">
              编辑
            </Button>
            <Button value="2" size="small" type="danger">
              删除
            </Button>
          </Group>
        )
      },
    })
    return cols
  }

  getData = () => {
    this.setState({
      isLoading: true,
    })
    getArticles(this.state.offset, this.state.limited)
      .then((resp) => {
        const columnsKeys = Object.keys(resp.data.list[0])
        const columns = this.createColumns(columnsKeys)

        const dataSource = resp.data.list.map((record) => {
          record.key = record.id
          return record
        })

        this.setState({
          total: resp.data.total,
          columns,
          dataSource,
        })
      })
      .catch((err) => {
        //处理错误，虽然有全局处理
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  componentDidMount() {
    this.getData()
  }

  onPageChange = (page, pageSize) => {
    this.setState(
      {
        offset: (page - 1) * pageSize,
        limited: pageSize,
      },
      () => {
        this.getData()
      }
    )
  }

  toExcel = () => {
    //在实际的项目中，这个功能时前端发送一个请求到后端，然后后端返回一个文件下载的地址
    //组合数据
    const data = [Object.keys(this.state.dataSource[0])]

    this.state.dataSource.forEach((item) => {
      item.createAt = moment(item.createAt).format("YYYY年 MM月 HH:mm")
    })

    for (let i = 0; i < this.state.dataSource.length; i++) {
      const value = Object.values(this.state.dataSource[i])
      data.push(value)
    }

    console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "meshit.xlsx")
  }

  render() {
    return (
      <div>
        <Card
          title="文章列表"
          bordered={false}
          extra={<Button onClick={this.toExcel}>导出excel</Button>}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={false}
            pagination={{
              current: this.state.offset / this.state.limited + 1,
              total: this.state.total,
              onChange: this.onPageChange,
              showQuickJumper: true,
              showSizeChanger: false,
            }}
            loading={this.state.isLoading}
          />
          ;
        </Card>
      </div>
    )
  }
}
