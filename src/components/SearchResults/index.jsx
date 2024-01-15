import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from './style.module.css';
import Spinner from 'react-bootstrap/Spinner';
import { Header } from '../Header';


export function SearchResults () {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const objectIds = location.state.results;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchObjects = async () => {
      const objectPromises = objectIds.map(id => {
        return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
          .then(response => response.json());
      });

      const objects = await Promise.all(objectPromises);
      setResults(objects);
      setLoading(true)
    };

    fetchObjects();
  }, [objectIds]);

  return (
    <>
    <Header/>
    <div className={style.object_list_container}>
      <h2 className={style.title}>Search Results</h2>
      {loading ? (
      <>
      <ul className={style.object_list}>
        {results.map(result => (

            <li key={result.objectID}>
            <Link to={`/results/${result.objectID}`}>
            <h3>{result.title}</h3></Link>
            <p>{result.artistDisplayName}</p>
            <img src={result.primaryImage} alt={result.title} />
          </li>

        ))}
      </ul>
      </>
        ) : (
          <Spinner animation="border" role="status" className={style.spinner}/> 
          )}
    </div>
    </>
  );
  
};