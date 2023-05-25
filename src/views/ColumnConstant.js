import React, { useState, useEffect } from "react";
// Ant Design Component
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Pagination,
  Tag,
  Avatar,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
  FolderOpenOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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
              onClick={() => editDetails(row)}
              size="small"
            />
          </Tooltip>
          <Tooltip
            title={
              selectedRows.length > 0
                ? `Archive (${selectedRows.length})`
                : "Archive"
            }
          >
            <Popconfirm
              placement="left"
              title={
                selectedRows.length > 0
                  ? `Archive this row (${selectedRows.length})`
                  : "Archive this row "
              }
              onConfirm={() => updateDocumetRequest(selectedRowKeys, row)}
              okText="Yes"
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
