import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Checkbox } from 'formik-antd';
import * as Yup from 'yup';
import styles from '../Forms.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistration } from '../../../redux/authReducer';
import { AppStateType } from '../../../redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';
import { Button } from 'antd';


export const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const error = useSelector((state: AppStateType) => state.auth.allErrors?.signUp)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isSuccess = useSelector((state: AppStateType) => state.auth.isSuccess)
    const [localUserName, setLocalUserName] = useState('')
    const [localEmail, setlocalEmail] = useState('')
    const [localPassword, setlocalPassword] = useState('')
    const [localRepeatPassword, setlocalRepeatPassword] = useState('')
    if (isAuth) {
        setTimeout(() => { history.push('/') }, 2500)
    }
    return (
        <>
            <div className={styles.all_forms_block}>
                {isSuccess ? <p className={styles.success}>&#9989; Your account succesefully created</p> : null}
                <ErrorBlock error={error} />
                <h1 className={styles.title}>Create new account</h1>
                <Formik
                    initialValues={{ userName: localUserName, email: localEmail, password: localPassword, repeatPassword: localRepeatPassword, agriment: false }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Username should be filled').min(1, 'The username should be longer than 3').max(20, `The pasword shouldn't be longer than 20`),
                        email: Yup.string().email('Invalid email address').required('Email should be filled'),
                        password: Yup.string().min(1, 'The pasword should be longer than 3').max(40, `The password shouldn't be longer than 40`).required('Password should be filled'),
                        repeatPassword: Yup.string().oneOf([Yup.ref('password'), `Passwords don't match`]).min(1, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`).required('Password should be filled'),
                        agriment: Yup.boolean().oneOf([true], 'You should agree the condition')
                    })}
                    onSubmit={(values) => { dispatch(getRegistration(JSON.stringify({ user: { username: values.userName, email: values.email, password: values.password } }))) }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Username</span>
                                    <Input
                                        onChange={(event) => { setLocalUserName(event.target.value); error?.username && delete error.username }}
                                        placeholder='Username'
                                        className={(formik.errors.userName && formik.touched.userName) || error?.username ? `${styles.errorInput} ${styles.input_elem}` : styles.input_elem}
                                        type="string"
                                        name="userName" />
                                    <ErrorMessage className={styles.error} name="image" component="div" />
                                    {(error?.username && <div className={styles.error}>{error?.username}</div>)}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Email address</span>
                                    <Input
                                        onChange={(event) => { setlocalEmail(event.target.value); error?.email && delete error.email }}
                                        placeholder='Email address'
                                        className={((formik.errors.email && formik.touched.email)) || error?.email ? `${styles.errorInput} ${styles.input_elem}` : styles.input_elem}
                                        type="email"
                                        name="email" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="email"
                                        component="div" />
                                    {(error?.email && <div className={styles.error}>{error?.email}</div>)}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}> Password </span>
                                    <Input
                                        onChange={(event) => { setlocalPassword(event.target.value); error?.password && delete error.password }}
                                        placeholder='Password'
                                        className={(formik.errors.password && formik.touched.password) || error?.password ? `${styles.errorInput} ${styles.input_elem}` : styles.input_elem}
                                        type="password" name="password" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="password"
                                        component="div" />
                                    {(error?.password && <div className={styles.error}>{error?.password}
                                    </div>)}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Repeat Password </span>
                                    <Input
                                        onChange={(event) => setlocalRepeatPassword(event.target.value)}
                                        placeholder='Password'
                                        className={(formik.errors.repeatPassword && formik.touched.repeatPassword) ? `${styles.errorInput} ${styles.input_elem}` : styles.input_elem}
                                        type="password"
                                        name="repeatPassword" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="repeatPassword"
                                        component="div" />
                                </div>
                                <p className={styles.line}></p>
                                <div className={styles.checkbox_block}>
                                    <div className={formik.errors.agriment && formik.touched.agriment ? styles.checkbox_wrapper_error : styles.checkbox_wrapper}>
                                        <Checkbox
                                            className={styles.checkbox}
                                            name="agriment" />
                                        <p className={styles.checkboxlabel}> I agree to the processing of my personal information </p>
                                    </div>
                                    <ErrorMessage
                                        className={styles.error}
                                        name="agriment"
                                        component="div" />
                                </div>
                                <div className={styles.button_block}>
                                    <button className={styles.button} type="submit">
                                        Create
                                    </button>
                                    <p className={styles.under_button}>Already have an account?' <Link to='/sign-in'>Sign in.</Link ></p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}