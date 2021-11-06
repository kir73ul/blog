import styles from './Header.module.css';
import { Button } from "antd";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getUserInfo, logout } from '../../redux/authReducer';
import imgUrl from '../../assets/image/userAva.png'
/* import { zeroizeArticle } from '../../redux/newArticleReducer';
 */import { useEffect } from 'react';
import { cookies } from '../../API/API';
import { getArticles } from '../../redux/articalesReducer';

export const Header = () => {
    const userData = useSelector((state: AppStateType) => state.auth.users)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isCooky = !!cookies.get('tokenData')

    useEffect(() => {
        if (isCooky && !isAuth) {
            dispatch(getUserInfo())
        }
    }, [userData, isCooky])

    const userName = useSelector((state: AppStateType) => state.auth.users.username)
    const avaImg = useSelector((state: AppStateType) => state.auth.users.image) || imgUrl
    const history = useHistory()
    const dispatch = useDispatch()

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
    const redirectToMainPage = () => {
        dispatch(getArticles(1, 5))
        history.push('/')
    }
    return (
        <div className={styles.header}>
            <div onClick={() => { redirectToMainPage() }} className={styles.header__title}>Realworld Blog</div>
            {isCooky ?
                <div className={styles.header__withAuth}>
                    <Button
                        onClick={() => redirectToCreateArticle()}
                        className={styles.header__withAuth__createArticleBtn}
                    >
                        Create article
                    </Button>
                    <div
                        onClick={() => redirectToEditProfile()}
                        className={styles.header__withAuth__userInfo}
                    >
                        <p className={styles.userInfo__userName}>{userName}</p>
                        <img src={avaImg} className={styles.userInfo__userAva} alt=''></img>
                    </div>
                    <Button
                        onClick={() => dispatch(logout())}
                        className={styles.header__withAuth__logOutBtn}>Log out</Button>
                </div>
                :
                <div className={styles.header__withAuth}>
                    <Button
                        onClick={() => { redirectToSignIn(); }}
                        className={styles.header__withAuth__signInBtn}>Sign in</Button>
                    <Button
                        onClick={() => redirectToSignUp()}
                        className={styles.header__withAuth__signUpBtn}>Sign up</Button>
                </div>
            }
        </div>
    )
}