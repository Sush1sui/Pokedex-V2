import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header';
import PokemonList from './PokemonList';

function MainPage() {
    const [AllPokemon, setAllPokemon] = useState(null)
    const [filter, setFilter] = useState('asc-num')
    const [searchInput, setSearchInput] = useState('')
    const [isCoverPageVisible, setCoverPageVisible] = useState(true)
    const [animationTimeouts, setAnimationTimeouts] = useState([])

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

    const animateOpen = () => {
        const bars = document.querySelectorAll('.coverPageBar');
        const timeouts = [];

        bars.forEach((bar, index) => {
            const timeoutId = setTimeout(() => {
                bar.classList.add('remove-coverPage-animation');
            }, index * 200); // 0.5-second interval between each bar
            timeouts.push(timeoutId);
        });

        // Hide cover page after animation
        const hideTimeoutId = setTimeout(() => {
            setCoverPageVisible(false);
        }, 2000);

        setAnimationTimeouts([...timeouts, hideTimeoutId]);
    };

    // console.log(searchInput)

    return (
        <main>
            {
                isCoverPageVisible &&
                <div className='coverPage' onClick={animateOpen}>
                    <div className='coverPageBar coverPageBar-1'></div>
                    <div className='coverPageBar coverPageBar-2'></div>
                    <div className='coverPageBar coverPageBar-3'>CLICK TO OPEN</div>
                    <div className='coverPageBar coverPageBar-4'></div>
                    <div className='coverPageBar coverPageBar-5'></div>
                </div>
            }
            <Header onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    searchInput={searchInput}
            />
            <PokemonList allPkmn={AllPokemon}
                        filter={filter} 
                        searchInput={searchInput}
            />
        </main>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainPage />)