import styles from './Root.module.css';
import valorant_banner from '../assets/Valorant_Banner.png'

import Navbar from '../components/Navbar/Navbar';
import Automatic_Card from '../components/Automatic_Card/Automatic_Card';
import Searchable_Cards from '../components/Searchable_Cards/Searchable_Cards';

import { useState, useEffect } from 'react';

export default function Valorant(){

    const [page, setPage] = useState("Home");
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <img alt = "val_banner" src = {valorant_banner} className = {styles.logo}/>
            <img alt = "val_banner" src = {valorant_banner} className = {styles.fill}/>
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
        </div>
    )
}