import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  EyeFilled,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Form,
  Modal,
  InputNumber,
  notification,
  message,
} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import HouseCard from "../components/shared-components/HouseCard";

const { Option } = Select;

const FamilyCreate = () => {
  const history = useNavigate();
  // Modal State Change
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("create");

  // Houshold satate
  // const [form2] = Form.useForm();
  const [formHousehold] = Form.useForm();
  const [houseHoldMember, setHouseHoldMember] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysEdit, setSelectedRowKeysEdit] = useState([]);

  // Pagination State

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const defaultPageSize = 10;
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // Pagination
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  console.log(selectedRowKeys);
  // Show House Member Creation
  const showModalCreate = () => {
    setType("create");
    setIsModalOpen(true);
  };
  // Show House Member Edit
  const showModalEdit = (row) => {
    setType("edit");
    setSelectedRowKeysEdit(row);
    setIsModalOpen(true);
  };
  // Cancel House Member
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Create & Edit House Member
  const onCreateHouseHoldMember = async (value, type) => {
    try {
      setIsLoading(true);
      if (type === "create") {
        await axios
          .post("/api/create", value)
          .then((res) => {
            const newArray = [...houseHoldMember, value];
            message.success("New Family Added");
          })
          .catch((err) => {
            message.warning(err.message);
          });
        value.id = Math.random();
        const newArray = [...houseHoldMember, value];
        console.log(newArray);

        setTimeout(() => {
          setHouseHoldMember(newArray);
        });
      }
      if (type === "edit") {
        await axios.post(`/api/update`, value).then((res) => {
          const newData = houseHoldMember.map((item) => {
            if (item._id === res.data._id) {
              return { ...item, ...res.data };
            }
            return item;
          });
          message.success("Edit Succesfull");
          console.log(res.data);
        });
      }

      // form2.resetFields();
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };
  // Delete House Member
  // const onDeleteHouseHoldMember = (id) => {
  //   const newMembers = houseHoldMember.filter((members) => members.id !== id);
  //   setHouseHoldMember(newMembers);
  // };
  // Final Submit to Create HouseHold with members
  const getDocumentPage = async () => {
    try {
      const skip = (currentPage - 1) * pageSize;
      const limit = pageSize;
      setLoading(true);
      await axios
        .get(`/api/get-family?page=${skip}&pageSize=${limit}`)
        .then((res) => {
          setHouseHoldMember(res.data);
          setTotal(res.headers["x-total-count"]);
          setLoading(false);
        });
    } catch (error) {
      message.error(error.message);
    }
  };
  // Delete House Member
  const onDeleteHouseHoldMember = async (row) => {
    const newData = {
      household_id: row,
    };
    try {
      await axios.post(`/api/delete`, newData).then((res) => {
        console.log(res.data);
        return getDocumentPage();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };
  const columns = [
    {
      title: "last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      key: "middle_name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Civil Status",
      dataIndex: "civil_status",
      key: "civil_status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <div className="text-center">
          <div className="text-center d-flex ">
            <Tooltip title="Edit">
              <Button
                type="primary"
                onClick={() => history(`/home/${row?.household_id}`)}
                icon={<EyeOutlined />}
                size="small"
              />
            </Tooltip>
            <Tooltip
              title={
                selectedRows.length > 0
                  ? `Delete (${selectedRows.length})`
                  : "Delete"
              }
            >
              <Popconfirm
                className="ml-2"
                placement="left"
                onConfirm={() => {
                  if (!selectedRowKeys || selectedRowKeys.length === 0) {
                    onDeleteHouseHoldMember([row?.household_id]);
                  } else {
                    onDeleteHouseHoldMember(selectedRowKeys);
                  }
                }}
                okText="Yes"
                title={
                  selectedRows.length > 0
                    ? `Delete this row (${selectedRows.length})`
                    : "Delete this row "
                }
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button danger icon={<DeleteOutlined />} size="small" />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                onClick={() => showModalEdit(row)}
                icon={<EditOutlined />}
                size="small"
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  // Modal Resize
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const listener = window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  // Get Data
  useEffect(() => {
    getDocumentPage();
  }, [currentPage, pageSize]);
  return (
    <div>
      <Card
        title="Household Members"
        extra={
          <Button onClick={showModalCreate} type="primary" className="mb-2">
            Create Member
          </Button>
        }
      >
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          rowKey="household_id"
          loading={isLoading}
          dataSource={houseHoldMember}
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
          pagination={{
            current: currentPage,
            total: total,
            pageSize: pageSize,
            showSizeChanger: true,
            defaultPageSize: defaultPageSize,
            pageSizeOptions: [defaultPageSize, 20, 50, 100],
            onShowSizeChange: handlePageChange,
            onChange: handlePageChange,
          }}
        />
      </Card>
      <HouseCard
        type={type}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onCreateHouseHoldMember={onCreateHouseHoldMember}
        width={width}
        houseHoldData={selectedRowKeysEdit}
      />

      {/* <Modal
        title="Create Member"
        open={isModalOpen}
        // onOk={onCreateHouseHoldMember}
        okText="Submit"
        onCancel={handleCancel}
        width={width - 400}
        centered={true}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Card title="Household Members">
          <Form form={form2} onFinish={onCreateHouseHoldMember}>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    { required: true, message: "Please input your Last name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="Middle Name"
                  name="middle_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Middle name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="Age "
                  name="age"
                  rules={[
                    { required: true, message: "Please input your Age!" },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    max={1111}
                    defaultValue={0}
                  />
                </Form.Item>
              </Col>{" "}
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="Alias "
                  name="alias"
                  rules={[
                    { required: true, message: "Please input your alias!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12}>
                <Form.Item
                  label="Civil Status"
                  name="civil_status"
                  rules={[
                    { required: true, message: "Please input your alias!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} md={24} lg={24} className="text-right">
                <Button htmlType="primary" type="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal> */}
    </div>
  );
};

export default FamilyCreate;
