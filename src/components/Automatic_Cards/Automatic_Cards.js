import styles from './Automatic_Cards.module.css'

import { useState, useEffect } from 'react';
import Clickable_Card from '../Clickable_Card/Clickable_Card';

export default function Automatic_Cards({ prpimg, className, array, hasModal}){

    const [displaying, setDisplaying] = useState(0);
    const [manual, setManual] = useState(false);

    // freeze it when you open the modal somehow...
    useEffect(() => {
        const timer = setTimeout(() => setDisplaying(displaying < array.length - 1? displaying + 1 : 0), 1e4)
        return () => {
            clearTimeout(timer);
            setManual(!manual)
        }
    }, [array, displaying, !manual])

    return (
        <div className = {`${styles.displayCard} ${className}`}>
            <button className = {`${styles.displayButtonL} ${styles.displayButton}`} onClick= {() => {setDisplaying(displaying === 0? array.length - 1 : displaying - 1); setManual(true)}}></button>
            <Clickable_Card element={array[displaying]} prpimg = {eval('`' + prpimg + '`')} hasModal = {hasModal} displayName={false}/>
            <button className = {`${styles.displayButtonR} ${styles.displayButton}`} onClick= {() => {setDisplaying(displaying < array.length - 1? displaying + 1 : 0); setManual(true)}}></button>
        </div>
    )
}