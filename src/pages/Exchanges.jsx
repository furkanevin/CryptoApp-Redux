import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import useApi from './../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const api = useApi();
  const [exchanges, setExchanges] = useState(null);

  useEffect(() => {
    api
      .get('https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ/coins')
      .then((res) => setExchanges(res.data?.data?.coins))
      .catch((err) => console.log(err));
  }, []);

  if (!exchanges) return 'loading';

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.price)}$</Col>
                  </Row>
                }
              >
                <h1>Hey</h1>
                <p>This place is hardcoded because api...</p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
