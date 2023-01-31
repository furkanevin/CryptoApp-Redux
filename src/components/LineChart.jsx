import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinPrice.push(coinHistory[i].price);
  }

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'My First Dataset',
        data: coinPrice.reverse(),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
