import React from "react";
import searchIcon from '/search.svg'

export default function Header(props) {

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;

        props.onFilterChange(selectedFilter)
    }

    const handleSearch = (event) => {
        props.onSearch(event.target.value)
    }

    return(
        <header className="">

            {!props.view && <div className="search--wrapper">
                <img src={searchIcon} />
                <input type="text"
                        placeholder="Search Pokemon"
                        id="search--pkmn" 
                        onChange={handleSearch}
                        value={props.searchInput}
                />
            </div>}
            
            {!props.view ? <a className="header--title" href="/">
                <h1>POKEDEX</h1>
            </a> :  <a className="header--title" href="/">
                        <h1>BACK</h1>
                    </a>
            }

            {!props.view && <select name="filter--pkmn" id="filter--pkmn" onChange={handleFilterChange} >
                <option value="asc-num">Number - Ascending</option>
                <option value="desc-num">Number - Descending</option>
                <option value="asc-name">Name - Ascending</option>
                <option value="desc-name">Name - Descending</option>
            </select>}

        </header>
    )
}