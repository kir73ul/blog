import styles from './Header.module.scss';
import { Button } from "antd";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getUserInfo, logout } from '../../redux/authReducer';
import imgUrl from '../../assets/image/userAva.png'
import { zeroizeArticle } from '../../redux/newArticleReducer';
import { useEffect } from 'react';
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
    }, [userData])

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
        <div className={styles.wrapper_block}>
            <div onClick={() => { redirectToMainPage() }} className={styles.title}>Realworld Blog</div>
            {isAuth ?
                <div className={styles.withAuth_block}>
                    <Button onClick={() => { redirectToCreateArticle(); dispatch(zeroizeArticle()) }} className={styles.createArticleBtn}>Create article</Button>
                    <div onClick={() => { redirectToEditProfile() }} className={styles.userName}>{userName}</div>
                    <img onClick={() => { redirectToEditProfile() }} src={avaImg} className={styles.userAva} alt=''></img>
                    <Button onClick={() => dispatch(logout())} className={styles.logOutBtn}>Log out</Button>
                </div>
                :
                <div className={styles.btn}>
                    <Button onClick={() => { redirectToSignIn(); }} className={styles.SignInBtn}>Sign in</Button>
                    <Button onClick={() => redirectToSignUp()} className={styles.SignUpBtn}>Sign up</Button>
                </div>
            }
        </div>
    )
}