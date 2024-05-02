import styles from './Navbar.module.css';

export default function Navbar({prpbuttons, className}){

    function redirect(elementObj){
        if(!elementObj.hasOwnProperty("state"))
            window.location.href=elementObj.value
        else
            elementObj.state(elementObj.value)
    }

    return (
        <ul className={`${styles.wrapper} ${className}`}>
            {prpbuttons.map((elementObj, i) => <li key = {i} className = {styles.list}>
                <button onClick = {() => redirect(elementObj)} className = {styles.button}>{elementObj.name}</button>
            </li>)}
        </ul>
    )
}