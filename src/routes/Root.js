/*eslint-disable padded-blocks*/ //not working lol should disable the warning
import styles from './Root.module.css';
import league_banner from '../assets/League_Banner.png'

import Navbar from '../components/Navbar/Navbar';
import Clickable_Card from '../components/Clickable_Card/Clickable_Card';
import Search from '../components/Search/Search';

import { useState, useEffect } from 'react';
// page that will be loaded by the user on load
export default function Root() {

    const [page, setPage] = useState("Home");
    const [champions, setChampions] = useState([]);
    const [championDisplayed, setChampionDisplayed] = useState(0);
    const [searchedChampions, setSearchedChampions] = useState([]);

    // champion ability url https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${key}/ability_0${key}_R1.webm
    useEffect(() => {
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(response => response.json())
            .then(versions => {
                fetch(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion.json`)
                    .then(response => response.json())
                    .then(data => {
                        const championPromises = Object.values(data.data).map(element =>
                            fetch(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion/${element.id}.json`)
                                .then(response => response.json())
                                .then(data => Object.values(data)[3][element.id])
                        );
        
                        Promise.all(championPromises)
                            .then(champions => {
                                fetch('https://raw.githubusercontent.com/megadoxs/cdn-riot/main/champions.json')
                                .then(response => response.json())
                                .then(data => {
                                    champions.map((champion, i) => {champion.skins.forEach((skin, j) => {
                                        let index = data[Object.keys(data).find(key => key === champion.id)].skins.findIndex(skin => parseInt(skin.id) === champions[i].skins[j].id);
                                        if (index === -1)
                                            skin.price = 'Special'
                                        else 
                                            skin.price = data[Object.keys(data).find(key => key === champion.id)].skins[index].cost;
                                        });
                                        return champion
                                    });
                                    champions.map(champion => {
                                        champion.price = data[Object.keys(data).find(key => key === champion.id)].price
                                        champion.releaseDate = data[Object.keys(data).find(key => key === champion.id)].releaseDate
                                        champion.roles = data[Object.keys(data).find(key => key === champion.id)].roles
                                        champion.positions = data[Object.keys(data).find(key => key === champion.id)].positions
                                        champion.difficulty = data[Object.keys(data).find(key => key === champion.id)].attributeRatings.difficulty
                                        return champion
                                    });
                                })
                                setChampions(champions);
                                setSearchedChampions(champions);
                            })
                    })
            })    
    }, []);

    return (
        <div className = {styles.wrapper}>
            <img alt = "lol_banner" src = {league_banner} className = {styles.logo}/>
            <img alt = "lol_banner" src = {league_banner} className = {styles.fill}/>
            <Navbar prpbuttons = {[{name : "Home", link : "/"}, {name : "Champions", link : "/champion"}, {name : "Skins", link : "/skins"}, {name : "Download", link : "#Download"}]} className = {styles.navbar}/>
            {page === "Home" &&
                <div>
                    <div>
                        <h2>Champions</h2>
                        <div>
                            {/*should add +1 to the value every 10s or onClick*/}
                            { champions.length > 0 &&
                                <Clickable_Card prpchamp={champions[championDisplayed]} prpimg = {`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions[championDisplayed].id}_0.jpg`} displayName = {false}/>
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Skins</h2>
                        <div>
                            
                        </div>
                    </div>
                </div>
            }
            {page === "Champions" &&
                <div className = {styles.champions}>
                    <div className = {styles.search}>
                        <Search setSearchedChampions = {setSearchedChampions} champions = {champions} filters = {[{name: "Roles", path: "roles", multiple: true, options: [{name: "Fighters", value: "FIGHTER"}, {name: "Juggernauts", value: "JUGGERNAUT"}, {name: "Tanks", value: "TANK"}, {name: "Assassins", value: "ASSASSIN"}, {name: "Bursts", value: "BURST"}, {name: "Mages", value: "MAGE"}, {name: "Marksmans", value: "MARKSMAN"}, {name : "Supports", value: "SUPPORT"}, {name: "Vanguards", value: "VANGUARD"}, {name: "Battle Mages", value: "BATTLEMAGE"}, {name: "Specialists", value: "SPECIALIST"}, {name : "Catchers", value: "CATCHER"}, {name : "Skirmishers", value: "SKIRMISHER"}, {name: "Wardens", value: "WARDEN"}, {name: "Divers", value: "DIVER"}, {name: "Artilleries", value: "ARTILLERY"}, {name : "Enchanters", value: "ENCHANTER"}]}, {name: "Position", path: "positions", multiple: false, options: [{name: "Tops", value: "TOP"}, {name: "Jungles", value: "JUNGLE"}, {name: "Middles", value: "MIDDLE"}, {name: "Bottoms", value: "BOTTOM"}, {name: "Supports", value: "SUPPORT"}]}, {name: "Difficulty", path: "difficulty", incompatible: 2, multiple: false, options: [{name: "Easy", value: 1}, {name: "Medium", value: 2}, {name: "Hard", value: 3}]}]} sorters = {[{name: "Price: ", path: "price.blueEssence"}, {name: "Release Date: ", path: "releaseDate"}, {name: "Difficulty: ", path: "difficulty", incompatible: 2}]}/>
                    </div>
                    <div className = {styles.cards}>
                        {searchedChampions.map((champion, i) =>
                            <Clickable_Card key = {i} prpchamp={champion} prpimg = {`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`} displayName = {true}/>
                        )}
                    </div>
                </div>
            }
            {page === "Skins" &&
                <div className = {styles.champions}>
                    <div className = {styles.search}>
                        <Search setSearchedChampions = {setSearchedChampions} champions = {champions} filters = {[{name: "Roles", path: "roles", multiple: true, options: [{name: "Fighters", value: "FIGHTER"}, {name: "Juggernauts", value: "JUGGERNAUT"}, {name: "Tanks", value: "TANK"}, {name: "Assassins", value: "ASSASSIN"}, {name: "Bursts", value: "BURST"}, {name: "Mages", value: "MAGE"}, {name: "Marksmans", value: "MARKSMAN"}, {name : "Supports", value: "SUPPORT"}, {name: "Vanguards", value: "VANGUARD"}, {name: "Battle Mages", value: "BATTLEMAGE"}, {name: "Specialists", value: "SPECIALIST"}, {name : "Catchers", value: "CATCHER"}, {name : "Skirmishers", value: "SKIRMISHER"}, {name: "Wardens", value: "WARDEN"}, {name: "Divers", value: "DIVER"}, {name: "Artilleries", value: "ARTILLERY"}, {name : "Enchanters", value: "ENCHANTER"}]}, {name: "Position", path: "positions", multiple: false, options: [{name: "Tops", value: "TOP"}, {name: "Jungles", value: "JUNGLE"}, {name: "Middles", value: "MIDDLE"}, {name: "Bottoms", value: "BOTTOM"}, {name: "Supports", value: "SUPPORT"}]}, {name: "Difficulty", path: "difficulty", incompatible: 2, multiple: false, options: [{name: "Easy", value: 1}, {name: "Medium", value: 2}, {name: "Hard", value: 3}]}]} sorters = {[{name: "Price: ", path: "price.blueEssence"}, {name: "Release Date: ", path: "releaseDate"}, {name: "Difficulty: ", path: "difficulty", incompatible: 2}]}/>
                    </div>
                    <div className = {styles.cards}>
                        {searchedChampions.map((champion, i) =>
                            <Clickable_Card key = {i} prpchamp={champion} prpimg = {`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`} displayName = {true}/>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}