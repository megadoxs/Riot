import styles from './Clickable_card.module.css';

import Modal from '../Modal/Modal.js'

import { useState, useEffect } from 'react';

export default function Clickable_Card({prpchamp, prpref}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    function closeModal(){
        console.log("save me!!!!");
        setIsModalOpen(false);
        console.log(isModalOpen)
    }

    useEffect( () => {
        console.log("hello World");
    }, [isModalOpen])

    // might make it a div and not a <a>
    return(
        <a onClick = {() => setIsModalOpen(true)}>
            <img class = {styles.image} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${prpchamp.id}_${prpref}.jpg`} alt={prpchamp.id} />
            <div class = {styles.name}>{prpchamp.name}</div>
            { isModalOpen &&
                <Modal prptype = "abilities" prpchamp = {prpchamp} closeModal={closeModal}/>
            }
        </a>
    )
}