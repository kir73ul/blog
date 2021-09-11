import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistration } from '../../../redux/authReducer';
import { AppStateType } from '../../../redux/rootReducer';
import { useHistory } from 'react-router-dom';
import Preloader from '../../Common/Preloader';


export const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    if (isAuth) {
        history.push('/articles')
    }
    if (isFetching) {
      return  <Preloader />
    }
    return (
        <>
            <div className={styles.signUp_block}>
                <h1 className={styles.title}>Create new account</h1>
                <Formik
                    initialValues={{ userName: '', email: '', password: '', repeatPassword: '', agriment: false }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`).required('Required'),
                        repeatPassword: Yup.string().oneOf([Yup.ref('password'), `Passwords don't match`]).min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`).required('Required'),
                        agriment: Yup.boolean().oneOf([true], 'You should agree condition')
                    })}
                    //@ts-ignore
                    onSubmit={(values) => dispatch(getRegistration(JSON.stringify({ user: { username: values.userName, email: values.email, password: values.password } })))}
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
                                    <Input placeholder='Password' className={styles.repeatPasswordInput} type="password" name="repeatPassword" />
                                    <ErrorMessage className={styles.error} name="repeatPassword" component="div" />
                                </div>
                            </div>
                            <span className={styles.line}></span>
                            <div className={styles.checkbox_block}>
                                <span className={styles.checkboxlabel}>Copy
                                    I agree to the processing of my personal information </span>
                                <Checkbox className={styles.checkbox} name="agriment" />
                                <ErrorMessage className={styles.checkboxError} name="agriment" component="div" />
                            </div>
                            <div className={styles.button_block}>
                                <button className={styles.button} type="submit">
                                    Create
                                </button>
                                <span className={styles.under_button}>Already have an account?' <Link to='/sign-in'>Sign in.</Link ></span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}