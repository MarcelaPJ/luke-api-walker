import axios from "axios";
import React, { useState, useEffect } from "react"; //->useEffect para traer la info cuando se carga el componente.
import { useParams } from "react-router";
import obi from '../obi.gif';

const Films = (props) => {
    const [apiData,setApiData] = useState({}); //->establece la respuesta de la API a un objeto
    const [isError, setIsError] = useState(false);
    const  { id } = useParams(); //->obtiene el id de la url

    useEffect(() => {
        axios.get(`https://swapi.dev/api/films/${id}`)
        .then((response) => {
            setIsError(false);
            console.log(response.data);                        
            setApiData(response.data); //->establece los datos en la variable de estado(state)
        })

        .catch((err) => {
            console.log(err);
            setIsError(true);
        });

    }, [id]); //->el segundo argumento es un array de dependencias, si se deja vacio, se ejecuta solo una vez, si se le pasa un valor, se ejecuta cada vez que el valor cambie.

    if (!isError){ //->si no hay error, muestra la info
        return (
            <div>
                <h1>{apiData.title}</h1>
                <p>Release date: {apiData.release_date}</p>
                <p>Director: {apiData.director}</p>
                <p>Episode id: {apiData.episode_id}</p>
                <p>Characters: {apiData.characters}</p>
            </div>
        );
    } else { //->si hay error, muestra un mensaje
        return (
            <>
            <h1>"Estos no son los droides que está buscando"</h1>
            <img src={obi} alt="Obi Wan" />
            </>
        )
    }
};

export default Films;