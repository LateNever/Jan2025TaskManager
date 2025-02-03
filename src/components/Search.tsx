'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchTask } from '@/store/taskSlice';

import Button from '@/UI/Button';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');

  const dispatch = useDispatch();

  const searchTaskHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchTask({ searchText }));
  };

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    if (text.trim() === '') {
      dispatch(searchTask({ searchText: '' }));
    }
  };

  return (
    <form
      onSubmit={searchTaskHandle}
      className="flex mr-4 gap-y-6 p-6 rounded-3xl bg-blue-100 shadow-md"
    >
      <input
        className="p-3 mr-3 rounded-xl bg-blue-200 focus:bg-blue-300"
        value={searchText}
        // onChange={(e) => setSearchText(e.target.value)}
        onChange={searchOnChange}
        type="text"
        id="searchText"
        name="search"
        placeholder="Текст поиска"
      />
      <Button name="Поиск" type="submit" />
    </form>
  );
};

export default Search;
