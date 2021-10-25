import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import styles from '../Forms.module.scss';
import { Link } from 'react-router-dom';
import { getMeAuth } from '../../../redux/authReducer';
import { UsersLType } from '../../../API/API';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/rootReducer';
import Preloader from '../../Common/Preloader';
import { useState } from 'react';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';


export const SignIn = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const error = useSelector((state: AppStateType) => state.auth.allErrors?.signIn)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const username = useSelector((state: AppStateType) => state.auth.users.username)
    const [localEmail, setLocalEmail] = useState('')
    const [localPassword, setLocalPassword] = useState('')
    const initialValues: UsersLType = {
        email: localEmail,
        password: localPassword
    }
    if (isAuth) {
        setTimeout(() => {
            history.push('/')
        }, 3000);
    }
    if (isAuth) {
        return (
            <p className={styles.success_block_SignIn}>
                <p className={styles.success_signIn}>&#9989;{`${username} you're succesefully login`}</p>
            </p>
        )
    }
    if (isFetching) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.all_forms_block}>
                <ErrorBlock error={error} />
                <h1 className={styles.title}>Sign in</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email should be filled'),
                        password: Yup.string().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`).required('Password should be filled')
                    })}
                    onSubmit={(values) => { dispatch(getMeAuth(JSON.stringify({ user: { email: values.email, password: values.password } }))); }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}> Email address </span>
                                    <Input
                                        onChange={(event) => setLocalEmail((event.target.value))}
                                        placeholder='Email address'
                                        className={formik.errors.email && formik.touched.email ? styles.errorInput : styles.input_elem}
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
                                        onChange={(event) => setLocalPassword(event.target.value)}
                                        placeholder='Password'
                                        className={formik.errors.password && formik.touched.password ? styles.errorInput : styles.input_elem}
                                        type="password"
                                        name="password" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="password"
                                        component="div" />
                                </div>
                                <div className={styles.button_block}>
                                    <button className={styles.button} type="submit">
                                        Login
                                    </button>
                                    <p className={styles.under_button}>Don’t have an account?' <Link to='/sign-up'>Sign Up.</Link ></p>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}