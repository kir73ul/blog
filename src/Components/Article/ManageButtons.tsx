import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { removeArticle, setIsModalOpened } from '../../redux/articalesReducer';
import { Modal } from 'antd';
import { useHistory } from 'react-router';
import sign from './../../assets/image/sign.png';

interface ManageButtonsType {
    authorName: string;
}
export const ManageButtons: React.FC<ManageButtonsType> = ({ authorName }) => {
    const history = useHistory()
    let slug = useSelector((state: AppStateType) => state.articles.currentSlug)
    const username = useSelector((state: AppStateType) => state.auth.users.username)
    const isRemoveSuccess = useSelector((state: AppStateType) => state.articles.isRemoveSuccess)
    const isModalOpened = useSelector((state: AppStateType) => state.articles.isModalOpened)
    const dispatch = useDispatch()

    const redirectToEditArticle = (slug: string) => {
        history.push(`/articles/${slug}/edit`)
    }
    const redirectToArticleList = () => {
        setTimeout(() => {
            history.push('/')
        }, 3000)
    }
    if (isRemoveSuccess) {
        redirectToArticleList()
        return (
            <div className={styles.successBlock}>
                <p className={styles.successInfo}>&#9989; Article's succesefully removed</p>
            </div>
        )
    }
    return (
        <>
            {authorName === username && <div className={styles.managePanel}>
                <button
                    onClick={() => dispatch(setIsModalOpened(true))}
                    className={`${styles.button} ${styles.button__del}`}
                >
                    Delete
                    <Modal title={
                        <div className={styles.modalInfo}>
                            <img src={sign} alt='' />
                            <p>Are you sure to delete this article?</p>
                        </div>
                    }
                        visible={isModalOpened}
                        width='240px'
                        onOk={(e) => { e.stopPropagation(); dispatch(removeArticle(slug)); dispatch(setIsModalOpened(false)) }}
                        onCancel={(e) => { e.stopPropagation(); dispatch(setIsModalOpened(false)) }}
                        okText='Yes'
                        cancelText='No'
                        closable={false}
                        mask={true}
                        bodyStyle={{
                            display: 'none',
                        }}
                        style={{
                            display: 'flex',
                            margin: 'auto'
                        }}
                    >
                    </Modal>
                </button>
                <button
                    onClick={() => redirectToEditArticle(slug)}
                    className={`${styles.button} ${styles.button__edit}`}
                >
                    Edit
                </button>
            </div>}
        </>
    )
}