import React from 'react';

type Props = {
  isLoading: boolean;
  initData: () => void;
  sortByName: () => void;
  sortByStatus: () => void;
  sortByTitle: () => void;
}

export const Buttons: React.FC<Props> = ({ isLoading, initData, sortByName, sortByStatus, sortByTitle }) => {

  return (
    <div>
      <button
        type="button"
        disabled={isLoading}
        onClick={initData}
      >
        {isLoading ? 'Loading...' : 'Load data'}
      </button>
      <button
        type="button"
        onClick={() => sortByName()}
      >
        Sort By Name
      </button>
      <button
        type="button"
        onClick={() => sortByStatus()}
      >
        Sort By Status
      </button>
      <button
        type="button"
        onClick={() => sortByTitle()}
      >
        Sort By Title
      </button>
    </div>
  );
};
