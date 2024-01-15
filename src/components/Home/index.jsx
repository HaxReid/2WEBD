import { Header } from "../Header";
import React from 'react';
import { ArtItem } from "../ArtItem";
import style from './style.module.css';

export function Home () {
  return (
    <body>
      <header>
        <Header />
      </header>
        <div>
          <h1 className={style.title}>Nos oeuvres vedettes </h1>
          
          <ArtItem />
        </div>
    </body>
  );
};