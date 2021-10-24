import './App.scss';
import { Artical } from './Components/Article/Article';
import { ArticalList } from './Components/ArticalList/ArticalList';
import { Header } from './Components/Header/Header';
import { Route, Switch, useParams } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn/SignIn';
import { EditProfile } from './Components/Auth/EditProfile/EditProfile';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { NewArticale } from './Components/Auth/NewArticale/NewArticale';
import { useSelector } from 'react-redux';
import { AppStateType } from './redux/rootReducer';
import { ErrorBoundary } from './Components/ErroProcessing/ErrorBoundary';
import { ArticlePreview } from './Components/ArticalList/ArticlePreview/ArticlePreview';

const App = () => {
  const currentSlug = useSelector((state: AppStateType) => state.articles.currentSlug)
  const currentArticle = useSelector((state: AppStateType) => state.articles.currentArticle)
  console.log(currentSlug );

  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Route exact path={`/articles/:${currentSlug}`} component={Artical}/*  render={() => <ArticlePreview {...currentArticle} /> || null} */ />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route exact path={'/' || '/articles'} component={ArticalList} />
      </ErrorBoundary>
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/profile' component={EditProfile} />
      <Route path='/new-article' component={NewArticale} />
      <ErrorBoundary>
        <Route exact path={`/articles/${currentSlug}/edit`} component={NewArticale} />
      </ErrorBoundary>
    </div>
  );
}

export default App;