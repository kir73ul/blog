import styles from './Preloader.module.css'
import loading from '../../assets/image/1488.gif'
//'https://acegif.com/wp-content/uploads/loading-48.gif'


const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={loading} alt='' />
        </div>
    )
}

export default Preloader;