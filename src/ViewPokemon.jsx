import React, {useState} from "react";

export default function ViewPokemon(props) {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const pokemonData = props.viewPokemonData

    function capitalizeFirstName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function playCry() {
        const audio=new Audio();
        audio.src=`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`
    }

    function playCry() {
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`;
        
        isAudioPlaying ? audio.pause() : audio.play()

        setIsAudioPlaying(!isAudioPlaying);
    }

    return(
        <div className="view--pokemon-wrapper">
            
            <section className="left--view-pokemon">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`} alt={`${pokemonData.name} photo`} className="view--img" />
                <table className="table--left">
                    <thead>
                        <tr className="table--title">
                            <td colSpan={2}><h1>{capitalizeFirstName(pokemonData.name)}</h1></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Abilities</td>
                            <td className="data-td">{pokemonData.abilities.map((pkmnAbility, index) => (
                                    <React.Fragment key={index}>
                                        {capitalizeFirstName(pkmnAbility.ability.name).replace(/-/g, " ")}
                                        {index < pokemonData.abilities.length - 1 && <br /> && <br />}
                                    </React.Fragment>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td><button className="cry--btn" onClick={playCry}><b>Cry</b></button></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="right--view-pokemon">

            </section>
        </div>
    )
}