import { Select, Col, Row, Typography, Avatar, Card } from 'antd';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../app/newsSlice';
import axios from 'axios';
const path = window.location.pathname;
const { Text, Title } = Typography;
const { Option } = Select;

const News = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const { news, initialized } = useSelector((state) => state.newsState);
  const { coins } = useSelector((state) => state.cryptoState);
  const [searchTerm, setSearchTerm] = useState('Cryptocurrency');

  useEffect(() => {
    axios.defaults.headers = {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    };
    axios.defaults.baseURL = 'https://bing-news-search1.p.rapidapi.com/';

    axios
      .get(`news/search?q=${searchTerm}`)
      .then((res) => {
        dispatch(setNews(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const demoImage =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  return (
    <Row gutter={[24, 24]}>
      {path.length > 2 ? (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => {
              setSearchTerm(value);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase)
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>

            {coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      ) : (
        ' '
      )}

      {news?.map((singleNew, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={singleNew.url} target="_blank">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {singleNew?.name}
                </Title>
                <img
                  src={singleNew?.image?.thumbnail?.contentUrl || demoImage}
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
              </div>
              <p>
                {singleNew.description > 100
                  ? `${singleNew?.description.substring(0, 100)}...`
                  : singleNew?.description}
              </p>
              <div className="provider-container ">
                <div>
                  <Avatar
                    src={
                      singleNew?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-name">
                    {singleNew?.provider[0]?.name}
                  </Text>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
