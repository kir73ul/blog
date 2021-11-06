import styles from './ArticlePreview.module.scss';
import LikesImage from '../../../assets/image/Vector.png';
import FavoriteImage from '../../../assets/image/path4.png';
import { Link, useHistory } from 'react-router-dom';
import { articlesType, getSingleArticle, makeFavorite, makeUnfavorite } from '../../../redux/articalesReducer';
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
    const setLikeOrDislike = (slug: string) => {
        return favorited ? dispatch(makeUnfavorite(slug)) : dispatch(makeFavorite(slug))
    }
    return (
        <div className={isSingleArticlePage ? '' : styles.wrapBlock}>
            <div className={(slug === onlyCreatedSlug && !isSingleArticlePage) ? [styles.wrapBlock__previewArticle, styles.wrapBlock_border].join(' ') : styles.wrapBlock__previewArticle}>
                <div className={styles.wrapBlock__previewArticle__leftPart}>
                    <div className={styles.leftPart__title}>
                        <Link
                            onClick={() => { dispatch(getSingleArticle(slug)) }}
                            to={`/articles/${slug}`}
                            className={styles.leftPart__link}
                        >
                            {title.length > 30 ? title.slice(0, 30) + '...' : title}
                        </Link>
                        <div
                            onClick={() => { isAuth ? setLikeOrDislike(slug) : redirectToSignIn() }}
                            className={isLikePushed ? [styles.leftPart__likes_unactive, styles.leftPart__likes].join(' ') : styles.leftPart__likes}>
                            <img
                                src={favorited ? FavoriteImage : LikesImage}
                                alt=""
                                className={styles.leftPart__likes__icon}>
                            </img>
                            <div className={styles.leftPart__likes__count}>{favoritesCount}</div>
                        </div>
                    </div>
                    <div className={styles.leftPart__tag}>
                        <div>
                            {tagList.filter((tag, idx) => idx < 6).map((tag, idx) => {
                                return <span
                                    key={tag}
                                    className={idx === 0 ? [styles.leftPart__tag__usial, styles.leftPart__tag_firstTag].join(' ') : styles.leftPart__tag__usial} >
                                    {tag.length > 10 ? tag.slice(0, 10) + '...' : tag}</span>
                            })}
                        </div>
                    </div>
                    <p className={styles.leftPart__description}>
                        {description.length > 200 ? description.slice(0, 200) + '...' : description}
                    </p>
                </div>
                <div className={styles.previewArticle__authorBlock}>
                    <div className={styles.previewArticle__authorBlock__direction}>
                        <div className={styles.authorBlock__direction__name}>
                            {author.username}
                        </div>
                        <div className={styles.authorBlock__direction__dateOfPublic}>
                            {convertDate(createdAt)}
                        </div>
                        <div>
                            {isSingleArticlePage && <ManageButtons authorName={authorName} />}
                        </div>
                    </div>
                    <img
                        className={styles.previewArticle__authorBlock__image}
                        src={author.image || '../../../assets/image/Rectangle 1.png'}
                        alt=''>
                    </img>
                </div>
            </div>
        </div>
    )
}