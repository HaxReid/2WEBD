import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';
import { Header } from '../Header';

export function AdvancedSearch () {
  const [q, setQ] = useState('');
  const [hasImages, setHasImages] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isOnView, setIsOnView] = useState(false);
  const [departmentId, setDepartmentId] = useState('');
  const [tag, setTag] = useState(false);
  const [medium, setMedium] = useState('');
  const [artistOrCulture, setArtistOrCulture] = useState(false);
  const [geoLocation, setGeoLocation] = useState('');
  const [dateBegin, setDateBegin] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const navigate = useNavigate();

  const searchCollection = async () => {
    let apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search';

    const params = [];

    if (q) {
      params.push(`q=${encodeURIComponent(q)}`);
    }

    if (hasImages) {
      params.push('hasImages=true');
    }

    if (isHighlight) {
      params.push('isHighlight=true');
    }

    if (isOnView) {
      params.push('isOnView=true');
    }

    if (departmentId) {
      params.push(`departmentId=${encodeURIComponent(departmentId)}`);
    }

    if (tag) {
      params.push(`tags=true`);
    }

    if (medium) {
      params.push(`medium=${encodeURIComponent(medium)}`);
    }

    if (artistOrCulture) {
      params.push(`artistOrCulture=true`);
    }

    if (geoLocation) {
      params.push(`geoLocation=${encodeURIComponent(geoLocation)}`);
    }

    if(dateBegin) {
        params.push(`dateBegin=${encodeURIComponent(dateBegin)}`);
    }

    if(dateEnd) {
        params.push(`dateEnd=${encodeURIComponent(dateEnd)}`);
    }

    if (params.length) {
      apiUrl += `?${params.join('&')}`;
    }

    const response = await fetch(apiUrl);
    const searchResults = await response.json();
    const limitateSearchResults = searchResults.objectIDs.slice(0, 10);
    navigate('/results', { state: { results: limitateSearchResults } });
  };

  const handleQChange = event => {
    setQ(event.target.value);
  };

  const handleHasImagesChange = event => {
    setHasImages(event.target.checked);
  };

  const handleIsHighlightChange = event => {
    setIsHighlight(event.target.checked);
  };

  const handleIsOnViewChange = event => {
    setIsOnView(event.target.checked);
  };

  const handleDepartmentIdChange = event => {
    setDepartmentId(event.target.value);
  };

  const handleTagChange = event => {
    setTag(event.target.value);
  };

  const handleMediumChange = event => {
    setMedium(event.target.value);
  };

  const handleGeoLocationChange = event => {
    setGeoLocation(event.target.value);
  };

  const handleArtistOrCultureChange = event => {
    setArtistOrCulture(event.target.value);
  };

  const handleDateBeginChange = event => {
    setDateBegin(event.target.value);
  }

    const handleDateEndChange = event => {
    setDateEnd(event.target.value);
    }

  const handleFormSubmit = event => {
    event.preventDefault();
    searchCollection();
  };

  return (
    <>
    <Header />
    <div className={s.search_container}>
      <h2 className={s.title}>Advanced Search</h2>
      <form className={`${s.searchform} ${s.bg}`} onSubmit={handleFormSubmit}>
        
        <div className={s.flex}>
          <div>
            <div>
            <label htmlFor="hasImages">Has Images:</label>
            <input type="checkbox" id="hasImages" checked={hasImages} onChange={handleHasImagesChange} />
          </div>
          <div>
            <label htmlFor="isHighlight">Is Highlight:</label>
              <input type="checkbox" id="isHighlight" checked={isHighlight} onChange={handleIsHighlightChange} />
          </div>
          <div>
              <label htmlFor="artistOrCulture">ArtistOrCulture:</label>
              <input type="checkbox" id="artistOrCulture" value={artistOrCulture} onChange={handleArtistOrCultureChange} />
          </div>
          <div>
              <label htmlFor="isOnView">Is On View:</label>
              <input type="checkbox" id="isOnView" checked={isOnView} onChange={handleIsOnViewChange} />
          </div>
          
          <div>
              <label htmlFor="tag">Tag:</label>
              <input type="checkbox" id="tag" value={tag} onChange={handleTagChange} />
          </div>
          </div>
          <div>
          <div>
          <label htmlFor="q">Keywords:</label>
          <input type="text" id="q" value={q} onChange={handleQChange} placeholder="Paint,sculpture ..." required/>
        </div>
            <div>
            <label htmlFor="medium">Medium:</label>
            <input type="text" id="medium" value={medium} onChange={handleMediumChange} placeholder="Oil on canvas, Watercolor, ..." />
        </div>
        <div>
            <label htmlFor="geoLocation">GeoLocation:</label>
            <input type="text" id="geoLocation" value={geoLocation} onChange={handleGeoLocationChange} placeholder="Europe, China ..." />
        </div>
        <div>
            <label htmlFor="departmentId">Department IDs:</label>
            <input type="text" id="departmentId" value={departmentId} onChange={handleDepartmentIdChange} placeholder="1, 2, [...], 19"/>
        </div>
        <div>
            <label htmlFor="dateBegin">Date Begin:</label>
            <input type="text" id="dateBegin" value={dateBegin} onChange={handleDateBeginChange} placeholder="Start year"/>
        </div>

        <div>
            <label htmlFor="dateEnd">Date End:</label>
            <input type="text" id="dateEnd" value={dateEnd} onChange={handleDateEndChange} placeholder="End date" />
        </div>
          </div>
        </div>

      <button type="submit">Search</button>
        
        
            
    </form>
    
</div>
</>
);
};
