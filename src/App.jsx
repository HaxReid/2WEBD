import { Home } from "./components/Home";
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {AdvancedSearch} from './components/AdvancedSearch';
import {SearchResults} from './components/SearchResults';
import {ItemDetails} from './components/ItemDetails';

export function App () {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedsearch" element={<AdvancedSearch/>} />
          <Route path="/results" element={<SearchResults/>} />
          <Route path="/results/:objectID" element={<ItemDetails />} /> 
          <Route path="*" element={<Link to="/">Erreur : Page introuvable Home</Link>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

