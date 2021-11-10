import styles from './../NewArticale.module.scss';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createOrEditArticle, setCurrentPage } from '../../../redux/articalesReducer';
import { AppStateType } from '../../../redux/rootReducer';
import { useHistory } from 'react-router';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';
import { cooky } from '../../../API/API';
import { getErrorInfo, hasErrorOnInput } from '../../Common/helper';
import { getError } from '../../../redux/newArticleReducer';

export const NewArticale = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isEditingArticle = history.location.pathname.includes('edit')
    const isSuccess = useSelector((state: AppStateType) => state.newArtical.isSuccess)
    const articleData = useSelector((state: AppStateType) => state.articles.currentArticle)
    const errorArticle = useSelector((state: AppStateType) => state.newArtical.errorArtical)
    const currentSlug = useSelector((state: AppStateType) => state.articles.currentSlug)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const title = (articleData && isEditingArticle) ? articleData.title : ''
    const description = (articleData && isEditingArticle) ? articleData.description : ''
    const text = (articleData && isEditingArticle) ? articleData.body : ''
    const tags: string[] = (articleData && isEditingArticle) ? articleData.tagList : []
    let slug: string = (articleData && isEditingArticle) ? articleData.slug : ''

    const [localTag, SetLocalTag] = useState<string>('')
    const [tagError, SetTagError] = useState<null | string>(null)
    const [localTitle, SetlocalTitle] = useState<string>(title)
    const [localShortDescription, SetlocalShortDescription] = useState<string>(description)
    const [localText, SetlocalText] = useState<string>(text)
    const [arrayOfTags, setArrayOfTags] = useState<string[]>(tags)

    const removeTag = (tags: string[], index: number) => {
        return tags.filter((_, idx) => idx !== index)
    }
    const redirectToMainPage = () => {
        dispatch(setCurrentPage(1))
        history.push('/')
    }
    let initialValues = {
        title: localTitle,
        shortDescription: localShortDescription,
        text: localText,
        tags: arrayOfTags
    }
    if (!cooky && !isAuth) {
        history.push('/sign-in')
    }
    if (isSuccess) {
        setTimeout(() => {
            isEditingArticle ? history.push(`/articles/${currentSlug}`) : redirectToMainPage()
        }, 3000)
        const action = (isEditingArticle ? 'edited' : 'created')
        return (
            <div className={styles.articleSuccess}>
                <p className={styles.success}>&#9989;{`Your article is succesefully ${action}`}</p>
            </div>
        )
    }
    return (
        <>
            <div className={styles[`create-Article`]}>
                <ErrorBlock error={errorArticle} />
                <h1 className={styles.formTitle}>{isEditingArticle ? 'Edit article' : 'Create new article'}</h1>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={Yup.object({
                        title: Yup.string().required('The title should be filled'),
                        shortDescription: Yup.string().required('The description should be filled'),
                        text: Yup.string().required('The text should be filled'),
                        tags: Yup.array().of(Yup.string().min(1, `It shouldn't be empty`)),
                    })}
                    onSubmit={(values) => {
                        const articleDataJSON = JSON.stringify({
                            article: {
                                title: values.title,
                                description: values.shortDescription,
                                body: values.text,
                                tagList: values.tags
                            }
                        })
                        dispatch(createOrEditArticle(articleDataJSON, slug, isEditingArticle))
                    }}
                >
                    {(formik) => (
                        <Form className={styles.formWrap}>
                            <div className={styles.inputBlock}>
                                <span className={styles.inputLabel}>Title</span>
                                <Input
                                    onChange={(event) => { SetlocalTitle(event.target.value); errorArticle && dispatch(getError(null)) }}
                                    placeholder='Title'
                                    className={((formik.errors.title && formik.touched.title) || errorArticle?.title) ? `${styles.inputElem_error} ${styles.inputElem}` : styles.inputElem}
                                    type="input"
                                    name="title" />
                                <ErrorMessage className={styles.inputError} name="title" component="div" />
                                {(errorArticle?.title && <div className={styles.inputError}>{errorArticle?.title}</div>)}
                            </div>
                            <div className={styles.inputBlock}>
                                <span className={styles.inputLabel}> Short description </span>
                                <Input
                                    onChange={(event) => SetlocalShortDescription(event.target.value)} placeholder='Short description'
                                    className={(formik.errors.shortDescription && formik.touched.shortDescription) ? `${styles.inputElem_error} ${styles.inputElem}` : styles.inputElem}
                                    type="input"
                                    name="shortDescription" />
                                <ErrorMessage className={styles.inputError} name="shortDescription" component="div" />
                            </div>
                            <div className={styles.textAreaBlock}>
                                <span className={styles.inputLabel}> Text </span>
                                <Input.TextArea
                                    onChange={(event) => SetlocalText(event.target.value)}
                                    placeholder='Text'
                                    className={(formik.errors.text && formik.touched.text) ? `${styles.textAreaInput_error} ${styles.textAreaInput}` : styles.textAreaInput}
                                    name="text" />
                                <ErrorMessage
                                    className={styles.inputError}
                                    name="text"
                                    component="div" />
                            </div>
                            <div className={styles.tagsBlock}>
                                <span className={styles.inputLabel}> Tags </span>
                                {formik.values.tags.map((tag, idx) => {
                                    return (
                                        <div key={tag} className={styles.singleTag} >
                                            <Input
                                                disabled={true}
                                                className={styles.singleTagInput}
                                                type="text"
                                                name='tag'
                                                value={tag} />
                                            <Button
                                                onClick={() => { setArrayOfTags(removeTag(arrayOfTags, idx)) }}
                                                className={styles.singleTagBtn}
                                                type="primary"> Delete</Button>
                                            <ErrorMessage
                                                className={styles.inputError}
                                                name='tag'
                                                component="div" />
                                        </div>
                                    )
                                })}
                                <div className={styles.singleTag}>
                                    <Input
                                        onChange={(event) => SetLocalTag(event.target.value)}
                                        placeholder='Tag'
                                        className={(formik.errors.tags && formik.touched.tags) ? `${styles.inputElem_error} ${styles.singleTagInput}` : styles.singleTagInput}
                                        type="text"
                                        name='tag'
                                        value={localTag} />
                                    <Button
                                        onClick={() => { SetLocalTag('') }}
                                        className={styles.singleTagBtn}
                                        type="primary"> Delete</Button>
                                    <Button
                                        onClick={() => {
                                            if (localTag) {
                                                SetTagError(null);
                                                setArrayOfTags([...arrayOfTags, localTag])
                                                SetLocalTag('')
                                            } else if (!localTag) {
                                                SetTagError('If you`d like to add tag, the tag field shouldn`t be empty')
                                            }
                                        }}
                                        className={styles.singleTagAddBtn}
                                        type="primary" > Add tag</Button>
                                    <ErrorMessage
                                        className={styles.inputError}
                                        name='tag'
                                        component="div" />
                                    {!localTag ? <p className={`${styles.inputError} ${styles.nextLine}`}>{tagError} </p> : null}
                                </div>
                            </div>
                            <button className={styles.createButton} type="submit">
                                Send
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
