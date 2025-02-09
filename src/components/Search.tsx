'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { motion } from 'framer-motion';

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
    <motion.form
      onSubmit={searchTaskHandle}
      className="flex gap-x-6 sm:min-w-100 md:min-w-128 p-6 rounded-3xl bg-blue-100 shadow-md"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <input
        className=" w-full p-3 rounded-xl bg-blue-200 focus:bg-blue-300"
        value={searchText}
        onChange={searchOnChange}
        type="text"
        id="searchText"
        name="search"
        placeholder="Текст поиска"
      />
      <Button name="Поиск" type="submit" width="w-32" />
    </motion.form>
  );
};

export default Search;
