import styles from './ArticlePreview.module.scss';
import LikesImage from '../../assets/image/Vector.png';


export const ArticlePreview = () => {
    return (
        <div className={styles.wrap_block}>
            <div className={styles.articlePreview_block}>
                <div className={styles.title}>Some artical title</div>
                <div className={styles.likes_block}>
                    <img src={LikesImage} alt="" className={styles.icon}></img>
                    <span className={styles.likes_count}>12</span>
                </div>
                <div className={styles.author_block}>
                    <div className={styles.author_name}>John Doe</div>
                    <div className={styles.dateOfPublik}>March 5, 2020</div>
                    <div className={styles.author_image}></div>
                </div>
                <div className={styles.tag_block}>
                    <div className={styles.tag_wrap}>
                        <span className={styles.tag}>Tag1</span>
                    </div>
                </div>
                <p className={styles.articleText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    )
}