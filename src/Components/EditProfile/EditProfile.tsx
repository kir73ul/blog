import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateUserInfo } from '../../redux/authReducer';
import { AppStateType } from '../../redux/rootReducer';
import Preloader from '../Common/Preloader';
import styles from './EditProfile.module.scss';

export const EditProfile = () => {
    const dispatch = useDispatch()
    let username = useSelector((state: AppStateType) => state.auth.users.username)
    let userEmail = useSelector((state: AppStateType) => state.auth.users.email)
    let userAvatarImage = useSelector((state: AppStateType) => state.auth.users.image)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const error = useSelector((state: AppStateType) => state.auth.error)
    const token = useSelector((state: AppStateType) => state.auth.users.token)
    const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

    if (isFetching) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.editProfile_block}>
                {(error) ?
                    <p className={styles.responseError}>{
                        Object.entries(error).map(([key, values]) => {
                            return <span> {`${key} -${values}`}<br /></span>
                        })
                    }</p> : null}
                <h1 className={styles.title}>Edit Profile</h1>
                <Formik
                    initialValues={{ userName: username, email: userEmail, newPassword: '', avatarImage: userAvatarImage }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        newPassword: Yup.string().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`),
                        avatarImage: Yup.string().matches(regMatch || '', "Website should be a valid URL")
                    })}
                    //@ts-ignore
                    onSubmit={(values) => dispatch(updateUserInfo(JSON.stringify({ user: { username: values.userName, email: values.email, password: values.newPassword, image: values.avatarImage } }, token)))}

                >
                    {(formik) => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.userName_block}>
                                    <span className={styles.userNameLabel}>Username</span>
                                    <Input placeholder='Username' className={styles.userNameInput} type="string" name="userName" />
                                    <ErrorMessage className={styles.error} name="userName" component="p" />
                                </div>
                                <div className={styles.email_block}>
                                    <span className={styles.emailLabel}>Email address</span>
                                    <Input placeholder='Email address' className={formik.errors.email ? styles.inputError && styles.emailInput : styles.emailInput} type="email" name="email" />
                                    <ErrorMessage className={styles.error} name="email" component="div" />
                                </div>
                                <div className={styles.password_block}>
                                    <span className={styles.passwordlabel}> New password </span>
                                    <Input placeholder='New password' className={styles.passwordInput} type="password" name="newPassword" />
                                    <ErrorMessage className={styles.error} name="newPassword" component="div" />
                                </div>
                                <div className={styles.avatarImage_block}>
                                    <span className={styles.avatarImagelabel}>Avatar image (url)</span>
                                    <Input placeholder='Avatar image' className={styles.avatarImageInput} type="text" name="avatarImage" />
                                    <ErrorMessage className={styles.error} name="avatarImage" component="div" />
                                </div>
                            </div>
                            <button className={styles.button_block} type="submit">
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}