import { React, useState } from "react";
import "../userCard/userCard.css";
import { Card, Modal, Form, Input, Button, Checkbox } from "antd";

import {
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Meta } = Card;

const UserCard = (props) => {
  const [flag, setFlag] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setstate] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate((prevstate) => ({ ...prevstate, [name]: value }));
    console.log(state);
  };
  const handleSubmit = (e) => {
    console.log(state.firstName, state.lastName, state.email, state.subject);
    e.preventDefault();
  };

  return (
    <div className="userCard-container">
      <Card
        style={{ width: "100%" }}
        cover={
          <img
            alt="example"
            src={`https://avatars.dicebear.com/v2/avataaars/${props.username}.svg?options[mood][]=happy`}
          />
        }
        actions={[
          flag ? (
            <>
              <HeartFilled
                key="heartFilled"
                style={{ color: "red" }}
                onClick={() => setFlag(false)}
              />
            </>
          ) : (
            <>
              <HeartOutlined
                key="heart"
                style={{ color: "red" }}
                onClick={() => setFlag(true)}
              />
            </>
          ),

          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" />,
        ]}
      >
        <Meta
          //   avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={props.username}
          description={[
            <div className="email-container">
              <div className="emailIcon">
                <MailOutlined />
              </div>
              <div className="gmailId">
                <p>{props.email}</p>
              </div>
            </div>,
            <div className="phone-container">
              <div className="phoneIcon">
                <PhoneOutlined />
              </div>
              <div className="phoneNumber">
                <p>{props.phone}</p>
              </div>
            </div>,
            <div className="website-container">
              <div className="websiteIcon">
                <GlobalOutlined />
              </div>
              <div className="websiteName">
                <p>{props.website}</p>
              </div>
            </div>,
          ]}
        />
      </Card>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              value={props.username}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
            />
            <input value={props.username} style={{ display: "none" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              value={props.email}
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
            <input value={props.email} style={{ display: "none" }} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              value={props.phone}
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
            />
            <input value={props.phone} style={{ display: "none" }} />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "Please input your website!" }]}
          >
            <Input
              value={props.website}
              type="text"
              id="website"
              name="website"
              onChange={handleChange}
            />
            <input value={props.website} style={{ display: "none" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserCard;
