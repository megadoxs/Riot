import { useState, useEffect } from 'react';
import styles from './Search.module.css';

export default function Search({setSearchedChampions, champions, filters, sorters}){

    const [sortersBooleans, setSortersBooleans] = useState(Array.from({ length: sorters.length }, () => false));
    const [filtersBooleans, setFiltersBooleans] = useState(Array.from({ length: filters.length }, () => false));
    const [search, setSearch] = useState("");
    const [sortedChampions, setSortedChampions] = useState([]);

    function sorterscheck(index){
        setSortersBooleans(sortersBooleans.map((element, i) => i === index ? true : false));
    }

    function filterscheck(index){
        setFiltersBooleans(filtersBooleans.map((element, i) => i === index ? true : false));
    }

    useEffect(() => {
        setSortedChampions(champions);
    }, [champions]);

    console.log(champions)

    useEffect( () => {
        sorters.forEach((sorter, i) => {
            if (sortersBooleans[i]) {
                setSortedChampions(champions.sort((a, b) => {
                    const pathParts = sorter.path.split('.');
                    let aValue = a;
                    let bValue = b;

                    for (const part of pathParts) {
                        aValue = aValue[part];
                        bValue = bValue[part];
                    }
        
                    return aValue - bValue;
                }));
            }
        });
        // not done xdd
        /*filters.forEach((filter, i) => {
            if (sortersBooleans[i]) {
                setSortedChampions(champions.filter(champion => {
                    const pathParts = filter.path.split('.');
                    let aValue = a;
                    let bValue = b;

                    for (const part of pathParts) {
                        aValue = aValue[part];
                        bValue = bValue[part];
                    }
        
                    return aValue - bValue;
                }));
            }
        }); */
        setSearchedChampions(sortedChampions.filter(champion => champion.name.toLowerCase().includes(search.toLowerCase()) || champion.id.toLowerCase().includes(search.toLowerCase())));
    }, [sortersBooleans, search])

    return (
        <div class = {styles.wrapper}>
            <input class = {styles.input} value = {search} onChange = {e => setSearch(e.target.value)} placeholder = "Search"></input>
            <div>
                {sorters.map( (sorter, i) => (
                    <div key = {i}>
                        <label for = {sorter.name} >{sorter.name}</label>
                        <input onChange = {() => sorterscheck(i)} checked = {sortersBooleans[i]} name = {sorter.name} type = "checkbox"></input>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </div>
    )
}