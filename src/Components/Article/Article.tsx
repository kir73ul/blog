import { ArticlePreview } from '../ArticalList/ArticlePreview/ArticlePreview';
import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import ReactMarkdown from 'react-markdown'
import LikesImage from '../../assets/image/Vector.png';
import FavoriteImage from '../../assets/image/path4.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { articlesType, getSingleArticle, removeArticle } from '../../redux/articalesReducer';
import { convertDate } from '../Common/helper';
import { Button, Modal } from 'antd';
import Preloader from '../Common/Preloader';
import { getArticleData } from '../../redux/newArticleReducer';
import { useHistory } from 'react-router';



export const Artical = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const slug = useSelector((state: AppStateType) => state.articles.currentSlug)
    const username = useSelector((state: AppStateType) => state.auth.users.username)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const isRemoveSuccess = useSelector((state: AppStateType) => state.articles.isRemoveSuccess)
    const dispatch = useDispatch()
    const history = useHistory()

    const redirectToEditArticle = () => {
        history.push('/new-article')
    }
    const redirectToArticleList = () => {
        setTimeout(() => {
            history.push('/')
        }, 3000)

    }

    useEffect(() => {
        dispatch(getSingleArticle(slug))
    }, [slug])
    const article = useSelector((state: AppStateType) => state.articles.currentArticle)
    if (isRemoveSuccess) {
        redirectToArticleList()
        return (
            <p className={styles.success_block}>
                <p className={styles.success}>&#9989; Article's succesefully removed</p>
            </p>
        )
    }
    if (isFetching) {
        return <Preloader />
    }
    if (article) {
        return (
            <>
                <div className={styles.wrap_article_block}>
                    <div className={styles.single_article_block}>
                        <div className={styles.title}>
                            <div className={styles.link}>{article.title}</div>
                            <div onClick={() => { }} className={styles.likes_block}>
                                <img src={article.favorited ? FavoriteImage : LikesImage} alt="" className={styles.icon}></img>
                                <div className={styles.likes_count}>{article.favoritesCount}</div>
                            </div>
                        </div>
                        <div className={styles.tag_block}>
                            <div className={styles.tag_wrap}>
                                {article.tagList.map((tag, idx) => {
                                    return <span key={tag} className={idx === 0 ? styles.tag && styles.firstTag : styles.tag} >{tag}</span>
                                })}
                            </div>
                        </div>
                        <div className={styles.author_block}>
                            <div className={styles.author_name}>{article.author.username}</div>
                            <div className={styles.dateOfPublik}>{convertDate(article.createdAt)}</div>
                            <img className={styles.author_image} src={article.author.image || '../../assets/image/Rectangle 1.png'} alt=''></img>
                        </div>

                        {article.author.username === username ? <div className={styles.buttons_block}>
                            <Button onClick={() => { setIsModalVisible(true)/* dispatch(removeArticle(slug)) */ }} className={styles.delete_btn}>Delete</Button>
                            <Modal title="Are you sure to delete this article?" visible={isModalVisible} width='240' /* bodyStyle='modal_body' */ /* onOk={dispatch(removeArticle(slug))} onCancel={setIsModalVisible(false)} */>

                            </Modal>
                            <Button onClick={() => { dispatch(getArticleData(slug)); redirectToEditArticle() }} className={styles.edit_btn}>Edit</Button>
                        </div> : null}
                        <p className={styles.articleText}>{article.description}</p>
                    </div>
                    <div className={styles.text_block_wrap}>
                        <ReactMarkdown children={article.body} />
                    </div>
                </div>
            </>
        )
    }
    return null
}