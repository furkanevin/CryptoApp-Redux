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
import MenuItem from 'antd/es/menu/MenuItem';
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
        <MenuItem icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </MenuItem>
        <MenuItem icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Home</Link>
        </MenuItem>
        <MenuItem icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
