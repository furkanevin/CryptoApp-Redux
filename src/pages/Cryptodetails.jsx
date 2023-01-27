import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import useApi from './../services/cryptoApi';
import LineChart from '../components/LineChart';
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const [coinDetails, setCoinDetails] = useState({});
  const [coinHistory, setCoinHistory] = useState([]);

  const api = useApi();

  useEffect(() => {
    api
      .get(`/coin/${coinId}`)
      .then((res) => {
        setCoinDetails(res.data.data?.coin);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
      .then((res) => {
        setCoinHistory(res.data?.data.history);
      })
      .catch((err) => console.log(err));
  }, [timeperiod]);

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if (!coinDetails || !coinHistory) return 'Loading....';
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coinDetails.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${
        coinDetails['24hVolume'] && millify(coinDetails['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coinDetails.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(coinDetails.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coinDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: coinDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: coinDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(coinDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(coinDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinDetails?.name} {coinDetails.slug} Price
        </Title>
        <p>
          {coinDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinDetails?.price)}
        coinName={coinDetails?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coinDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {coinDetails.name}, such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {coinDetails.name}, such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coinDetails?.name}?
          </Title>

          {HTMLReactParser(coinDetails?.description || '')}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coinDetails?.name} Links
          </Title>
          {coinDetails.links?.map((link, i) => {
            return (
              <Row className="coin-link" key={i}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            );
          })}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;

// https://prnt.sc/B3d23o4Ps1YD
