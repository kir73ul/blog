import { ArticlePreview } from '../ArticalList/ArticlePreview/ArticlePreview';
import styles from '../ArticalList/ArticlePreview/ArticlePreview.module.scss';
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom';
import LikesImage from '../../assets/image/Vector.png';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';


const markdown = `Est Ampyciden pater patent
Amor saxa inpiger
Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.

Qua deos has fontibus
Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.

Quamvis pronuba
Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

1. Clamoribus haesit tenentem iube Haec munera
2. Vincla venae
3. Paris includere etiam tamen
4. Superi te putria imagine Deianira
5. Tremore hoste Esse sed perstat capillis siqua`

export const Artical = () => {
    const dispatch = useDispatch()
/*     useEffect(() => {
        dispatch(getSingleArticle())
    }, []) */
    return (
        <>
            <div className={styles.wrap_block}>
                <div className={styles.articlePreview_block}>
                    <Link to='/articles/' className={styles.title}>Some artical title</Link>
                    <div className={styles.likes_block}>
                        <img src={LikesImage} alt="" className={styles.icon}></img>
                        <div className={styles.likes_count}>12</div>
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
            <div className={styles.text_block_wrap}>
                <div className={styles.text_block}>
                    <ReactMarkdown children={markdown} />
                </div>
            </div>
        </>
    )
}