import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePlayList(initialValue, keyword) {
  const [rawData, setRawData] = useState(initialValue);
  const [filteredPlayList, setFilteredPlayList] = useState([]);
  const [state, setState] = useState('idle');
  useEffect(() => {
    // 获取精品歌单
    const fetchData = () => {
      setState('pending');
      return axios
        .get(
          'https://netease-cloud-music-hhes5o9z9-knight174.vercel.app/top/playlist/highquality'
        )
        .then((response) => {
          const { data } = response;
          setRawData(data.playlists); // 设置原始数据
          // 设置根据关键词过滤的数据（主要用这个数据去渲染页面）
          setFilteredPlayList(
            // React设置数据是异步的，所以要使用 data.playlists，而非 rawData
            data.playlists.filter((item) => item.name.indexOf(keyword) !== -1)
          );
          setState('success');
        });
    };
    fetchData().catch((error) => {
      setState('error: ' + error.message);
    });
  }, []);
  return {
    state,
    rawData,
    setRawData,
    filteredPlayList,
    setFilteredPlayList,
  };
}
