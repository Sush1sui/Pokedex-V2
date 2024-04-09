import React, {useState} from "react";

export default function ViewPokemon(props) {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const pokemonData = props.viewPokemonData

    function capitalizeFirstName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function playCry() {
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`;
        audio.volume = 0.1;
        
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
                            <td className="multiple-val-td">
                                {pokemonData.abilities.map((pkmnAbility, index) => (
                                    <div>
                                        {capitalizeFirstName(pkmnAbility.ability.name).replace(/-/g, " ")}
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="multiple-val-td">
                                {
                                    <div className="pkmn-type">
                                        {pokemonData.types.map((pkmnType, index) => (
                                            <div className={`pkmn-${pkmnType.type.name}-type`}>
                                                {pkmnType.type.name.toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </td>
                            <td><button className="cry--btn" onClick={playCry}><b>Cry</b></button></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="right--view-pokemon">

            </section>
        </div>
    )
}