import styles from './Header.module.scss';
import { Button } from "antd";
import { useHistory } from 'react-router-dom';

export const Header = () => {
    const history = useHistory()
    const redirectToSignIn = () => {
        history.push('/sign-in')
    }
    const redirectToSignUp = () => {
        history.push('/sign-up')
    }
    return (
        <div className={styles.wrapper_block}>
            <div className={styles.title}>Realworld Blog</div>
            <div className={styles.btn}>
                <Button onClick={() => redirectToSignIn()} className={styles.SignInBtn}>Sign in</Button>
                <div className={styles.block_SignUnBtn}>    </div>
                <Button onClick={() => redirectToSignUp()} className={styles.SignUpBtn}>Sign up</Button>
            </div>
        </div>
    )
}