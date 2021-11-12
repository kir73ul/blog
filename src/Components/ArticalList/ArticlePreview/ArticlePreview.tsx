import styles from './ArticlePreview.module.scss';
import LikesImage from '../../../assets/image/Vector.png';
import FavoriteImage from '../../../assets/image/path4.png';
import { Link, useHistory } from 'react-router-dom';
import { articlesType, getSingleArticle, makeFavoriteUnfavorite } from '../../../redux/articalesReducer';
import { convertDate } from '../../Common/helper';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/rootReducer';
import React from 'react';
import { ManageButtons } from '../../Article/ManageButtons';

export const ArticlePreview: React.FC<articlesType> = ({ createdAt, tagList, slug, title, description, body, favorited, favoritesCount, author }) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const onlyCreatedSlug = useSelector((state: AppStateType) => state.newArtical.onlyCreatedSlug)
    const isLikePushed = useSelector((state: AppStateType) => state.articles.isLikePushed)
    const dispatch = useDispatch()
    const history = useHistory()
    const isSingleArticlePage = (`/articles/${slug}` === history.location.pathname)
    const authorName = author.username

    const redirectToSignIn = () => {
        history.push('/sign-in', {})
    }
    return (
        <div className={isSingleArticlePage ? '' : styles.wrapBlock}>
            <div className={(slug === onlyCreatedSlug && !isSingleArticlePage) ? `${styles.previewArticle} ${styles.wrapBlock_border}` : styles.previewArticle}>
                <div className={styles.leftPart}>
                    <div className={styles.title}>
                        {!isSingleArticlePage ?
                            <Link
                                onClick={() => dispatch(getSingleArticle(slug))}
                                to={`/articles/${slug}`}
                                className={styles.link}
                            >
                                {title.length > 30 ? title.slice(0, 30) + '...' : title}
                            </Link>
                            : <p className={styles.link}>{title.length > 30 ? title.slice(0, 30) + '...' : title}</p>
                        }
                        <div
                            onClick={() => { isAuth ? dispatch(makeFavoriteUnfavorite(slug, favorited, isSingleArticlePage)) : redirectToSignIn() }}
                            className={isLikePushed ? `${styles.likes_unactive} ${styles.likes}` : styles.likes}>
                            <img
                                src={favorited ? FavoriteImage : LikesImage}
                                alt=""
                                className={styles.likesIcon}>
                            </img>
                            <div className={styles.likesCount}>{favoritesCount}</div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        <div>
                            {tagList.filter((tag, idx) => idx < 6).map((tag, idx) => {
                                return <span
                                    key={tag}
                                    className={idx === 0 ? `${styles.usialTag} ${styles.firstTag}` : styles.usialTag} >
                                    {tag.length > 10 ? tag.slice(0, 10) + '...' : tag}</span>
                            })}
                        </div>
                    </div>
                    <p className={styles.description}>
                        {description.length > 200 ? description.slice(0, 200) + '...' : description}
                    </p>
                </div>
                <div className={styles.authorBlock}>
                    <div className={styles.direction}>
                        <div className={styles.authorName}>
                            {author.username}
                        </div>
                        <div className={styles.dateOfPublic}>
                            {convertDate(createdAt)}
                        </div>
                        <div>
                            {isSingleArticlePage && <ManageButtons authorName={authorName} />}
                        </div>
                    </div>
                    <img
                        className={styles.image}
                        src={author.image || '../../../assets/image/Rectangle 1.png'}
                        alt=''>
                    </img>
                </div>
            </div>
        </div>
    )
}