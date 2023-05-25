import React from "react";
import { Space } from "antd";
import {
  EyeOutlined,
  FolderOpenOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Pagination,
  Tag,
  Row,
  Col,
  Avatar,
  Tooltip,
  Popconfirm,
} from "antd";
const FamilyList = () => {
  const history = useNavigate();

  const columns = [
    {
      title: "Household No.",
      dataIndex: "household_no",
      key: "household_no",
    },
    {
      title: "Household Name",
      dataIndex: "household_name",
      key: "household_name",
    },
    {
      title: "# of Member",
      dataIndex: "household_count",
      key: "household_count",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <div className="text-center">
          <div className="text-center d-flex ">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {}}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                className="ml-2"
                placement="left"
                onConfirm={() => {}}
                okText="Yes"
                title="test"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button danger icon={<FolderOpenOutlined />} size="small" />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const createHousehold = () => {
    history("/create");
  };
  return (
    <div>
      <Row
        justify={"end"}
        className="d-flex justify-content-right text-right align-right pb-2"
      >
        <Button onClick={createHousehold} type="primary">
          Create Houshold
        </Button>
        {/* <Col lg={24}>
          <Card title="Create Houshold">asd</Card>
        </Col> */}
      </Row>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default FamilyList;
