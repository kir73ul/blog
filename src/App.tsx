import './App.scss';
import { Artical } from './Components/Article/Article';
import { ArticalList } from './Components/ArticalList/ArticalList';
import { Header } from './Components/Header/Header';
import { Route, Switch, useParams } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn/SignIn';
import { EditProfile } from './Components/EditProfile/EditProfile';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { NewArticale } from './Components/NewArticale/NewArticale';
import { useSelector } from 'react-redux';
import { AppStateType } from './redux/rootReducer';
import { ErrorBoundary } from './Components/ErroProcessing/ErrorBoundary';

const App = () => {
  const currentSlug = useSelector((state: AppStateType) => state.articles.currentSlug)
  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Route path={`/articles/:${currentSlug}`} component={Artical} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route exact path={'/' || '/articles'} component={ArticalList} />
      </ErrorBoundary>

      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/profile' component={EditProfile} />
      <Route path='/new-article' component={NewArticale} />
    </div>
  );
}

export default App;