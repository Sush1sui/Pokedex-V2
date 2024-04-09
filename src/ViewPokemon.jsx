import React, {useState, useEffect} from "react";
import arrowLeft from '/arrow-left.png'
import arrowRight from '/arrow-right.png'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function ViewPokemon(props) {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonId, setPokemonId] = useState(props.viewPokemonData.id);
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [evolutionChart, setEvolutionChart] = useState(null)
    
    useEffect(() => {
        const fetchPokemonData = async () => {
            setPokemonData(null)
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const data = await res.json();
            setPokemonData(data);
        };

        fetchPokemonData();
    }, [pokemonId]);

    useEffect(() => {
        const fetchPkmnSpeciesData = async () => {
            setPokemonSpeciesData(null)
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
                const data = await res.json();
                
                setPokemonSpeciesData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPkmnSpeciesData();
    }, [pokemonId]);

    useEffect(()=> {
        if (!pokemonSpeciesData) return;

        setEvolutionChart(null);
        const fetchEvolutionChart = async() => {
            try {
                const res = await fetch(pokemonSpeciesData.evolution_chain.url)
                const data = await res.json()

                setEvolutionChart(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchEvolutionChart()
    }, [pokemonSpeciesData])

    async function handlePokemonDataRender (pokemonName) {
        try {
            setPokemonData(null);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await res.json();
            setPokemonData(data);
            setPokemonId(data.id)
        } catch (error) {
            console.error(error)
        }
    }

    if (evolutionChart && evolutionChart.chain) {
        console.log(evolutionChart.chain);
    }

    function handleImageLoad() {
        setIsImageLoading(false)
    }
    function capitalizeFirstName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    function playCry() {
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`;
        audio.volume = 0.1;

        setIsAudioPlaying(prev => !prev);

        const handleAudioEnded = () => {
            setIsAudioPlaying(prev => !prev)
            audio.removeEventListener('ended', handleAudioEnded)
        }

        isAudioPlaying ? audio.pause() : audio.play();
        audio.addEventListener('ended', handleAudioEnded)
    }
    if (!pokemonSpeciesData || !pokemonData || !evolutionChart) {
        return (
            <div className='loading-view'>Farfetch'ding
                <span className='dot-1'>.</span>
                <span className='dot-2'>.</span>
                <span className='dot-3'>.</span>
            </div>
        );
    }
    const goLeft = ()=> {
        setPokemonId(prev => prev - 1)
    }
    const goRight = ()=> {
        setPokemonId(prev => prev + 1)
    }

    const renderEvolutionChain = (chain) => {
        const { species, evolves_to } = chain;
        let evolutions = [];
    
        evolutions.push(
            <div key={species.name} className="evolution--stage" onClick={() => handlePokemonDataRender(species.name)}>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.url.split('/').slice(-2, -1)}.png`}
                    alt={`${capitalizeFirstName(species.name)} sprite`}
                />
                <h4>{capitalizeFirstName(species.name)}</h4>
            </div>
        );
    
        if (evolves_to && evolves_to.length > 0) {
            evolves_to.forEach((evolution, index) => {
                evolutions = evolutions.concat(renderEvolutionChain(evolution));
            });
        }
    
        return evolutions;
    };    

    return(
        <div className="view--pokemon-wrapper">
            <div className="arrow-wrapper">
                {pokemonData.id !== 1 && (
                    <button className="arrows arr-left" onClick={goLeft}>
                        <img src={arrowLeft} alt="Left arrow" />
                    </button>
                )}
                {pokemonData.id !== 721 && (
                    <button className="arrows arr-right" onClick={goRight}>
                        <img src={arrowRight} alt="Right arrow" />
                    </button>
                )}
            </div>

            <section className="deets">
                
                <section className="left--view-pokemon">
                    {isImageLoading && <div className='loading-view'>Farfetch'ding
                            <span className='dot-1'>.</span>
                            <span className='dot-2'>.</span>
                            <span className='dot-3'>.</span>
                            </div>}
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`} 
                        alt={`${pokemonData.name} photo`} 
                        className="view--img" 
                        onLoad={handleImageLoad} 
                    />
                    <table className="table--left">
                        <thead>
                            <tr className="table--title">
                                <td><h1>No. {pokemonData.id}</h1></td>
                                <td><h1>{capitalizeFirstName(pokemonData.name)}</h1></td>
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
                                    {<div className="egg-groups">
                                            {pokemonSpeciesData.egg_groups.map((eggGroup, index) => (
                                                <div key={index}>
                                                    {capitalizeFirstName(eggGroup.name).replace(/-/g, " ")}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>EV yield</b>
                                </td>
                                <td>
                                    {<div className="ev-yield">
                                            {pokemonData.stats.map((stat, index) => (
                                                <div key={index}>
                                                    {stat.effort > 0 && 
                                                        `${stat.effort} 
                                                        ${
                                                            stat.stat.name==='hp' ? 'HP':
                                                            stat.stat.name==='attack' ? 'ATK':
                                                            stat.stat.name==='defense' ? 'DEF':
                                                            stat.stat.name==='special-attack' ? 'SP. ATK' :
                                                            stat.stat.name==='special-defense' ? 'SP. DEF' :
                                                            stat.stat.name==='speed' ? 'SPEED' : ''
                                                        }`}
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
                    
                    <div className="evolution--wrapper">
                        <u><h1>Evolution Chart</h1></u>
                        {evolutionChart && (
                            <div className="evolution--pokemon">
                                {renderEvolutionChain(evolutionChart.chain)}
                            </div>
                        )}
                    </div>

                    <div className="base--stats-wrapper">
                        <u><h1>Base Stats</h1></u>
                        <section className="base--stats">
                            <div className="hp stat-wrapper">
                                <h4>HP</h4>
                                <p><b>{pokemonData.stats[0].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[0].base_stat < 30 ? 'low' :
                                    pokemonData.stats[0].base_stat >= 30 && pokemonData.stats[0].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[0].base_stat >= 50 && pokemonData.stats[0].base_stat < 90 ? 'med' :
                                    pokemonData.stats[0].base_stat >= 90 && pokemonData.stats[0].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[0].base_stat >= 120 && pokemonData.stats[0].base_stat < 150 ? 'high' : 'sup-high'
                                }`}

                                style={{
                                    width: `${pokemonData.stats[0].base_stat*0.2}%`
                                }}></div>
                            </div>
                            <div className="atk stat-wrapper">
                                <h4>ATK</h4>
                                <p><b>{pokemonData.stats[1].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[1].base_stat < 30 ? 'low' :
                                    pokemonData.stats[1].base_stat >= 30 && pokemonData.stats[1].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[1].base_stat >= 50 && pokemonData.stats[1].base_stat < 90 ? 'med' :
                                    pokemonData.stats[1].base_stat >= 90 && pokemonData.stats[1].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[1].base_stat >= 120 && pokemonData.stats[1].base_stat < 150 ? 'high' : 'sup-high'
                                }`}

                                style={{
                                    width: `${pokemonData.stats[1].base_stat*0.2}%`
                                }}></div>
                            </div>
                            <div className="def stat-wrapper">
                                <h4>DEF</h4>
                                <p><b>{pokemonData.stats[2].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[2].base_stat < 30 ? 'low' :
                                    pokemonData.stats[2].base_stat >= 30 && pokemonData.stats[2].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[2].base_stat >= 50 && pokemonData.stats[2].base_stat < 90 ? 'med' :
                                    pokemonData.stats[2].base_stat >= 90 && pokemonData.stats[2].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[2].base_stat >= 120 && pokemonData.stats[2].base_stat < 150 ? 'high' : 'sup-high'
                                }`}

                                style={{
                                    width: `${pokemonData.stats[2].base_stat*0.2}%`
                                }}></div>
                            </div>
                            <div className="sp-atk stat-wrapper">
                                <h4>Sp. Atk</h4>
                                <p><b>{pokemonData.stats[3].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[3].base_stat < 30 ? 'low' :
                                    pokemonData.stats[3].base_stat >= 30 && pokemonData.stats[3].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[3].base_stat >= 50 && pokemonData.stats[3].base_stat < 90 ? 'med' :
                                    pokemonData.stats[3].base_stat >= 90 && pokemonData.stats[3].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[3].base_stat >= 120 && pokemonData.stats[3].base_stat < 150 ? 'high' : 'sup-high'
                                }`}

                                style={{
                                    width: `${pokemonData.stats[3].base_stat*0.2}%`
                                }}></div>
                            </div>
                            <div className="sp-def stat-wrapper">
                                <h4>Sp. Def</h4>
                                <p><b>{pokemonData.stats[4].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[4].base_stat < 30 ? 'low' :
                                    pokemonData.stats[4].base_stat >= 30 && pokemonData.stats[4].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[4].base_stat >= 50 && pokemonData.stats[4].base_stat < 90 ? 'med' :
                                    pokemonData.stats[4].base_stat >= 90 && pokemonData.stats[4].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[4].base_stat >= 120 && pokemonData.stats[4].base_stat < 150 ? 'high' : 'sup-high'
                                }`}

                                style={{
                                    width: `${pokemonData.stats[4].base_stat*0.2}%`
                                }}></div>
                            </div>
                            <div className="speed stat-wrapper">
                                <h4>SPEED</h4>
                                <p><b>{pokemonData.stats[5].base_stat}</b></p>
                                <div className={`bar ${
                                    pokemonData.stats[5].base_stat < 30 ? 'low' :
                                    pokemonData.stats[5].base_stat >= 30 && pokemonData.stats[5].base_stat < 50 ? 'med-low' :
                                    pokemonData.stats[5].base_stat >= 50 && pokemonData.stats[5].base_stat < 90 ? 'med' :
                                    pokemonData.stats[5].base_stat >= 90 && pokemonData.stats[5].base_stat < 120 ? 'med-high' :
                                    pokemonData.stats[5].base_stat >= 120 && pokemonData.stats[5].base_stat < 150 ? 'high' : 'sup-high'
                                }`} 
                                
                                style={{
                                    width: `${pokemonData.stats[5].base_stat*0.2}%`
                                }}></div>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </div>
    )
}