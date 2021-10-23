import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateUserInfo } from '../../../redux/authReducer';
import { AppStateType } from '../../../redux/rootReducer';
import Preloader from '../../Common/Preloader';
import styles from '../Forms.module.scss';
import _ from 'lodash';
import { getDifferenceValue } from '../../Common/helper';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';

export const EditProfile = () => {
    const [isSomethingChanged, setisSomethingChanged] = useState(false)
    const dispatch = useDispatch()
    let username = useSelector((state: AppStateType) => state.auth.users.username)
    let userEmail = useSelector((state: AppStateType) => state.auth.users.email)
    let userAvatarImage = useSelector((state: AppStateType) => state.auth.users.image)
    const isFetching = useSelector((state: AppStateType) => state.auth.isFetching)
    const isSuccess = useSelector((state: AppStateType) => state.auth.isSuccess)
    const error = useSelector((state: AppStateType) => state.auth.allErrors?.updateError)

    const initialValuesData = {
        email: userEmail,
        username: username,
        password: '',
        image: userAvatarImage
    }
    const regMatch = '' || /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

    if (isFetching) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.all_forms_block}>
                {isSuccess ? <span className={styles.success}>&#9989; {`${username}, your data was updated`}</span> : null}
                {isSomethingChanged ? <span className={styles.responseError}>{`${username}, you should change at least one parameter`}</span> : null}
                <ErrorBlock error={error} />
                <h1 className={styles.title}>Edit Profile</h1>
                <Formik
                    initialValues={initialValuesData}
                    enableReinitialize
                    validationSchema={Yup.object({
                        username: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().nullable().min(3, 'The pasword should be longer than 3').max(40, `The pasword shouldn't be longer than 40`),
                        image: Yup.string().url(/* matches(regMatch ||  */ "Website should be a valid URL")
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
                            dispatch(updateUserInfo(getDifferenceValue(userData.user, initialValuesData)))
                        } else if (_.isEqual(userData.user, initialValuesData)) {
                            console.log(userData.user, initialValuesData);
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
                                        placeholder='Username'
                                        className={(formik.errors.username && formik.touched.username) ? styles.errorInput : styles.input_elem}
                                        type="string"
                                        name="username" />
                                    <ErrorMessage className={styles.error} name="username" component="p" />
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Email address</span>
                                    <Input
                                        placeholder='Email address'
                                        className={(formik.errors.email && formik.touched.email) ? styles.errorInput : styles.input_elem}
                                        type="email"
                                        name="email" />
                                    <ErrorMessage className={styles.error} name="email" component="div" />
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}> New password </span>
                                    <Input
                                        placeholder='New password'
                                        className={(formik.errors.password && formik.touched.password) ? styles.errorInput : styles.input_elem}
                                        type="password"
                                        name="password" />
                                    <ErrorMessage className={styles.error} name="password" component="div" />
                                </div>
                                <div className={styles.input_block}>
                                    <span className={styles.label_elem}>Avatar image (url)</span>
                                    <Input
                                        placeholder='Avatar image'
                                        className={(formik.errors.image && formik.touched.image) ? styles.errorInput : styles.input_elem}
                                        type="text"
                                        name="image" />
                                    <ErrorMessage className={styles.error} name="image" component="div" />
                                </div>
                                <div className={styles.button_block}>
                                    <button className={styles.button} type="submit">
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