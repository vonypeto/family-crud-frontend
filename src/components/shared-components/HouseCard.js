import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
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
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const HouseCard = (props) => {
  const {
    type,
    isModalOpen,
    handleCancel,
    onCreateHouseHoldMember,
    width,
    houseHoldData,
  } = props;
  const [houseHoldMember, setHouseHoldMember] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form2] = Form.useForm();

  const getDocumentPage = async (search) => {
    try {
      setLoading(true);
      await axios
        .get(`/api/get-family?page=${0}&pageSize=${100}&search=${search || ""}`)
        .then((res) => {
          setHouseHoldMember(res.data);

          setLoading(false);
        });
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    console.log(houseHoldData);
    if (type === "edit") {
      form2.setFieldValue("last_name", houseHoldData.last_name);
      form2.setFieldValue("age", houseHoldData.age);
      form2.setFieldValue("first_name", houseHoldData.first_name);
      form2.setFieldValue("middle_name", houseHoldData.middle_name);
      form2.setFieldValue("civil_status", houseHoldData.civil_status);
      form2.setFieldValue("alias", houseHoldData.alias);
      form2.setFieldValue("household_id", houseHoldData.household_id);
    }
    if (type === "create") form2.resetFields();
  });
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  useEffect(() => {
    getDocumentPage();
  }, []);
  return (
    <div>
      <Modal
        title="Create Member"
        open={isModalOpen}
        okText="Submit"
        onCancel={handleCancel}
        width={width - 400}
        centered={true}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Card title="Household Members">
          <Form form={form2} onFinish={(e) => onCreateHouseHoldMember(e, type)}>
            <Row>
              <Form.Item name="household_id" />
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
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
              <Col sm={24} md={24} lg={24}>
                <Form.List name="household_members_id">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <>
                          {" "}
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayoutWithOutLabel)}
                            label={index === 0 ? "Relatives" : ""}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input Relative's name or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              {loading ? null : (
                                <Select
                                  showSearch
                                  className="w-100"
                                  style={{ width: 120 }}
                                >
                                  {houseHoldMember.map((i) => {
                                    return (
                                      <Option
                                        key={i.household_id}
                                        value={i.household_id}
                                      >
                                        {i.first_name} {i.last_name}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              )}
                            </Form.Item>

                            {fields.length > 0 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
                          </Form.Item>
                        </>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{
                            width: "60%",
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
              <Col sm={24} md={24} lg={24} className="text-right">
                <Button htmlType="primary" type="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Form
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
        ></Form>
      </Modal>
    </div>
  );
};

export default HouseCard;
