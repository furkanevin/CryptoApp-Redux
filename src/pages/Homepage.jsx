import millify from 'millify';
import React from 'react';
import { Col, Row, Statistic, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography;
const Homepage = () => {
  const { stats, initialized } = useSelector((state) => state.cryptoState);

  if (!stats) return 'Loading..';

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Crpto Currencies" value={stats.total} />
        </Col>
        <Col span={12} className="stats-col">
          <Statistic
            title="Total Exchanges"
            value={millify(stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(stats.totalMarketCap)}
          />
        </Col>
        <Col span={12} className="stats-col">
          <Statistic
            title="Total 24H Volume"
            value={millify(stats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(stats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Top 10 Crypto Currencies In The World
        </Title>
        <Title className="show-more" level={3}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies />
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Latest Crypto News
        </Title>
        <Title className="show-more" level={3}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News />
    </>
  );
};

export default Homepage;
