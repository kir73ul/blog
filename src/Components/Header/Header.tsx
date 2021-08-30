import styles from './Header.module.scss';
import { Button } from "antd";

export const Header = () => {
    return (
        <div className={styles.wrapper_block}>
            <div className={styles.title}>Realworld Blog</div>
            <div className={styles.btn}>
                <Button className={styles.SignInBtn}>Sign in</Button>
                <div className={styles.block_SignUnBtn}>    </div>
                <Button className={styles.SignUpBtn}>Sign up</Button>
            </div>
        </div>
    )
}