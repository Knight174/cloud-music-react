import { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import PlayList from './components/PlayList';

export default function App() {
  const [name, setName] = useState('');
  const [musicList, setMusicList] = useState([]);
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
          setMusicList(data.playlists);
        });
    };
    fetchData().catch((error) => {
      setState('error: ' + error.message);
    });
  }, []);

  return (
    <>
      <div className="sticky top-0 mt-2 text-center text-slate-50">
        <h1>Cloud Music</h1>
        <h2>发现精品歌单</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="my-3"
        />
        {name && <p>Your are searching: {name}</p>}
      </div>
      <div className="container text-slate-50 px-4">
        <PlayList musicList={musicList} state={state} />
      </div>
    </>
  );
}
