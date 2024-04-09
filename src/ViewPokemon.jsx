import React, {useState, useEffect} from "react";
import arrowLeft from '/arrow-left.png'
import arrowRight from '/arrow-right.png'

export default function ViewPokemon(props) {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
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

    useEffect(()=> {
        const fetchPkmnSpeciesData = async() => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
                const data = await res.json()

                setPokemonSpeciesData(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPkmnSpeciesData()
    }, [])

    console.log(pokemonSpeciesData)

    if(!pokemonSpeciesData) {
        return <div className='loading-view'>Loading
                        <span className='dot-1'>.</span>
                        <span className='dot-2'>.</span>
                        <span className='dot-3'>.</span>
                </div>;
    }

    return(
        <div className="view--pokemon-wrapper">
            <div className="arrow-wrapper">
                <button className="arrows">
                    <img src={arrowLeft} />
                </button>
                
                <button className="arrows">
                    <img src={arrowRight} />
                </button>
            </div>

            <section className="deets">
                
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
                                <td><h3>Abilities</h3></td>
                                <td className="multiple-val-td">
                                    {
                                        <div className="abilities">
                                            {pokemonData.abilities.map((pkmnAbility, index) => (
                                                <div key={index}>
                                                    {capitalizeFirstName(pkmnAbility.ability.name).replace(/-/g, " ")}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="multiple-val-td">
                                    {
                                        <div className="pkmn-type">
                                            {pokemonData.types.map((pkmnType, index) => (
                                                <div className={`pkmn-${pkmnType.type.name}-type`} key={index}>
                                                    {pkmnType.type.name.toUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </td>
                                <td><button className="cry--btn" onClick={playCry}><b>Cry</b></button></td>
                            </tr>
                            <tr>
                                <td><b>Height: </b>{pokemonData.height/10}m</td>
                                <td><b>Weight: </b>{pokemonData.weight/10}kg</td>
                            </tr>
                            <tr>
                                <td><b>Egg Group</b></td>
                                <td>
                                    {pokemonData && pokemonSpeciesData &&
                                        <div className="egg-groups">
                                            {pokemonSpeciesData.egg_groups.map((eggGroup, index) => (
                                                <div key={index}>
                                                    {capitalizeFirstName(eggGroup.name)}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="right--view-pokemon">

                </section>
            </section>
        </div>
    )
}