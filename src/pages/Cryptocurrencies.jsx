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
  const path = window.location.pathname;
  const count = window.location.pathname.length < 2 ? 10 : 50;
  const [filtredCoins, setFiltredCoins] = useState(coins);
  const [searchTerm, setSearchTerm] = useState('');
  const cryptoApi = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    // path.length < 2 ? 10 : 100
    cryptoApi
      .get(
        `https://coinranking1.p.rapidapi.com/coins?limit=${count}&search=${searchTerm}`
      )
      .then((res) => {
        dispatch(setCryptos(res?.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchFilter = coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltredCoins(searchFilter);
  };
  if (!initialized) {
    return <p>Loading.....................</p>;
  }
  return (
    <>
      {path.length > 2 ? (
        <form className="search-crypto" onSubmit={handleFormSubmit}>
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
        {coins?.map((currency, index) => (
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
