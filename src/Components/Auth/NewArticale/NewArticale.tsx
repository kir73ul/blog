import styles from './../NewArticale.module.scss';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createNewArticle, editArticle } from '../../../redux/articalesReducer';
import { AppStateType } from '../../../redux/rootReducer';
import { useHistory } from 'react-router';
import { ErrorBlock } from '../../ErroProcessing/ErrorBlock';
import { getArticles } from '../../../redux/articalesReducer';
import { cooky } from '../../../API/API';

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
        dispatch(getArticles(1, 5))
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
            <div className={styles.createArticle}>
                <ErrorBlock error={errorArticle} />
                <h1 className={styles.createArticle__title}>{isEditingArticle ? 'Edit article' : 'Create new article'}</h1>
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
                        isEditingArticle ? dispatch(editArticle(articleDataJSON, slug)) : dispatch(createNewArticle(articleDataJSON))
                        if (isEditingArticle && values.title !== title && isSuccess) {

                            const secondPartOfSlug = slug.slice(slug.lastIndexOf('-') + 1)
                            console.log(secondPartOfSlug);

                            history.push(`/articles/${values.title}-${secondPartOfSlug}`)
                        }
                    }}
                >
                    {(formik) => (
                        <Form >
                            <div className={styles.createArticle__input}>
                                <span className={styles.createArticle__label}>Title</span>
                                <Input
                                    onChange={(event) => SetlocalTitle(event.target.value)}
                                    placeholder='Title'
                                    className={(formik.errors.title && formik.touched.title) ? [styles.input_inputError, styles.input__elem].join(' ') : styles.input__elem}
                                    type="input"
                                    name="title" />
                                <ErrorMessage className={styles.createArticle__error} name="title" component="div" />
                            </div>
                            <div className={styles.createArticle__input}>
                                <span className={styles.createArticle__label}> Short description </span>
                                <Input
                                    onChange={(event) => SetlocalShortDescription(event.target.value)} placeholder='Short description'
                                    className={(formik.errors.shortDescription && formik.touched.shortDescription) ? [styles.input_inputError, styles.input__elem].join(' ') : styles.input__elem}
                                    type="input"
                                    name="shortDescription" />
                                <ErrorMessage className={styles.createArticle__error} name="shortDescription" component="div" />
                            </div>
                            <div className={styles.createArticle__text}>
                                <span className={styles.createArticle__label}> Text </span>
                                <Input.TextArea
                                    onChange={(event) => SetlocalText(event.target.value)}
                                    placeholder='Text'
                                    className={(formik.errors.text && formik.touched.text) ? [styles.input_textError, styles.input__textInput].join(' ') : styles.input__textInput}
                                    name="text" />
                                <ErrorMessage
                                    className={styles.createArticle__error}
                                    name="text"
                                    component="div" />
                            </div>
                            <div className={styles.createArticle__tags}>
                                <span className={styles.createArticle__label}> Tags </span>
                                {formik.values.tags.map((tag, idx) => {
                                    return (
                                        <div key={tag} className={styles.createArticle__tags__singleTag} >
                                            <Input
                                                disabled={true}
                                                className={styles.createArticle__tags__singleTag__input}
                                                type="text"
                                                name='tag'
                                                value={tag} />
                                            <Button
                                                onClick={() => { setArrayOfTags(removeTag(arrayOfTags, idx)) }}
                                                className={styles.createArticle__tags__singleTag__btn}
                                                type="primary"> Delete</Button>
                                            <ErrorMessage
                                                className={styles.createArticle__error}
                                                name='tag'
                                                component="div" />
                                        </div>
                                    )
                                })}
                                <div className={styles.createArticle__tags__singleTag}>
                                    <Input
                                        onChange={(event) => SetLocalTag(event.target.value)}
                                        placeholder='Tag'
                                        className={(formik.errors.tags && formik.touched.tags) ? [styles.input_inputError, styles.createArticle__tags__singleTag__input].join(' ') : styles.createArticle__tags__singleTag__input}
                                        type="text"
                                        name='tag'
                                        value={localTag} />
                                    <Button
                                        onClick={() => { SetLocalTag('') }}
                                        className={styles.createArticle__tags__singleTag__btn}
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
                                        className={styles.createArticle__tags__singleTag__addBtn}
                                        type="primary" > Add</Button>
                                    <ErrorMessage
                                        className={styles.createArticle__error}
                                        name='tag'
                                        component="div" />
                                    {!localTag ? <p className={styles.createArticle__error}>{tagError} </p> : null}
                                </div>
                            </div>
                            <button className={styles.createArticle__button} type="submit">
                                Send
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
