import Search from '../Search/Search';
import Clickable_Card from '../Clickable_Card/Clickable_Card';

import styles from './Searchable_Cards.module.css'

import { useState } from 'react'

export default function Searchable_Cards({ cards, displayName, searchs, filters, sorters, img}){

    const [search, setSearch] = useState(cards);

    return (
        <div className = {styles.champions}>
            <div className = {styles.search}>
                <Search searchs = {searchs} setSearchedChampions = {setSearch} champions = {cards} filters = {filters} sorters = {sorters}/>
            </div>
            <div className = {styles.cards}>
                {search.map((card, i) =>
                    <Clickable_Card key = {i} element = {card} displayName = {eval('`' + displayName + '`')} prpimg = {eval('`' + img + '`')}/>
                )}
            </div>
        </div>
    )
} 