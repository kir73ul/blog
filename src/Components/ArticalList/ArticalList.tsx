import { Pagination } from 'antd';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './ArticalList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, setCurrentPage } from '../../redux/articalesReducer';
import { AppStateType } from '../../redux/rootReducer';
import Preloader from '../Common/Preloader';
import { useEffect } from 'react';

export const ArticalList = () => {
    const pageSize = useSelector((state: AppStateType) => state.articles.pageSize)
    const currentPage = useSelector((state: AppStateType) => state.articles.currentPage)
    const totalArticles = useSelector((state: AppStateType) => state.articles.total)
    const isFetching = useSelector((state: AppStateType) => state.articles.isFetching)
    const articles = useSelector((state: AppStateType) => state.articles?.articles)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles(currentPage, pageSize))
    }, [currentPage])
    if (isFetching) {
        return <Preloader />
    }
    return (
        <div className={styles.body_block}>
            {articles.map(article => {
                return <ArticlePreview {...article} />
            })}
            <span className= {styles.pagination}>
                <Pagination  onChange={(current) => { dispatch(setCurrentPage(current)) }} pageSize={pageSize} size="small" total={totalArticles} />
            </span>
        </div>
    )
}