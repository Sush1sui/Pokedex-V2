import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header';
import PokemonList from './PokemonList';
import ViewPokemon from './ViewPokemon';

function MainPage() {
    const [AllPokemon, setAllPokemon] = useState(null)
    const [filter, setFilter] = useState('asc-num')
    const [searchInput, setSearchInput] = useState('')
    const [viewPokemon, setViewPokemon] = useState(false)
    const [viewPokemonData, setViewPokemonData] = useState(null)

    useEffect(() => {
        async function fetchAllPkmn() {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0')
                const data = await res.json()
                setAllPokemon(data.results)         
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllPkmn()
    }, [])

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter)
    }

    const handleSearch = (search) => {
        setSearchInput(search)
    }

    const handleIsViewPokemon = (view) => {
        setViewPokemon(view)
    }

    const handleViewPokemonData = (data) => {
        setViewPokemonData(data)
    }

    return (
        <main>
            <Header onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    searchInput={searchInput}
            />
            {
                viewPokemon ?
                <ViewPokemon 
                    isViewPokemon={handleIsViewPokemon}
                    view={viewPokemon}
                    viewPokemonData={viewPokemonData}
                    setViewPokemonData={handleViewPokemonData}
                />
                :
                <PokemonList allPkmn={AllPokemon}
                        filter={filter} 
                        searchInput={searchInput}
                        isViewPokemon={handleIsViewPokemon}
                        view={viewPokemon}
                        viewPokemonData={viewPokemonData}
                        setViewPokemonData={handleViewPokemonData}
                />
            }
        </main>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainPage />)