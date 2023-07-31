import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Select,
  Space,
  Input,
  Form,
  Checkbox
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Get_Brands_By_Company } from "../../redux/Brands/BrandsActions";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe"
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow"
          },
          {
            text: "Pink",
            value: "Pink"
          }
        ]
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green"
          },
          {
            text: "Black",
            value: "Black"
          }
        ]
      }
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%"
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London"
      },
      {
        text: "New York",
        value: "New York"
      }
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%"
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];
const Users = () => {
  const userData = useSelector((state) => state.Auth.userData);
  const allData = useSelector((state) => state.Brands.data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [UserRole, setUserRole] = useState("");
  const [userBrands, setuserBrands] = useState([]);

  useEffect(() => {
    const data = {
      companyId: userData?.data?.id
    };
    dispatch(Get_Brands_By_Company(data, userData?.token));
  }, [open]);

  const allBrands = allData?.map((i) => {
    return {
      label: i?.brandname,
      value: i?._id
    };
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const options = [
    {
      label: "admin",
      value: "admin"
    },
    {
      label: "agent",
      value: "agent"
    }
  ];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Modal
        open={open}
        title="Add User"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}>
            Submit
          </Button>
        ]}>
        <Form
          style={{ marginTop: 20 }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!"
              }
            ]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!"
              }
            ]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="Role"
            rules={[
              {
                required: true,
                message: "Please select your Role!"
              }
            ]}>
            <Select
              placeholder="Select Role"
              style={{
                width: "100%"
              }}
              onChange={(value) => setUserRole(value)}
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="Brand"
            rules={[
              {
                required: true,
                message: "Please select your Brand!"
              }
            ]}>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%"
              }}
              placeholder="Select Brand"
              onChange={(value) => setuserBrands(value)}
              options={allBrands}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          margin: "20px 0px 20px 0px"
        }}>
        <Button type="primary" onClick={showModal} loading={loading}>
          Add User
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </>
  );
};

export default Users;
