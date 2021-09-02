import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const SignUp = () => {
    return (
        <>
            <div className={styles.signUp_block}>
                <h1 className={styles.title}>Create new account</h1>
                <Formik
                    initialValues={{ userName: '', email: '', password: '', repeatPassword: '', agriment: false }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        pasword: Yup.string().password().minSymbols(3, 'The pasword should be longer 3').required('Required'),
                        repeatPassword: Yup.string().password().minSymbols(3, 'The pasword should be longer 3').required('Required'),
                        agriment: Yup.boolean().required('true')
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
                                    <span className={styles.passwordlabel}> Password </span>
                                    <Input placeholder='Password' className={styles.passwordInput} type="password" name="password" />
                                    <ErrorMessage className={styles.error} name="password" component="div" />
                                </div>
                                <div className={styles.repeatPassword_block}>
                                    <span className={styles.repeatPasswordlabel}>Repeat Password </span>
                                    <Input placeholder='Password' className={styles.repeatPasswordInput} type="password" name="password" />
                                    <ErrorMessage className={styles.error} name="password" component="div" />
                                </div>


                            </div>
                            <div className={styles.checkbox_block}>
                                <span className={styles.checkboxlabel}>Repeat Password </span>
                                <Checkbox className={styles.checkbox} name="agriment" />
                                <ErrorMessage className={styles.error} name="agriment" component="div" />
                            </div>
                            <div className={styles.button_block}>
                                <button className={styles.button} type="submit">
                                    Login
                                </button>
                                <span className={styles.under_button}>Already have an account?' <Link to='/sign-in'>Sign In.</Link ></span>

                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}