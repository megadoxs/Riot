import styles from './Navbar.module.css';

export default function Navbar({prpbuttons}){
    return (
        <ul class = {styles.wrapper}>
            {prpbuttons.map((elementObj, i) => <li key = {i} class = {styles.list}>
                <button onClick = {() => window.location.href=elementObj.link} class = {styles.button}>{elementObj.name}</button>
            </li>)}
        </ul>
    )
}