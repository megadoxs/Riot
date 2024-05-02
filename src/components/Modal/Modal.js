import styles from './Modal.module.css';

import { useState, useEffect } from 'react';

export default function Clickable_Card({prptype, element, isModalOpen, setIsModalOpen}){

    const [version, setVersion] = useState();
    const [ability, setAbility] = useState(0)

    useEffect(() => {
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(response => response.json())
        .then(versions => setVersion(versions[0]))
    }, [])

    return(
        <div className = {styles.wrapper} onClick={(e) => { if (e.target === e.currentTarget && isModalOpen) setIsModalOpen(false) }}>
                <div className = {styles.content}>
                    <span className = {styles.close} onClick={() => setIsModalOpen(false)} >&times;</span>
                    { prptype === "abilities" &&
                        <div className = {styles.custom}>
                            <div>
                                <div className = {styles.icons}>
                                    <button onClick = {() => setAbility(0)} className = {styles.button}><img className = {styles.img} src = {`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${element.passive.image.full}`}/></button>
                                    <button onClick = {() => setAbility(1)} className = {styles.button}><img className = {styles.img} src = {`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${element.spells[0].image.full}`}/></button>
                                    <button onClick = {() => setAbility(2)} className = {styles.button}><img className = {styles.img} src = {`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${element.spells[1].image.full}`}/></button>
                                    <button onClick = {() => setAbility(3)} className = {styles.button}><img className = {styles.img} src = {`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${element.spells[2].image.full}`}/></button>
                                    <button onClick = {() => setAbility(4)} className = {styles.button}><img className = {styles.img} src = {`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${element.spells[3].image.full}`}/></button>
                                </div>
                                <div>
                                    {ability === 0 &&
                                        <div>
                                            <p>Passive</p>
                                            <p>{element.passive.name}</p>
                                            <p>{element.passive.description.replace(/<[^>]+>/g, "").replace(/\.(?!\s)/g, ". ")}</p>
                                        </div>    
                                    }
                                    {ability === 1 &&
                                        <div>
                                            <p>Q</p>
                                            <p>{element.spells[0].name}</p>
                                            <p>{element.spells[0].description.replace(/<[^>]+>/g, "").replace(/\.(?!\s)/g, ". ")}</p>
                                        </div>    
                                    }
                                    {ability === 2 &&
                                        <div>
                                            <p>W</p>
                                            <p>{element.spells[1].name}</p>
                                            <p>{element.spells[1].description.replace(/<[^>]+>/g, "").replace(/\.(?!\s)/g, ". ")}</p>
                                        </div>    
                                    }
                                    {ability === 3 &&
                                        <div>
                                            <p>E</p>
                                            <p>{element.spells[2].name}</p>
                                            <p>{element.spells[2].description.replace(/<[^>]+>/g, "").replace(/\.(?!\s)/g, ". ")}</p>
                                        </div>     
                                    }
                                    {ability === 4 &&
                                        <div>
                                            <p>R</p>
                                            <p>{element.spells[3].name}</p>
                                            <p>{element.spells[3].description.replace(/<[^>]+>/g, "").replace(/\.(?!\s)/g, ". ")}</p>
                                        </div>    
                                    }
                                </div>    
                            </div>    
                            <div>
                                {ability === 0 &&
                                    <video autoPlay loop>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_P1.webm`} type="video/webm"/>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_P1.mp4`} type="video/mp4"/>
                                    </video>     
                                }
                                {ability === 1 &&
                                    <video autoPlay loop>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_Q1.webm`} type="video/webm"/>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_Q1.mp4`} type="video/mp4"/>
                                    </video>     
                                }
                                {ability === 2 &&
                                    <video autoPlay loop>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_W1.webm`} type="video/webm"/>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_W1.mp4`} type="video/mp4"/>
                                    </video>     
                                }
                                {ability === 3 &&
                                    <video autoPlay loop>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_E1.webm`} type="video/webm"/>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_E1.mp4`} type="video/mp4"/>
                                    </video>     
                                }
                                {ability === 4 &&
                                    <video autoPlay loop>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_R1.webm`} type="video/webm"/>
                                        <source src = {`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${("000" + element.key).slice(-4)}/ability_${("000" + element.key).slice(-4)}_R1.mp4`} type="video/mp4"/>
                                    </video>     
                                }
                            </div>
                        </div>
                    }
                </div>
            { prptype === "skins" //&&

            }
        </div>
    )
}