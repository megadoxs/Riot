import { useState, useEffect } from 'react';
import styles from './Search.module.css';

export default function Search({setSearchedChampions, champions, filters, sorters}){

    const [sortersBooleans, setSortersBooleans] = useState(Array.from({ length: sorters.length }, () => false));
    const [filtersBooleans, setFiltersBooleans] = useState(Array.from({ length: filters.length }, (_, i) => Array.from({ length: filters[i].options.length }, () => false)));
    const [isOpen, setIsOpen] = useState(Array.from({ length: filters.length }, () => false))
    const [buttonsText, setButtonsText] = useState(Array.from({ length: filters.length }, () => "\u2B9E"))
    const [search, setSearch] = useState("");
    const [sortedChampions, setSortedChampions] = useState([]);

    function sorterscheck(index){
        setSortersBooleans(sortersBooleans.map((boolean, i) => {
            if (sorters[index].hasOwnProperty("incompatible") && filtersBooleans[sorters[index].incompatible].some(boolean => boolean)){
                setFiltersBooleans(filtersBooleans.map((array, i) => {
                    if (sorters[index].incompatible === i)
                        return array.map(() => false)
                    return array;
                }))
            }
            return i === index ? !boolean : false
        }));
    }

    function filterscheck(index, index2){
        if (filters[index].hasOwnProperty("incompatible") && sortersBooleans[filters[index].incompatible])
            setSortersBooleans(sortersBooleans.map((boolean, i) => filters[index].incompatible === i ? false : boolean))

        setFiltersBooleans(filtersBooleans.map((array, i) => (array.map((boolean, j) => {
            if (i === index && j === index2)
                return !boolean;
            if (filters[i].multiple) 
                return boolean;
            if (i === index)
                return false;
            return boolean;
        }))));
    }

    function open(index){
        setButtonsText(buttonsText.map((buttonText, i) => {
            if(i === index){
                if (buttonText === "\u2B9E") return "\u2B9F";
                return "\u2B9E"
            }
            return buttonText  
        }))
        setIsOpen(isOpen.map((boolean, i) => i === index ? !boolean : boolean))
    }

    useEffect( () => {
        let tempChampions = champions

        filters.forEach((filter, i) => {
            filter.options.forEach( (option, j) => {
                if (filtersBooleans[i][j]) {
                    tempChampions = tempChampions.filter(champion => {
                        const pathParts = filter.path.split('.');
                        let championValue = champion;
    
                        for (const part of pathParts) {
                            championValue = championValue[part];
                        }

                        if (Array.isArray(championValue))
                            return championValue.includes(option.value);
                        return championValue === option.value
                    });
                }
            })
        }); 

        setSortedChampions(tempChampions);
    }, [filtersBooleans, champions])

    useEffect(() => {

        sorters.forEach((sorter, i) => {
            if (sortersBooleans[i]) {
                sortedChampions.sort((a, b) => {
                    let pathParts = sorter.path.split('.');
                    let aValue = a;
                    let bValue = b;

                    for (const part of pathParts) {
                        aValue = aValue[part];
                        bValue = bValue[part];
                    }

                    if (pathParts[pathParts.length -1].toLowerCase().includes("date")){
                        aValue = new Date(aValue);
                        bValue = new Date(bValue);
                    }

                    if (aValue < bValue) return -1;
                    if (aValue > bValue) return 1;
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
            }
        });

        if (!sortersBooleans.some(boolean => boolean))
            sortedChampions.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

        setSearchedChampions(sortedChampions.filter(champion => champion.name.toLowerCase().includes(search.toLowerCase()) || champion.id.toLowerCase().includes(search.toLowerCase())));
    }, [sortedChampions, sortersBooleans, search])

    return (
        <div className = {styles.wrapper}>
            <input className = {styles.input} value = {search} onChange = {e => setSearch(e.target.value)} id = "Search_Bar" placeholder = "Search"></input>
            <div className = {styles.options}>
                <div>
                    {sorters.map((sorter, i) => (
                        <div key = {i} className = {styles.sort}>
                            <label htmlFor = {sorter.name} >{sorter.name}</label>
                            <input onChange = {() => sorterscheck(i)} checked = {sortersBooleans[i]} id = {sorter.name} type = "checkbox"></input>
                        </div>
                    ))}
                </div>
                <div>
                    {filters.map((filter, i) => (
                        <div key = {i}>
                            <div className = {styles.dropDown}>
                                <p onClick = {() => open(i)}>{buttonsText[i]}</p>
                                <p>{filter.name}</p>
                            </div>
                            <div>
                                {isOpen[i] && filter.options.map( (option, j) => (
                                    <div key = {j}>
                                        <label htmlFor = {option.name} >{option.name}</label>
                                        <input onChange = {() => filterscheck(i, j)} checked = {filtersBooleans[i][j]} id = {option.name} type = "checkbox"></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}