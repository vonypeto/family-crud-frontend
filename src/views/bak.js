import React, { useState, useEffect } from "react";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
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
const { Option } = Select;

const FamilyCreate = () => {
  const history = useNavigate();
  // Modal State Change
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Houshold satate
  const [form2] = Form.useForm();
  const [formHousehold] = Form.useForm();
  const [houseHoldMember, setHouseHoldMember] = useState([]);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Show House Member Creation
  const showModal = () => {
    setIsModalOpen(true);
  };
  // Cancel House Member
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Create House Member
  const onCreateHouseHoldMember = async (value) => {
    setIsLoading(true);
    value.id = Math.random();
    const newArray = [...houseHoldMember, value];
    console.log(newArray);

    setTimeout(() => {
      setHouseHoldMember(newArray);
    });

    form2.resetFields();
    setIsModalOpen(false);
    setIsLoading(false);
  };
  // Delete House Member
  const onDeleteHouseHoldMember = (id) => {
    const newMembers = houseHoldMember.filter((members) => members.id !== id);
    setHouseHoldMember(newMembers);
  };
  // Final Submit to Create HouseHold with members
  const onCreateHouseHoldName = async (value) => {
    try {
      if (!houseHoldMember.length > 0)
        return notification.warning({
          message: "Missing HouseHold members",
          description: "Please Add House Hold Member to create a household.",
        });
      const newData = {
        household_name: value,
        household_members: houseHoldMember,
      };
      console.log(newData);
      await axios
        .post("/api/create", newData)
        .then((res) => {
          message.info(res.data);
          history("/home");
        })
        .catch((err) => {
          message.warning(err.message);
        });
      console.log(value);
    } catch (error) {
      message.warning(error.message);
    }
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
            <Tooltip title="Delete">
              <Popconfirm
                className="ml-2"
                placement="left"
                onConfirm={() => {
                  onDeleteHouseHoldMember(row?.id);
                }}
                okText="Yes"
                title="Are you sure you want to delete?"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button danger icon={<DeleteOutlined />} size="small" />
              </Popconfirm>
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
  return (
    <div>
      <Form form={formHousehold} onFinish={onCreateHouseHoldName}>
        <Card
          title="Create Household"
          extra={
            <Button htmlType="submit" type="primary" className="mb-2">
              Submit
            </Button>
          }
        >
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Form.Item
                label="Household Name"
                name="household_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Household Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your Address!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Form.Item
                label="House Status"
                name="house_status"
                rules={[
                  {
                    required: true,
                    message: "Please input your House Status!",
                  },
                ]}
              >
                <Select
                  className="w-100"
                  defaultValue="Owned"
                  style={{ width: 120 }}
                >
                  <Option value="Owned">Owned</Option>
                  <Option value="Renting">Renting</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Form.Item
                label="House Number"
                name="house_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your House Number!",
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  min={1}
                  max={100000}
                  defaultValue={0}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Card
        title="Household Members"
        extra={
          <Button onClick={showModal} type="primary" className="mb-2">
            Create Member
          </Button>
        }
      >
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          dataSource={houseHoldMember}
          pagination={{
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
          }}
        />
      </Card>
      <Modal
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
                  <InputNumber min={1} max={1111} defaultValue={0} />
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
      </Modal>
    </div>
  );
};

export default FamilyCreate;
