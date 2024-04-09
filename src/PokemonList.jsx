import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataForAllPokemon = async () => {
            try {
                if (!props.allPkmn) return;
                const newData = await Promise.all(
                    props.allPkmn.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return await res.json();
                    })
                );
                setPokemonData(newData);
                setIsLoading(false); // Data fetching is complete
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
            
            setFilteredData(filtered);
        }
    }, [props.searchInput, pokemonData, props.filter]);

    if (isLoading) {
        return <div className='loading-view'>Farfetch'ding
                        <span className='dot-1'>.</span>
                        <span className='dot-2'>.</span>
                        <span className='dot-3'>.</span>
                </div>;
    }
    
    return (
        <section className='pokemon--cards-wrapper'>
            {
                filteredData.map((pokemon, index) => (
                    <PokemonCard 
                        key={index}
                        {...pokemon} 
                        isViewPokemon={props.isViewPokemon}
                        view={props.view}
                        viewPokemonData={props.viewPokemonData}
                        setViewPokemonData={props.setViewPokemonData}
                    />
                ))
            }
        </section>
    );
}
