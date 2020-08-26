import React, { Component } from "react"
import { Card, Button, Table, Tag, Radio } from "antd"
import { getArticles } from "../../request"
import moment from "moment"

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
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          address: "西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          address: "西湖区湖底公园1号",
        },
      ],
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "住址",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "操作",
          dataIndex: "actions",
          key: "actions",
          render: (text, record, index) => {
            return <Button>编辑</Button>
          },
        },
      ],
      total: 0,
      isLoading: false,
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
    getArticles()
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

  render() {
    return (
      <div>
        <Card
          title="文章列表"
          bordered={false}
          extra={<Button>导出excel</Button>}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={false}
            pagination={{
              total: this.state.total,
            }}
            loading={this.state.isLoading}
          />
          ;
        </Card>
      </div>
    )
  }
}
