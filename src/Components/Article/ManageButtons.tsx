import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';
import { removeArticle, setIsModalOpened } from '../../redux/articalesReducer';
import { Modal } from 'antd';
import { useHistory } from 'react-router';

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
    if (isRemoveSuccess ) {
        redirectToArticleList()
        return (
            <div className={styles.successBlock}>
                <p className={styles.successBlock__success}>&#9989; Article's succesefully removed</p>
            </div>
        )
    } 
    return (
        <>
            {authorName === username && <div className={styles.manageButtons}>
                <button
                    onClick={() => dispatch(setIsModalOpened(true))}
                    className={styles.manageButtons__delete}
                >
                    Delete
                    <Modal title={
                        <div>
                            <span className={styles.manageButtons__delete__modal__sign}>&#33;</span>
                            <span>Are you sure to delete this article?</span>
                        </div>}
                        visible={isModalOpened}
                        width='240px'
                        onOk={(e) => { e.stopPropagation(); dispatch(removeArticle(slug)); dispatch(setIsModalOpened(false)) }}
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
                        wrapClassName={styles.manageButtons__delete__body}>
                    </Modal>
                </button>
                <button
                    onClick={() => redirectToEditArticle(slug)}
                    className={styles.manageButtons__edit}
                >
                    Edit
                </button>
            </div>}
        </>
    )
}