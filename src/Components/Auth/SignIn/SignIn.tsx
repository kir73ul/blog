import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import styles from './SignIn.module.scss';
import { Link } from 'react-router-dom';
import { getMeAuth } from '../../../redux/authReducer';
import { UsersLType } from '../../../API/API';
import { useDispatch } from 'react-redux';



export const SignIn = () => {
    const dispatch = useDispatch()

    const initialValues: UsersLType = {
        /*  users: { */
        email: '',
        password: ''
        /*  } */
    }

    return (
        <>
            <div className={styles.signIn_block}>
                <h1 className={styles.title}>Sign in</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`).required('Required')
                    })}
                    //@ts-ignore
                    onSubmit={(values) => { dispatch(getMeAuth(values.email, values.password)) }}
                >
                    {(formik) => (
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