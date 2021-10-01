import styles from './ArticlePreview.module.scss';
import LikesImage from '../../../assets/image/Vector.png';
import FavoriteImage from '../../../assets/image/path4.png';
import { Link } from 'react-router-dom';
import { articlesType, makeFavorite } from '../../../redux/articalesReducer';
import { convertDate } from '../../Common/helper';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/rootReducer';
import { useEffect } from 'react';


export const ArticlePreview: React.FC<articlesType> = ({ createdAt, tagList, slug, title, description, body, favorited, favoritesCount, author }) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()


    const setLikeOrDislike = (slug: string) => {
        if (isAuth) {
            if (!favorited) {
                dispatch(makeFavorite(slug))
            }
        }
        return
    }

    return (
        <div className={styles.wrap_block}>
            <div className={styles.articlePreview_block}>
                <div className={styles.title}>
                    <Link to={`/articles/:${slug}`} className={styles.link}>{title}</Link>
                    <div onClick={() => { setLikeOrDislike(slug) }} className={styles.likes_block}>
                        <img src={favorited ? FavoriteImage : LikesImage} alt="" className={styles.icon}></img>
                        <div className={styles.likes_count}>{favoritesCount}</div>
                    </div>
                </div>
                <div className={styles.tag_block}>
                    <div className={styles.tag_wrap}>
                        {tagList.map((tag, idx) => {
                            return <span key={tag} className={idx === 0 ? styles.tag && styles.firstTag : styles.tag} >{tag}</span>
                        })}
                    </div>
                </div>

                <div className={styles.author_block}>
                    <div className={styles.author_name}>{author.username}</div>
                    <div className={styles.dateOfPublik}>{convertDate(createdAt)}</div>
                    <img className={styles.author_image} src={author.image || '../../../assets/image/Rectangle 1.png'} alt=''></img>
                </div>

                <p className={styles.articleText}>{description}</p>
            </div>
        </div>
    )
}