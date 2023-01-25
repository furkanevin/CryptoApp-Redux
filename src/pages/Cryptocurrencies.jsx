import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useState, useEffect } from 'react';
import useApi from './../services/cryptoApi';

const Cryptocurrencies = () => {
  const { coins } = useSelector((state) => state.cryptoState);
  const path = window.location.pathname;
  const [filtredCoins, setFiltredCoins] = useState([]);
  const api = useApi();
  useEffect(() => {
    api
      .get(`coins?limit=${path.length < 2 ? 10 : 100}`)
      .then((res) => {
        setFiltredCoins(res?.data.data.coins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="search-crypto"></div>
      <Row gutters={[32, 32]} className="crypto-card-container">
        {filtredCoins?.map((currency, index) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.uuid}
          >
            <Link to={`/crypto/${currency?.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
