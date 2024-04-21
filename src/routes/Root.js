/*eslint-disable padded-blocks*/ //not working lol should disable the warning
import styles from './Root.module.css';
import league_banner from '../assets/League_Banner.png'

import Navbar from '../components/Navbar/Navbar';
import Clickable_Card from '../components/Clickable_Card/Clickable_Card';
import Search from '../components/Search/Search';

import { useState, useEffect } from 'react';
// page that will be loaded by the user on load
export default function Root() {

    const [champions, setChampions] = useState([]);
    const [filteredChampions, setFilteredChampions] = useState([]);
    const [search, setSearch] = useState("");

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
                                        return champion
                                    });
                                })
                                setChampions(champions);
                            })
                    })
            })    
    }, []);

    const [booleans, setBooleans] = useState([true, false, false])

    useEffect( () => {
        setFilteredChampions(champions.filter(champion => champion.name.toLowerCase().includes(search.toLowerCase())));
    }, [booleans, search, champions])


    return (
        <div class = {styles.wrapper}>
            <img alt = "lol_banner" src = {league_banner} class = {styles.logo}/>
            <Navbar prpbuttons = {[{name : "Home", link : "/"}, {name : "Champions", link : "/champion"}, {name : "Skins", link : "/skins"}, {name : "Download", link : "#Download"}]} class = {styles.navbar}/>
            <div class = {styles.champions}>
                <div class = {styles.search}>
                    <Search booleans = {booleans} setBooleans = {setBooleans} search = {search} setSearch = {setSearch}/>
                </div>
                <div class = {styles.cards}>
                    {filteredChampions.map((champion, i) =>
                        <Clickable_Card key = {i} prpchamp={champion} prpref={0}/>
                    )}
                </div>
            </div>
        </div>
    )
}