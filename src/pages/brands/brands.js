import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_Brands_By_Company,
  Get_All_Brands
} from "../../redux/Brands/BrandsActions";
const columns = [
  {
    title: "Brand Name",
    dataIndex: "brandname",
    width: "40%"
  },
  {
    title: "Company",
    dataIndex: "company",
    render: (item) => item?.name,
    sorter: (a, b) => a.name - b.name
  }
];
const Brands = () => {
  const userData = useSelector((state) => state.Auth.userData);
  const allData = useSelector((state) => state.Brands.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      companyId: userData?.data?.id
    };
    console.log(userData, " userData?.data?.id");
    if (userData?.data?.role === "Superadmin") {
      dispatch(Get_All_Brands(userData?.token));
    } else {
      dispatch(Get_Brands_By_Company(data, userData?.token));
    }
  }, []);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          margin: "20px 0px"
        }}>
        <Button type="primary" loading={loading}>
          Add Brand
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={allData}
        onChange={onChange}
      />
    </div>
  );
};

export default Brands;
