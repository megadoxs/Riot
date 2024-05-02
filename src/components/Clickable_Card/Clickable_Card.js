import styles from './Clickable_card.module.css';

import Modal from '../Modal/Modal.js'

import { useState, useEffect } from 'react';

export default function Clickable_Card({ element, prpimg, displayName, className, hasModal }){

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return(
        <div className = {`${className}`} onClick = {() => { if ((typeof hasModal === 'undefined' || hasModal === true) && !isModalOpen) setIsModalOpen(true); }}>
            <img className = {styles.image} src={prpimg} alt={element.id} />
            {(typeof displayName === 'string') &&
                <div className = {styles.name}>{displayName}</div>
            }
            {/*Will be remove from being a component since it is very specifict to the Card use*/}
            {(typeof hasModal === 'undefined' || hasModal === true) && isModalOpen &&
                <Modal prptype = "abilities" element = {element} isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen}/>
            }
        </div>
    )
}