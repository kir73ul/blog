import { ArticlePreview } from '../ArticalList/ArticlePreview/ArticlePreview';
import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { getSingleArticle } from '../../redux/articalesReducer';
import { useHistory } from 'react-router';

export const Artical = () => {
    const history = useHistory()
    const slugAfterReset = history.location.pathname.slice((history.location.pathname.lastIndexOf('/') + 1))
    const currentArticle = useSelector((state: AppStateType) => state.articles.currentArticle)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleArticle(slugAfterReset))
    }, [slugAfterReset])

    if (currentArticle) {
        return (
            <>
                <div className={styles.singleArticle}>
                    <ArticlePreview {...currentArticle} />
                    <div className={styles.textBlock}>
                        <ReactMarkdown
                            className={styles.articleText}
                            children={currentArticle.body} />
                    </div>
                </div>
            </>
        )
    }
    return null
}