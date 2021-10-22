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
import { useState } from 'react';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';


export const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSuccess, setIsSuccess] = useState(false)
    const error = useSelector((state: AppStateType) => state.auth.allErrors?.signUp)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    if (isAuth) {
        setTimeout(() => { history.push('/'); setIsSuccess(false) }, 2500)
    }
    if (isFetching) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.signUp_block}>
                {isSuccess ? <span className={styles.success}>&#9989; Your account succesefully created</span> : null}
                <ErrorBlock error={error} />
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
                    onSubmit={(values) => { dispatch(getRegistration(JSON.stringify({ user: { username: values.userName, email: values.email, password: values.password } }))); error ? setIsSuccess(true) : setIsSuccess(false) }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Username</span>
                                    <Input
                                        placeholder='Username'
                                        className={(formik.errors.userName && formik.touched.userName) ? styles.errorInput : styles.input_elem}
                                        type="string"
                                        name="userName" />
                                    {formik.errors.userName ? <ErrorMessage className={styles.error} name="userName" component="p" /> : null}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Email address</span>
                                    <Input
                                        placeholder='Email address'
                                        className={(formik.errors.email && formik.touched.email) ? styles.errorInput : styles.input_elem}
                                        type="email"
                                        name="email" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="email"
                                        component="div" />
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}> Password </span>
                                    <Input
                                        placeholder='Password'
                                        className={(formik.errors.password && formik.touched.password) ? styles.errorInput : styles.input_elem}
                                        type="password" name="password" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="password"
                                        component="div" />
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Repeat Password </span>
                                    <Input
                                        placeholder='Password'
                                        className={(formik.errors.repeatPassword && formik.touched.repeatPassword) ? styles.errorInput : styles.input_elem}
                                        type="password"
                                        name="repeatPassword" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="repeatPassword"
                                        component="div" />
                                </div>
                            </div>
                            <p className={styles.line}></p>
                            <div className={styles.checkbox_block}>
                                <span className={formik.errors.agriment ? styles.checkboxlabelError : styles.checkboxlabel}>Copy
                                    I agree to the processing of my personal information </span>
                                <Checkbox
                                    className={styles.checkbox}
                                    name="agriment" />
                                <ErrorMessage
                                    className={styles.checkboxError}
                                    name="agriment" component="div" />
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