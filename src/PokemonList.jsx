import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchDataForAllPokemon = async () => {
            try {
                const newData = await Promise.all(
                    props.allPkmn.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );
                setPokemonData(newData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataForAllPokemon();
    }, [props.allPkmn]);

    useEffect(() => {
        if (pokemonData.length > 0) {
            const filtered = pokemonData.filter(pokemon => {
                return pokemon.name.startsWith(props.searchInput) || pokemon.id.toString().startsWith(props.searchInput);
            });
            setFilteredData(filtered);
        }
    }, [props.searchInput, pokemonData]);

    return (
        <section className='pokemon--cards-wrapper'>
            {
                filteredData.map((pokemon, index) => (
                    <PokemonCard 
                        key={index}
                        {...pokemon} />
                ))
            }
        </section>
    );
}
