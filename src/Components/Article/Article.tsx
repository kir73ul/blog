import { ArticlePreview } from '../ArticalList/ArticlePreview/ArticlePreview';
import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getSingleArticle, removeArticle, setIsModalOpened } from '../../redux/articalesReducer';
import { Modal } from 'antd';
import { useHistory } from 'react-router';

export const Artical = () => {
    let slug = useSelector((state: AppStateType) => state.articles.currentSlug)
    const articleList = useSelector((state: AppStateType) => state.articles.articleList)
    const article = articleList.find(artic => artic.slug === slug)
    const username = useSelector((state: AppStateType) => state.auth.users.username)
    const isRemoveSuccess = useSelector((state: AppStateType) => state.articles.isRemoveSuccess)
    const isModalOpened = useSelector((state: AppStateType) => state.articles.isModalOpened)
    const dispatch = useDispatch()
    const history = useHistory()
    const slugAfterReset = history.location.pathname.slice((history.location.pathname.lastIndexOf('/') + 1))

    const redirectToEditArticle = (slug: string) => {
        history.push(`/articles/${slug}/edit`)
    }
    const redirectToArticleList = () => {
        setTimeout(() => {
            history.push('/')
        }, 3000)
    }
    useEffect(() => {
        dispatch(getSingleArticle(slugAfterReset))
    }, [slugAfterReset])

    if (isRemoveSuccess) {
        redirectToArticleList()
        return (
            <p className={styles.success_block}>
                <p className={styles.success}>&#9989; Article's succesefully removed</p>
            </p>
        )
    }

    if (article) {
        return (
            <>
                <div className={styles.wrap_article_block}>
                    <ArticlePreview {...article} />
                    {article.author.username === username ? <div className={styles.buttons_block}>
                        <button
                            onClick={() => { dispatch(setIsModalOpened(true)) }}
                            className={styles.delete_btn}
                        >
                            Delete
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
                            onClick={() => redirectToEditArticle(slug)}
                            className={styles.edit_btn}
                        >
                            Edit
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