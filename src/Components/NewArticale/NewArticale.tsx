import styles from './NewArticale.module.scss';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { removeTag, setTags } from '../../redux/newArticleReducer';
import { AppStateType } from '../../redux/rootReducer';

const taggsSchema = Yup.array().of(Yup.string().max(1, `It shouldn't be empty`))

export const NewArticale = () => {
    const dispatch = useDispatch()
    const tags = useSelector((state: AppStateType) => state.newArtical.tags)
    const [localTag, SetLocalTag] = useState('')
    const initialValues = {
        title: '',
        shortDescription: '',
        text: '',
        tags: [...tags]
    }
    return (
        <>
            <div className={styles.createArticle_block}>
                <h1 className={styles.title}>Sign in</h1>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        shortDescription: Yup.string().required('Required'),
                        text: Yup.string().required('Required'),
                        tags: taggsSchema
                    })}

                    onSubmit={(values) => {
                        alert((JSON.stringify(values))); console.log(values);
                    }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.title_block}>
                                <span className={styles.titleLabel}>Title</span>
                                <Input placeholder='Title' className={styles.titleInput} type="input" name="title" />
                                <ErrorMessage className={styles.error} name="title" component="div" />
                            </div>
                            <div className={styles.shortDescription_block}>
                                <span className={styles.shortDescriptionlabel}> Short description </span>
                                <Input placeholder='Short description' className={styles.shortDescriptionInput} type="input" name="shortDescription" />
                                <ErrorMessage className={styles.error} name="shortDescription" component="div" />
                            </div>
                            <div className={styles.text_block}>
                                <span className={styles.textLabel}> Text </span>
                                <Input.TextArea placeholder='text' className={styles.textInput} name="text" />
                                <ErrorMessage className={styles.error} name="text" component="div" />
                            </div>
                            <div className={styles.tags_block}>
                                <span className={styles.textLabel}> Tags </span>
                                {formik.values.tags.map((tag) => {
                                    return (
                                        <div key={tag} className={styles.singleTag_Block} >
                                            <Input disabled={true} className={styles.singleTagInput} type="text" name='tag' value={tag} />
                                            <Button onClick={() => { dispatch(removeTag(tag)) }} className={styles.singleTagBtn} type="primary"> Delete</Button>
                                            <ErrorMessage className={styles.error} name='tag' component="div" />
                                        </div>
                                    )
                                })}
                                <div className={styles.singleTag_Block}>
                                    <Input onChange={(event) => SetLocalTag(event.target.value)} placeholder='Tag' className={styles.singleTagInput} type="text" name='tag' />
                                    <Button onClick={() => { }} className={styles.singleTagBtn} type="primary"> Delete</Button>
                                    <Button onClick={() => { dispatch(setTags(localTag)); SetLocalTag('') }} className={styles.singleTagBtnAdd} type="primary" > Add</Button>
                                    <ErrorMessage className={styles.error} name='tag' component="div" />

                                </div>
                            </div>
                            <button className={styles.button} type="submit">
                                Send
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}