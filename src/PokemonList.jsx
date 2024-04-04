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
                        return await res.json();
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
            let filtered = pokemonData.filter(pokemon => {
                return pokemon.name.startsWith(props.searchInput) || pokemon.id.toString().startsWith(props.searchInput);
            });

            switch (props.filter) {
                case 'asc-num':
                    filtered = [...filtered].sort((a, b) => a.id - b.id)
                    break;
                case 'desc-num':
                    filtered = [...filtered].sort((a, b) => b.id - a.id)
                    break;
                case 'asc-name':
                    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
                    break;
                case 'desc-name':
                    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))
                    break;
                default:
                    break;
            }
            
            // if(props.filter === 'asc-num') {
            //     filtered = [...filtered].sort((a, b) => a.id - b.id)
            // } else if (props.filter === 'desc-num') {
            //     filtered = [...filtered].sort((a, b) => b.id - a.id)
            // } else if (props.filter === 'asc-name') {
            //     filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
            // } else if (props.filter === 'desc-name') {
            //     filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))
            // }
            setFilteredData(filtered);
        }
    }, [props.searchInput, pokemonData, props.filter]);

    console.log(filteredData)
    
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
