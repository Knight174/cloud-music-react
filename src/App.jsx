import { useEffect, useState } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';

import usePlayList from './hooks/useList';
import './App.css';
import PlayList from './components/PlayList';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const { state, rawData, filteredPlayList, setFilteredPlayList } = usePlayList(
    [],
    keyword
  );

  // function ErrorFallback({ error }) {
  //   return (
  //     <div>
  //       <p>Something went wrong:</p>
  //       <pre>{error.message}</pre>
  //     </div>
  //   );
  // }

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword === '') {
      setFilteredPlayList(rawData);
      return;
    }
    console.log('keyword useEffect');
    setFilteredPlayList(
      rawData.filter((item) => item.name.indexOf(keyword) !== -1)
    );
  }, [keyword]);

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <>
      <div className="sticky top-0 mt-2 text-center text-slate-50">
        <h1>Cloud Music</h1>
        <h2>发现精品歌单</h2>
        <input
          type="text"
          value={keyword}
          onChange={handleInput}
          className="my-3 px-2 text-black"
          placeholder="请搜索歌单名称"
          disabled={state !== 'success'}
        />
        {keyword && <p>You are searching: {keyword}</p>}
      </div>
      <div className="container text-slate-50 px-4">
        <PlayList palyList={filteredPlayList} state={state} />
      </div>
    </>
    // </ErrorBoundary>
  );
}
