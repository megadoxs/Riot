import styles from './Navbar.module.css';

export default function Navbar({prpbuttons, className}){
    return (
        <ul className={`${styles.wrapper} ${className}`}>
            {prpbuttons.map((elementObj, i) => <li key = {i} class = {styles.list}>
                <button onClick = {() => window.location.href=elementObj.link} class = {styles.button}>{elementObj.name}</button>
            </li>)}
        </ul>
    )
}