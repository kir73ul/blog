import styles from './Header.module.scss';
import { Button } from "antd";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getUserData, setAuthEmail } from '../../redux/authReducer';

export const Header = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const history = useHistory()
    const redirectToSignIn = () => {
        history.push('/sign-in')
    }
    const redirectToSignUp = () => {
        history.push('/sign-up')
    }
    const redirectToEditProfile = () => {
        history.push('/profile')
    }
    const redirectToCreateArticle = () => {
        history.push('/new-article')
    }
    return (
        <div className={styles.wrapper_block}>
            <div className={styles.title}>Realworld Blog</div>
            {isAuth ?
                <div className={styles.withAuth_block}>
                    <Button onClick={() => redirectToCreateArticle()} className={styles.createArticleBtn}>Create article</Button>
                    <div className={styles.userName}>Name</div>
                    <div onClick={() => redirectToEditProfile()} className={styles.userAva} ></div>
                    <Button onClick={() => { }} className={styles.logOutBtn}>Log out</Button>
                </div>
                :
                <div className={styles.btn}>
                    <Button onClick={() => {redirectToSignIn();}} className={styles.SignInBtn}>Sign in</Button>
                    <Button onClick={() => redirectToSignUp()} className={styles.SignUpBtn}>Sign up</Button>
                </div>
            }
        </div>

    )
}