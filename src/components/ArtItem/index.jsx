import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from 'react-responsive-carousel'
import Spinner from 'react-bootstrap/Spinner';

function ArtItem() {
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?hasImage=True')
        .then(response => response.json())
        .then(data => {
            const objectIds = data.objectIDs.slice(208340, 208350);
            const promises = objectIds.map(objectId => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
            .then(response => response.json())
            .then(data => ({
                id: uuidv4(),
                objectID: data.objectID,
                title: data.title,
                artist: data.artistDisplayName,
                year: data.objectDate,
                image: data.primaryImage,
                objectType: data.objectName
            })));
            Promise.all(promises).then(objectsData => setObjects(objectsData));
            setLoading(true);
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {loading ? (
            <>
            <Carousel infiniteLoop autoPlay>
                {objects.map(object => (
                    <>
                    <div>
                        <Link to={`/results/${object.objectID}`}>
                        <h3>{object.title}</h3></Link>
                            <p>Auteur : {object.artist}</p>
                            <p>Année de création : {object.year}</p>
                            <p>Type d'oeuvre : {object.objectType}</p>
                    </div>
                    <div className='image'>
                        <img src={object.image} alt={object.title}/>
                    </div>
                    </>
                ))}
            </Carousel>
            </>
            ) : (
            <div>
                <Spinner animation="border" role="status" className={style.spinner}/> 
            </div>
            )}
        </div>
            
    );
}
export  {ArtItem};




