import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header';
import PokemonList from './PokemonList';

function MainPage() {
    const [AllPokemon, setAllPokemon] = useState(null);
    const [filter, setFilter] = useState('asc-num')
    const [searchInput, setSearchInput] = useState('')

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

    // console.log(searchInput)

    return(
        <main>
            <Header onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    searchInput={searchInput}
            />
            {AllPokemon !== null ? 
            <PokemonList allPkmn={AllPokemon}
                        filter={filter} 
                        searchInput={searchInput}

            /> : <div>Loading...</div>}
            <footer>
                <h4>Sush1sui</h4>
            </footer>
        </main>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainPage />)