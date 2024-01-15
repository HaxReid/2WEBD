import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Header } from "../Header";

export function ItemDetails() {
    const [item, setItem] = useState([]);
    let params = useParams();

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${params.objectID}`)
            .then(response => response.json())
            .then(data => 
                setItem(data));
    }, [params.objectID]);

return (
    <>
    <Header />
    <div className={s.detailscontainer}>
        <div className={s.imgdiv}>
            <img className={s.primaryImage} src={item.primaryImage} alt={item.title} />
            <h2>{item.title}</h2>
        </div>
        
        <div className={s.specsdiv}>
            <ul>
                <li className={s.li}>Artist Name : {item.artistDisplayName}</li>
                <li className={s.li}>Date : {item.objectDate}</li>
                <li className={s.li}>Medium : {item.medium}</li>
                <li className={s.li}>Dimensions : {item.dimensions}</li>
                <li className={s.li}>Culture : {item.culture}</li>
                <li className={s.li}>Périod : {item.period}</li>
                <li className={s.li}>Répository : {item.repository}</li>
                <li className={s.li}>Classification : {item.classification}</li>
            </ul>
            <p>{item.rightsAndReproduction}</p>
        </div>
        
    </div>
    </>

);
}
