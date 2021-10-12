import styles from './NewArticale.module.scss';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createNewArticle, removeTag, setTags } from '../../redux/newArticleReducer';
import { AppStateType } from '../../redux/rootReducer';
import Preloader from '../Common/Preloader';

const taggsSchema = Yup.array().of(Yup.string().nullable().min(1, `It shouldn't be empty`))

export const NewArticale = () => {
    const dispatch = useDispatch()
    const tags = useSelector((state: AppStateType) => state.newArtical.tags)
    const isFetching = useSelector((state: AppStateType) => state.newArtical.isFetching)
    const [localTag, SetLocalTag] = useState('')
    const [localTitle, SetlocalTitle] = useState('')
    const [localShortDescription, SetlocalShortDescription] = useState('')
    const [localText, SetlocalText] = useState('')
    let [count, setCount] = useState(-1)
    const initialValues = {
        title: localTitle,
        shortDescription: localShortDescription,
        text: localText,
        tags: [...tags]
    }
    if (isFetching) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.createArticle_block}>
                <h1 className={styles.title}>Create new article</h1>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        shortDescription: Yup.string().required('Required'),
                        text: Yup.string().required('Required'),
                        tags: Yup.array().of(Yup.string().nullable().min(1, `It shouldn't be empty`))
                    })}
                    onSubmit={(values) => {
                        dispatch(createNewArticle((JSON.stringify({
                            article: {
                                title: values.title,
                                description: values.shortDescription,
                                body: values.text,
                                tagList: values.tags
                            }
                        }))))
                    }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.title_block}>
                                <span className={styles.titleLabel}>Title</span>
                                <Input onChange={(event) => SetlocalTitle(event.target.value)} placeholder='Title' className={styles.titleInput} type="input" name="title" />
                                <ErrorMessage className={styles.error} name="title" component="div" />
                            </div>
                            <div className={styles.shortDescription_block}>
                                <span className={styles.shortDescriptionlabel}> Short description </span>
                                <Input onChange={(event) => SetlocalShortDescription(event.target.value)} placeholder='Short description' className={styles.shortDescriptionInput} type="input" name="shortDescription" />
                                <ErrorMessage className={styles.error} name="shortDescription" component="div" />
                            </div>
                            <div className={styles.text_block}>
                                <span className={styles.textLabel}> Text </span>
                                <Input.TextArea onChange={(event) => SetlocalText(event.target.value)} placeholder='text' className={styles.textInput} name="text" />
                                <ErrorMessage className={styles.error} name="text" component="div" />
                            </div>
                            <div className={styles.tags_block}>
                                <span className={styles.textLabel}> Tags </span>
                                {formik.values.tags.map((tag) => {
                                    setCount(count)
                                    return (
                                        <div key={count} className={styles.singleTag_Block} >
                                            <Input disabled={true} className={styles.singleTagInput} type="text" name='tag' value={tag} />
                                            <Button onClick={() => { dispatch(removeTag(count)) }} className={styles.singleTagBtn} type="primary"> Delete</Button>
                                            <ErrorMessage className={styles.error} name='tag' component="div" />
                                        </div>
                                    )
                                })}
                                <div className={styles.singleTag_Block}>
                                    <Input onChange={(event) => SetLocalTag(event.target.value)} placeholder='Tag' className={styles.singleTagInput} type="text" name='tag' />
                                    <Button onClick={() => { setTags('') }} className={styles.singleTagBtn} type="primary"> Delete</Button>
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