import styles from './Preloader.module.css'


const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src='https://acegif.com/wp-content/uploads/loading-48.gif' alt='' />
        </div>
    )
}

export default Preloader;