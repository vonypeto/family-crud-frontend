import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar, Skeleton, message, Table } from "antd";
import { Icon } from "../components/shared-components/Icon";
import CustomAvatar from "../components/shared-components/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MailOutlined,
  UserOutlined,
  HeartOutlined,
  HistoryOutlined,
  AndroidOutlined,
  PhoneOutlined,
  SkinOutlined,
  StarOutlined,
  VerticalAlignTopOutlined,
  UserSwitchOutlined,
  BankOutlined,
  KeyOutlined,
  ManOutlined,
  CarryOutOutlined,
  ProfileOutlined,
  IdcardOutlined,
  WomanOutlined,
  HomeOutlined,
  ContactsOutlined,
  HomeFilled,
  AuditOutlined,
  ContainerOutlined,
  VerticalAlignBottomOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const FamilyPreview = () => {
  const [houseHoldData, setHouseHoldData] = useState({});
  const [houseHoldRelative, setHouseHoldRelative] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  console.log(params.id);
  const displayText = (data) => {
    return data ? data : "None";
  };

  const getDocumentPage = async () => {
    try {
      setLoading(true);
      await axios.get(`/api/get-family/data?id=${params?.id}`).then((res) => {
        setHouseHoldData(res.data[0]);
        setHouseHoldRelative(res?.data[0]?.household_members_id);
        console.log(res?.data[0]?.household_members_id);
        setLoading(false);
      });
    } catch (error) {
      message.error(error.message);
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
  ];
  useEffect(() => {
    getDocumentPage();
  }, []);
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={7}>
        <Card title="Profile" className="text-left">
          <Skeleton loading={loading} avatar active={{ size: "large" }}>
            <div className="pt-1 mb-2 text-center">
              <CustomAvatar
                size={150}
                image={`https://robohash.org/${
                  Math.floor(Math.random() * 100) + 1
                }`}
              />
              <div>
                <h2>
                  {displayText(`${houseHoldData?.first_name} ${houseHoldData?.middle_name}
                  ${houseHoldData?.last_name}`)}
                </h2>
              </div>
            </div>

            <div
              className="d-flex align-items-center "
              style={{ fontSize: "15px " }}
            >
              <Col xs={24} sm={24} md={24} className="w-100">
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={SkinOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Alias:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(houseHoldData?.alias)}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={UserSwitchOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Civil Status:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(houseHoldData?.civil_status)}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={HistoryOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Age:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      <b>{houseHoldData?.age}</b>
                    </span>
                  </Col>
                </Row>
              </Col>
            </div>
          </Skeleton>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={17}>
        <Card
          title="Parents, Children and Brother & Sister Tree"
          loading={loading}
        >
          <Col xs={24} sm={24} md={24} className="w-100">
            <Table
              columns={columns}
              scroll={{ x: "max-content" }}
              rowKey="_id"
              loading={loading}
              dataSource={houseHoldRelative}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
              }}
            />
          </Col>
        </Card>
      </Col>
    </Row>
  );
};

export default FamilyPreview;
