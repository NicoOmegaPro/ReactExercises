import { useState } from 'react';
import { useEffect } from 'react';
import CountryContext from './CountryContext'

export default function CountryState(props){
    const [countries, setCountries] = useState([]);

    const getCountries = async() => {
        const response = await fetch('/data/countries.json');
        const data = await response.json();
        setCountries(data);
    }

    useEffect(function(){
        getCountries();
    }, []);

    return (
        <CountryContext.Provider value={countries}>
            {props.children}
        </CountryContext.Provider>
    )
}