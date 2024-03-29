import { Formik, ErrorMessage } from 'formik'
import { Form, Input } from 'formik-antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { updateUserInfo } from '../../../redux/authReducer'
import { AppStateType } from '../../../redux/rootReducer'
import styles from '../Forms.module.scss'
import _ from 'lodash'
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock'
import { useHistory } from 'react-router'
import { cooky } from '../../../API/API'

export const EditProfile = () => {
    const [isSomethingChanged, setisSomethingChanged] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    let isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    let username = useSelector((state: AppStateType) => state.auth.users.username)
    let userEmail = useSelector((state: AppStateType) => state.auth.users.email)
    let userAvatarImage = useSelector((state: AppStateType) => state.auth.users.image)
    const isSuccess = useSelector((state: AppStateType) => state.auth.isSuccess)
    const error = useSelector((state: AppStateType) => state.auth.allErrors?.updateError)

    const initialValuesData = {
        email: userEmail,
        username: username,
        password: '',
        image: userAvatarImage || ''
    }
    if (!isAuth && !cooky) {
        history.push('/sign-in')
    }
    return (
        <>
            <div className={styles.all_forms_block}>
                {isSuccess && <span className={styles.success}>&#9989; {`${username}, your data was updated`}</span>}
                {isSomethingChanged && <span className={styles.responseError}>{`${username}, you should change at least one parameter`}</span>}
                {/* <ErrorBlock error={error} /> */}
                <h1 className={styles.title}>Edit Profile</h1>
                <Formik
                    initialValues={initialValuesData}
                    enableReinitialize
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username should be filled'),
                        email: Yup.string().email('Invalid email address').required('Email should be filled'),
                        password: Yup.string().nullable().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`),
                        image: Yup.string().nullable().url("Website should be a valid URL")
                    })}
                    onSubmit={(values) => {
                        const userData = {
                            user: {
                                email: values.email,
                                username: values.username,
                                password: values.password,
                                image: values.image
                            }
                        }
                        if (!_.isEqual(userData.user, initialValuesData)) {
                            dispatch(updateUserInfo(userData))
                        } else if (_.isEqual(userData.user, initialValuesData)) {
                            setisSomethingChanged(true)
                            setTimeout(() => { setisSomethingChanged(false) }, 3000)
                        }
                    }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.form_block}>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Username</span><br />
                                    <Input
                                        onChange={() => { error?.username && delete error.username }}
                                        placeholder='Username'
                                        className={(formik.errors.username && formik.touched.username) || error?.username
                                            ?
                                            `${styles.errorInput} ${styles.input_elem}`
                                            :
                                            styles.input_elem}
                                        type="string"
                                        name="username" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="username"
                                        component="p" />
                                    {(error?.username && <div className={styles.error}>{error?.username}</div>)}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Email address</span>
                                    <Input
                                        onChange={() => { error?.email && delete error.email }}
                                        placeholder='Email address'
                                        className={(formik.errors.email && formik.touched.email) || error?.email
                                            ?
                                            `${styles.errorInput} ${styles.input_elem}`
                                            :
                                            styles.input_elem}
                                        type="email"
                                        name="email" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="email"
                                        component="div" />
                                    {(error?.email && <div className={styles.error}>{error?.email}</div>)}
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}> New password </span>
                                    <Input
                                        placeholder='New password'
                                        className={(formik.errors.password && formik.touched.password) || error?.password
                                            ?
                                            `${styles.errorInput} ${styles.input_elem}`
                                            :
                                            styles.input_elem}
                                        type="password"
                                        name="password" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="password"
                                        component="div" />
                                    {(error?.password && <div className={styles.error}>{error?.password}</div>)}

                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Avatar image (url)</span>
                                    <Input
                                        placeholder='Avatar image'
                                        className={(formik.errors.image && formik.touched.image) || error?.image
                                            ?
                                            `${styles.errorInput}  ${styles.input_elem}`
                                            :
                                            styles.input_elem}
                                        type="text"
                                        name="image" />
                                    <ErrorMessage
                                        className={styles.error}
                                        name="image"
                                        component="div" />
                                    {(error?.image && <div className={styles.error}>{error?.image}</div>)}
                                </div>
                                <div className={styles.button_block}>
                                    <button
                                        className={styles.button}
                                        type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}