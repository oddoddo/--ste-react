import React from "react";
import { Button, Divider, Form, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/landing");
  };

  return (
    <>
      <section style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}>
        <Space align="start">
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            STE Administrator
          </Typography.Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }} />
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label="ID">
          <Input className="ant-form-input" />
        </Form.Item>
        <Form.Item label="PW">
          <Input className="ant-form-input" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Button
            onClick={onClickHandler}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Home;
