import axios from "axios";
import React, { useState, useEffect } from "react"; //->useEffect para traer la info cuando se carga el componente.
import { useParams } from "react-router";
import obi from '../obi.gif';

const Species = (props) => {
    const [apiData,setApiData] = useState({}); //->establece la respuesta de la API a un objeto
    const [isError, setIsError] = useState(false);
    const  { id } = useParams(); //->obtiene el id de la url

    useEffect(() => {
        axios.get(`https://swapi.dev/api/species/${id}`)
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
                <h1>{apiData.name}</h1>
                <p>Classification: {apiData.classification}</p>
                <p>Lenguage: {apiData.language}</p>
                <p>Designation: {apiData.designation}</p>
                <p>Homeworld: {apiData.homeworld}</p>
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

export default Species;