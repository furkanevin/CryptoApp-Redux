import axios from 'axios';

function useNewsApi() {
  axios.defaults.baseURL = 'https://bing-news-search1.p.rapidapi.com/';
  axios.defaults.headers = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  };

  return axios;
}

export default useNewsApi;
