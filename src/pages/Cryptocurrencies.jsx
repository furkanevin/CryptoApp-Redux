import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useState, useEffect } from 'react';
import useApi from './../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';
import { setCryptos } from '../app/cryptoSlice';

const Cryptocurrencies = () => {
  const { coins, initialized } = useSelector((state) => state.cryptoState);
  const [cryptoList, setCryptoList] = useState([]);
  const path = window.location.pathname;
  const [searchTerm, setSearchTerm] = useState('');
  const cryptoApi = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    cryptoApi
      .get(
        `https://coinranking1.p.rapidapi.com/coins?limit=${
          path.length < 2 ? 10 : 50
        }&search=${searchTerm}`
      )
      .then((res) => {
        dispatch(setCryptos(res?.data?.data));
        setCryptoList(res?.data?.data.coins);
        console.log(cryptoList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);
  if (!cryptoList) return 'loadin';
  return (
    <>
      {path.length > 2 ? (
        <form className="search-crypto">
          <Input
            placeholder="Search CryptoCurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <SearchOutlined />
          </button>
        </form>
      ) : (
        ''
      )}

      <Row gutters={[32, 32]} className="crypto-card-container">
        {cryptoList?.map((currency, index) => (
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
