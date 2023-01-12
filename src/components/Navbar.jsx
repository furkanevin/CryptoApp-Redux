import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  MenuOutlined,
  BulbOutlined,
} from '@ant-design/icons/lib/icons';
import { Link } from 'react-router-dom';
import icon from '../images/logo.png';
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptonite</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
