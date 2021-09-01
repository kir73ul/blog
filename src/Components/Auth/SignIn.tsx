import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'


export const SignIn = () => {
    return (
        <>
            <div>
                <h1>Any place in your app!</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema= {Yup.object({
                        email:Yup.string().email('Invalid email address').required('Required'),
                        pasword: Yup.string().password().required('Required')
                    })}
                    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}


                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}