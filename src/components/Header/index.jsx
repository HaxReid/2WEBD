import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Logo} from '../Logo';
import logoImg from '../../assets/images/Logo.png';

export function Header () {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const searchCollection = async (event) => {
    event.preventDefault();
    const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
    const response = await fetch(apiUrl);
    const searchResults = await response.json();

    const limitateSearchResults = searchResults.objectIDs.slice(0, 10);
    navigate('/results', { state: { results: limitateSearchResults } });
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

return (
<form onSubmit={searchCollection}>
<nav class="navbar navbar-expand-lg navbar-light bg-light ">
  <div class="container">
    <Logo image={logoImg} title={"MET-MUSEUM"} subtitle={"Temple of art"}/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <input type="text" value={query} className={s.searchTerm} onChange={handleInputChange} placeholder="What are you looking for?"/>
      <button type="submit" className={s.searchButton}><FontAwesomeIcon icon={faSearch} /></button>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/advancedsearch">Advanced Search</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</form>
  );
};
