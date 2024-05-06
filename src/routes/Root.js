/*eslint-disable padded-blocks*/ //not working lol should disable the warning
import styles from './Root.module.css';
import league_banner from '../assets/League_Banner.png'

import Navbar from '../components/Navbar/Navbar';
import Automatic_Card from '../components/Automatic_Card/Automatic_Card';
import Searchable_Cards from '../components/Searchable_Cards/Searchable_Cards';

import { useState, useEffect } from 'react';
// page that will be loaded by the user on load
export default function Root() {

    const [page, setPage] = useState("Home");
    const [champions, setChampions] = useState([]);
    const [skins, setSkins] = useState([]);
    const [skinLines, setSkinLines] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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
                                    champions.map(champion => {
                                        champion.price = data[`${champion.id}`].price
                                        champion.releaseDate = data[`${champion.id}`].releaseDate
                                        champion.roles = data[`${champion.id}`].roles
                                        champion.positions = data[`${champion.id}`].positions
                                        champion.difficulty = data[`${champion.id}`].attributeRatings.difficulty
                                        champion.skins.forEach((skin, j) => {
                                            let index = data[`${champion.id}`].skins.findIndex(skin => skin.id == parseInt(champion.skins[j].id));
                                            if (index === -1)
                                                skin.price = 'Special'
                                            else {
                                                skin.price = data[`${champion.id}`].skins[index].cost;
                                                skin.set = data[`${champion.id}`].skins[index].set
                                                skin.releaseDate = data[`${champion.id}`].skins[index].release
                                                skin.rarity = data[`${champion.id}`].skins[index].rarity
                                                if (data[`${champion.id}`].skins[index].set.length > 0 && !skinLines.includes(data[`${champion.id}`].skins[index].set[0]))
                                                    skinLines.push(data[`${champion.id}`].skins[index].set[0])
                                            }
                                        });
                                        return champion
                                    });
                                })
                                setChampions(champions);
                                // will eventually make prestige skins last of their category 
                                setSkins(champions.flatMap(champion => champion.skins.filter(skin => skin.num !== 0).map(skin => ({...champion, skin: skin})).filter(Boolean)).sort((a, b) => a.skin.name.toLowerCase().localeCompare(b.skin.name.toLowerCase())).map(champion => {delete champion.skins; return champion}))
                            })
                    })
            })  
    }, []);

    return (
        <div className = {styles.wrapper}>
            <img alt = "lol_banner" src = {league_banner} className = {styles.logo}/>
            <img alt = "lol_banner" src = {league_banner} className = {styles.fill}/>
            <Navbar prpbuttons = {[{name : "Home", value : "Home", state: setPage}, {name : "Champions", value : "Champions", state: setPage}, {name : "Skins", value : "Skins", state: setPage}, {name : "Download", value : "#Download"}]} className = {styles.navbar}/>
            {page === "Home" &&
                <div>
                    <div className={styles.displayChampions}>
                        <h2 className={styles.title}>Champions</h2>
                        {champions.length > 0 &&
                            <Automatic_Card modalOpen = {modalOpen} setModalOpen = {setModalOpen} prpimg={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${array[displaying].id}_0.jpg"} array={champions}/>
                        }
                    </div>
                    <div className={styles.displaySkins}>
                        <h2 className={styles.title}>Skins</h2>
                        {skins.length > 0 &&
                            <Automatic_Card modalOpen = {modalOpen} setModalOpen = {setModalOpen} prpimg={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${array[displaying].id}_${array[displaying].skin.num}.jpg"} array={skins}/>
                        }
                    </div>
                </div>
            }
            {page === "Champions" &&
                <Searchable_Cards cards = {champions} displayName = {"${card.name}"} searchs = {["name", "id"]} img = {"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.id}_0.jpg"} filters = {[{name: "Roles", path: "roles", multiple: true, options: [{name: "Fighters", value: "FIGHTER"}, {name: "Juggernauts", value: "JUGGERNAUT"}, {name: "Tanks", value: "TANK"}, {name: "Assassins", value: "ASSASSIN"}, {name: "Bursts", value: "BURST"}, {name: "Mages", value: "MAGE"}, {name: "Marksmans", value: "MARKSMAN"}, {name : "Supports", value: "SUPPORT"}, {name: "Vanguards", value: "VANGUARD"}, {name: "Battle Mages", value: "BATTLEMAGE"}, {name: "Specialists", value: "SPECIALIST"}, {name : "Catchers", value: "CATCHER"}, {name : "Skirmishers", value: "SKIRMISHER"}, {name: "Wardens", value: "WARDEN"}, {name: "Divers", value: "DIVER"}, {name: "Artilleries", value: "ARTILLERY"}, {name : "Enchanters", value: "ENCHANTER"}]}, {name: "Position", path: "positions", multiple: false, options: [{name: "Tops", value: "TOP"}, {name: "Jungles", value: "JUNGLE"}, {name: "Middles", value: "MIDDLE"}, {name: "Bottoms", value: "BOTTOM"}, {name: "Supports", value: "SUPPORT"}]}, {name: "Difficulty", path: "difficulty", incompatible: 2, multiple: false, options: [{name: "Easy", value: 1}, {name: "Medium", value: 2}, {name: "Hard", value: 3}]}]} sorters = {[{name: "Price: ", path: "price.blueEssence"}, {name: "Release Date: ", path: "releaseDate"}, {name: "Difficulty: ", path: "difficulty", incompatible: 2}]}/>
            }
            {page === "Skins" &&
                <Searchable_Cards cards = {skins} displayName = {"${card.skin.name}"} searchs = {["skin.name", "name", "id", "skin.set.0"]} img = {"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.id}_${card.skin.num}.jpg"} filters = {[{name: "Champions", path: "id", multiple: false, options: champions.map(champion => ({name: champion.name, value: champion.id}))}, {name: "Skins Lines", path: "skin.set", multiple: false, options: skinLines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map(skinLine => ({name: skinLine, value: skinLine}))}, {name: "Rarity", path: "skin.rarity", multiple: false, options: [{name: "Common", value: "NoRarity"},{name : "Epic", value: "Epic"},{name : "Legendary", value: "Legendary"},{name : "Ultimate", value: "Ultimate"},{name : "Mythic", value: "Mythic"}]}]} sorters={[{name: "Price: ", path: "skin.price"}, {name: "Release Date: ", path: "skin.releaseDate"}]}/>
            }
        </div>
    )
}