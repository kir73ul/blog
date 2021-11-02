import styles from './Preloader.module.css'
import loading from '../../assets/image/1488.gif'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/rootReducer'

const Preloader = () => {
    const isFetching = useSelector((state: AppStateType) => state.common.isFetching)
    return isFetching ?
        (
            <div className={styles.preloader} >
                <img src={loading} alt='' />
            </div >
        )
        : null
}
export default Preloader;