import styles from './Search.module.css';

export default function Search({booleans, setBooleans, search, setSearch}){

    function check(index){
        setBooleans(booleans.map((element, i) => i === index ? true : false));
    }

    return (
        <div class = {styles.wrapper}>
            <input value = {search} onChange = {e => setSearch(e.target.value)} placeholder = "Search"></input>
            <div>
                <label for = "alphabetic">Alphabetic</label>
                <input onChange = {() => check(0)} checked = {booleans[0]} name = "alphabetic" type = "checkbox" ></input>
            </div>
            <div>
                <label for = "priceBE">Price (BE)</label>
                <input onChange = {() => check(1)} checked = {booleans[1]} name = "priceBE" type = "checkbox" ></input>
            </div>
            <div>
                <label for = "priceRP">Price (RP)</label>
                <input onChange = {() => check(2)} checked = {booleans[2]} name = "priceRP" type = "checkbox" ></input>
            </div>
        </div>
    )
}