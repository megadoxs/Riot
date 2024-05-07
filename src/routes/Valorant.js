import styles from './Root.module.css';
import valorant_banner from '../assets/Valorant_Banner.png'

import Navbar from '../components/Navbar/Navbar';
import Automatic_Card from '../components/Automatic_Card/Automatic_Card';
import Searchable_Cards from '../components/Searchable_Cards/Searchable_Cards';

import { useState, useEffect } from 'react';

export default function Valorant(){

    const [page, setPage] = useState("Home");
    const [modalOpen, setModalOpen] = useState(false);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        fetch(`https://valorant-api.com/v1/agents?isPlayableCharacter=true`)
            .then(response => response.json())
            .then(data => setAgents(Object.values(data)[1].map(agent => {
                fetch(`https://valorant-api.com/v1/playercards`)
                    .then (response => response.json())
                    .then (playerCards => {agent.card = Object.values(playerCards)[1].find(card => card.displayName === "VALORANT " + agent.displayName + " Card")})
                return agent
            })))
    }, []);

    return (
        <div>
            <img alt = "val_banner" src = {valorant_banner} className = {styles.logo}/>
            <img alt = "val_banner" src = {valorant_banner} className = {styles.fill}/>
            <Navbar prpbuttons = {[{name : "Home", value : "Home", state: setPage}, {name : "Agents", value : "Agents", state: setPage}, {name : "Weapons", value : "Weapons", state: setPage}, {name : "Download", value : "#Download"}]} className = {styles.navbar}/>
            {page === "Agents" &&
                <Searchable_Cards cards = {agents} displayName = {"${card.displayName}"} searchs = {["displayName"]} img = {"${card.card.largeArt}"} filters = {[{name: "Roles", path: "roles", multiple: true, options: [{name: "Fighters", value: "FIGHTER"}, {name: "Juggernauts", value: "JUGGERNAUT"}, {name: "Tanks", value: "TANK"}, {name: "Assassins", value: "ASSASSIN"}, {name: "Bursts", value: "BURST"}, {name: "Mages", value: "MAGE"}, {name: "Marksmans", value: "MARKSMAN"}, {name : "Supports", value: "SUPPORT"}, {name: "Vanguards", value: "VANGUARD"}, {name: "Battle Mages", value: "BATTLEMAGE"}, {name: "Specialists", value: "SPECIALIST"}, {name : "Catchers", value: "CATCHER"}, {name : "Skirmishers", value: "SKIRMISHER"}, {name: "Wardens", value: "WARDEN"}, {name: "Divers", value: "DIVER"}, {name: "Artilleries", value: "ARTILLERY"}, {name : "Enchanters", value: "ENCHANTER"}]}, {name: "Position", path: "positions", multiple: false, options: [{name: "Tops", value: "TOP"}, {name: "Jungles", value: "JUNGLE"}, {name: "Middles", value: "MIDDLE"}, {name: "Bottoms", value: "BOTTOM"}, {name: "Supports", value: "SUPPORT"}]}, {name: "Difficulty", path: "difficulty", incompatible: 2, multiple: false, options: [{name: "Easy", value: 1}, {name: "Medium", value: 2}, {name: "Hard", value: 3}]}]} sorters = {[{name: "Price: ", path: "price.blueEssence"}, {name: "Release Date: ", path: "releaseDate"}, {name: "Difficulty: ", path: "difficulty", incompatible: 2}]}/>
            }
        </div>
    )
}