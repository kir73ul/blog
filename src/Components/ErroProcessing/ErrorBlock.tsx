import styles from './Error.module.scss'
import { errorsType } from '../../redux/authReducer'

interface ErrorBlockPropsType {
    error: any;
}

export const ErrorBlock: React.FC<ErrorBlockPropsType> = ({ error }) => {
    return (
        <p>
            {(error) ?
                <p className={styles.responseError}>{
                    Object.entries(error).map(([er, bodyEr]) => <p>{`${er}  ${bodyEr}`}</p>)
                }</p> : null}
        </p>

    )

}