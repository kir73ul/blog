import { Pagination } from 'antd';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './ArticalList.module.scss';

export const ArticalList = () => {
    return (
        <div className={styles.body_block}>
            <ArticlePreview />
            <div className='pagination'>
                <Pagination size="small" total={50} />
            </div>
        </div>
    )
}