import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import styles from './EditProfile.module.scss';
import { Link } from 'react-router-dom';

export const EditProfile = () => {
    return (
        <>
            <div className={styles.editProfile_block}>
                <h1 className={styles.title}>Create new account</h1>
                <Formik
                    initialValues={{ userName: '', email: '', newPassword: '', avatarImage: '' }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        newPassword: Yup.string().password().minSymbols(3, 'The pasword should be longer 3').required('Required'),
                        avatarImage: Yup.string()
                    })}
                    onSubmit={(values) => alert(JSON.stringify(values))}
                >
                    {() => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.userName_block}>
                                    <span className={styles.userNameLabel}>Username</span>
                                    <Input placeholder='Username' className={styles.userNameInput} type="string" name="userName" />
                                    <ErrorMessage className={styles.error} name="userName" component="p" />
                                </div>
                                <div className={styles.email_block}>
                                    <span className={styles.emailLabel}>Email address</span>
                                    <Input placeholder='Email address' className={styles.emailInput} type="email" name="email" />
                                    <ErrorMessage className={styles.error} name="email" component="div" />
                                </div>
                                <div className={styles.password_block}>
                                    <span className={styles.passwordlabel}> New password </span>
                                    <Input placeholder='New password' className={styles.passwordInput} type="password" name="newPassword" />
                                    <ErrorMessage className={styles.error} name="newPassword" component="div" />
                                </div>
                                <div className={styles.avatarImage_block}>
                                    <span className={styles.avatarImagelabel}>Avatar image</span>
                                    <Input placeholder='Avatar image' className={styles.avatarImageInput} type="file" name="avatarImage" />
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