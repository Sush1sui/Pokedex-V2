import React, {useState} from "react";

export default function PokemonCard(props) {
    const [isLoading, setIsLoading] = useState(true)

    function capitalizeFirstName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function addClick() {
        
    }

    function handleImageLoad() {
        setIsLoading(false)
    }

    const handleViewPokemon = () => {
        props.isViewPokemon(!props.view)
        props.setViewPokemonData(props)
    }

    return(
        <div className="pokemon--card"
            onClick={handleViewPokemon}>
            {isLoading && <div className='loading-view'>Farfetch'ding
                        <span className='dot-1'>.</span>
                        <span className='dot-2'>.</span>
                        <span className='dot-3'>.</span>
                        </div>}
            <img className="pokemon--card-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt={`${props.name}-photo`} onLoad={handleImageLoad} />
            <h5>{`#${props.id} ${capitalizeFirstName(props.name)}`}</h5>
        </div>
    )
}