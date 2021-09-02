import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import styles from './SignIn.module.scss';
import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const SignIn = () => {
    return (
        <>
            <div className={styles.signIn_block}>
                <h1 className={styles.title}>Sign in</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        pasword: Yup.string().password().minSymbols(3, 'The pasword should be longer 3').required('Required')
                    })}
                    onSubmit={(values) => alert(JSON.stringify(values))}
                >
                    {() => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.email_block}>
                                    <span className={styles.emailLabel}> Email address </span>
                                    <Input placeholder='Email address' className={styles.emailInput} type="email" name="email" />
                                    <ErrorMessage className={styles.error} name="email" component="div" />
                                </div>
                                <div className={styles.password_block}>
                                    <span className={styles.passwordlabel}> Password </span>
                                    <Input placeholder='Password' className={styles.passwordInput} type="password" name="password" />
                                    <ErrorMessage className={styles.error} name="password" component="div" />
                                </div>
                            </div>
                            <div className={styles.button_block}>
                                <button className={styles.button} type="submit">
                                    Login
                                </button>
                                <span className={styles.under_button}>Don’t have an account?' <Link to='/sign-up'>Sign Up.</Link ></span>

                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}