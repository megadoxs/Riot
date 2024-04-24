import styles from './Clickable_card.module.css';

import Modal from '../Modal/Modal.js'

import { useState, useEffect } from 'react';

export default function Clickable_Card({prpchamp, prpimg, displayName}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    // maybe use a div so that <a> doesn't give me a warning
    return(
        <a onClick = {() => { if (!isModalOpen) setIsModalOpen(true); }}>
            <img className = {styles.image} src={prpimg} alt={prpchamp.id} />
            { displayName &&
                <div className = {styles.name}>{prpchamp.name}</div>
            }
            { isModalOpen &&
                <Modal prptype = "abilities" prpchamp = {prpchamp} isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen}/>
            }
        </a>
    )
}