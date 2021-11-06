import { Pagination } from 'antd';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './ArticalList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { getArticles, setCurrentPage } from '../../redux/articalesReducer';
import { AppStateType } from '../../redux/rootReducer';
import React, { useEffect } from 'react';

const ArticalList = () => {
    const pageSize = useSelector((state: AppStateType) => state.articles.pageSize)
    const currentPage = useSelector((state: AppStateType) => state.articles.currentPage)
    const totalArticles = useSelector((state: AppStateType) => state.articles.total)
    const articleList = useSelector((state: AppStateType) => state.articles?.articleList)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(currentPage);
        dispatch(getArticles(currentPage, pageSize))
    }, [currentPage])

    return (
        <div className={styles.articleBody}>
            {articleList.map(article => {
                return <ArticlePreview key={article.slug} {...article} />
            })}
            <span className={styles.pagination}>
                <Pagination
                    current={currentPage}
                    onChange={(current) => dispatch(setCurrentPage(current))}
                    pageSize={pageSize}
                    size="small"
                    total={totalArticles}
                />
            </span>
        </div>
    )
}
export default React.memo(ArticalList)