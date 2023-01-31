import React, { useEffect, useState } from 'react';
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
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptonite</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu className="navbar-inner">
          <MenuItem className="navbar-item" icon={<HomeOutlined />}>
            <Link
              onClick={() =>
                screenSize < 768 ? setActiveMenu(!activeMenu) : ''
              }
              to="/"
            >
              Home
            </Link>
          </MenuItem>
          <MenuItem className="navbar-item" icon={<FundOutlined />}>
            <Link
              onClick={() =>
                screenSize < 768 ? setActiveMenu(!activeMenu) : ''
              }
              to="/cryptocurrencies"
            >
              Cryptocurrencies
            </Link>
          </MenuItem>
          <MenuItem className="navbar-item" icon={<MoneyCollectOutlined />}>
            <Link
              onClick={() =>
                screenSize < 768 ? setActiveMenu(!activeMenu) : ''
              }
              to="/exchanges"
            >
              Exchanges
            </Link>
          </MenuItem>
          <MenuItem className="navbar-item" icon={<BulbOutlined />}>
            <Link
              onClick={() =>
                screenSize < 768 ? setActiveMenu(!activeMenu) : ''
              }
              to="/news"
            >
              News
            </Link>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
