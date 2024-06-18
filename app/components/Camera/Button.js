import styles from './Button.module.css'

export default function Button({ buttonText, onClick }) {

    return (
        <div>
            <button className={styles.button} onClick={onClick}>{buttonText}</button>
        </div>
    );
}