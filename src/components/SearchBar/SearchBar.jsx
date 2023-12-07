import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { FaSearch } from "react-icons/fa";


const Searchbar = ({ onSubmit }) => {
  
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      return;
    }
    onSubmit(searchValue);
  }


  return <header className={css.SearchBar}>

      <form className={css.SearchForm} onSubmit={handleSubmit}>
  
      <button type="submit" className={css.button}>
       <FaSearch/>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={(evt) => {setSearchValue(evt.currentTarget.value.toLowerCase().trim())}}
        />

      </form>
    </header>
}

export default Searchbar;


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
