import { ArticlePreview } from '../ArticalList/ArticlePreview/ArticlePreview';
import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getSingleArticle, removeArticle, setIsModalOpened } from '../../redux/articalesReducer';
import { Modal } from 'antd';
import Preloader from '../Common/Preloader';
import { getArticleData } from '../../redux/newArticleReducer';
import { useHistory } from 'react-router';



export const Artical = () => {

    let slug = useSelector((state: AppStateType) => state.articles.currentSlug)
    const article = useSelector((state: AppStateType) => state.articles.currentArticle)
    const username = useSelector((state: AppStateType) => state.auth.users.username)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const isRemoveSuccess = useSelector((state: AppStateType) => state.articles.isRemoveSuccess)
    const isModalOpened = useSelector((state: AppStateType) => state.articles.isModalOpened)
    const dispatch = useDispatch()
    const history = useHistory()
    const path = history.location.pathname
    const slugAterReset = path.slice((path.indexOf(':') + 1))
    console.log(slugAterReset);


    const redirectToEditArticle = (slug: string) => {
        history.push(`/articles/${slug}/edit`)
    }
    const redirectToArticleList = () => {
        setTimeout(() => {
            history.push('/')
        }, 3000)
    }
    useEffect(() => {
        console.log('render article ');

        dispatch(getSingleArticle(slugAterReset))
    }, [])
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
                    <ArticlePreview {...article} />
                    {article.author.username === username ? <div className={styles.buttons_block}>
                        <button onClick={() => { dispatch(setIsModalOpened(true)) }} className={styles.delete_btn}>Delete
                            <Modal title={
                                <div>
                                    <span className={styles.sign}>&#33;</span>
                                    <span>Are you sure to delete this article?</span>
                                </div>}
                                visible={isModalOpened}
                                width='240px'
                                onOk={() => { dispatch(removeArticle(slug)); dispatch(setIsModalOpened(false)) }}
                                onCancel={(e) => { e.stopPropagation(); dispatch(setIsModalOpened(false)) }}
                                okText='Yes'
                                cancelText='No'
                                closable={false}
                                mask={false}
                                bodyStyle={{
                                    display: 'none',
                                }}
                                style={{
                                    position: 'relative',
                                    top: 150,
                                    right: 96,
                                }}
                                wrapClassName={styles.modal_body}>
                            </Modal>
                        </button>
                        <button
                            onClick={() => { dispatch(getArticleData(slug)); redirectToEditArticle(slug) }} className={styles.edit_btn}>Edit
                        </button>
                    </div> : null}
                    <div className={styles.text_block_wrap}>
                        <ReactMarkdown
                            className={styles.text_block}
                            children={article.body} />
                    </div>
                </div>
            </>
        )
    }
    return null
}