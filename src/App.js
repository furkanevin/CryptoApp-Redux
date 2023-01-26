import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  Cryptodetails,
  News,
} from './components';
import './App.css';
import { useDispatch } from 'react-redux';
import useApi from './services/cryptoApi';
import { setCryptos } from './app/cryptoSlice';

const App = () => {
  const dispatch = useDispatch();
  const cryptoApi = useApi();

  // Verileri al

  // useEffect(() => {
  //   // path.length < 2 ? 10 : 100
  //   cryptoApi
  //     .get(`https://coinranking1.p.rapidapi.com/coins`)
  //     .then((res) => {
  //       dispatch(setCryptos(res?.data.data));
  //       console.log(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<Cryptodetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Cryptonite <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
