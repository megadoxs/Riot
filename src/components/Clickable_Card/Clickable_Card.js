import styles from './Clickable_card.module.css';

import { useState } from 'react';

export default function Clickable_Card({prpchamp, prpref}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    // might make it a div and not a <a>
    return(
        <a onClick = {() => setIsModalOpen(!isModalOpen)}>
            <img class = {styles.image} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${prpchamp.id}_${prpref}.jpg`} alt={prpchamp.id} />
            <div class = {styles.name}>{prpchamp.name}</div>
            { isModalOpen //&&

            }
        </a>
    )
}