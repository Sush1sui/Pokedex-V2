import React, {useState} from "react";

export default function PokemonCard(props) {
    const [cardClicked, setCardClicked] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    function capitalizeFirstName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function addClick() {
        setCardClicked(prev => prev+1)
    }

    function handleImageLoad() {
        setIsLoading(false)
    }

    return(
        <div className="pokemon--card" onClick={addClick}>
            {isLoading && <p>Loading...</p>}
            <img className="pokemon--card-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt={`${props.name}-photo`} onLoad={handleImageLoad} />
            <h5>{`#${props.id} ${capitalizeFirstName(props.name)}`}</h5>
        </div>
    )
}