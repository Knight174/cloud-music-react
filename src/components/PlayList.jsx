import PlayListItem from './PlayListItem';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function PlayList({ musicList, state }) {
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {musicList.length
          ? musicList.map((item) => (
              <li key={item.id} className="my-2">
                <PlayListItem item={item} />
              </li>
            ))
          : null}
      </ul>
      {!musicList.length && (
        <p
          className={classnames('text-center', {
            'bg-red-300': state.indexOf('error') !== -1,
            'bg-emerald-300': state === 'idle',
            'bg-yellow-300': state === 'pending',
          })}
        >
          {state}
        </p>
      )}
    </>
  );
}

PlayList.propTypes = {
  musicList: PropTypes.array,
  state: PropTypes.string.isRequired,
};
