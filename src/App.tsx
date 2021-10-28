import './App.scss';
import { Artical } from './Components/Article/Article';
import { ArticalList } from './Components/ArticalList/ArticalList';
import { Header } from './Components/Header/Header';
import { Route } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn/SignIn';
import { EditProfile } from './Components/Auth/EditProfile/EditProfile';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { NewArticale } from './Components/Auth/NewArticale/NewArticale';
import { ErrorBoundary } from './Components/ErroProcessing/ErrorBoundary';
import { useHistory } from 'react-router';


const App = () => {
  const history = useHistory()
  const path = history.location.pathname
  const currentSlug = path.slice((path.indexOf(':') + 1))
  console.log(currentSlug);


  return (
    <div className="App">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path={`/articles/${currentSlug}/edit`} component={NewArticale} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route exact path={`/articles/:${currentSlug}`} component={Artical} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route exact path={'/' || '/articles'} component={ArticalList} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path='/sign-in' component={SignIn} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path='/sign-up' component={SignUp} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path='/profile' component={EditProfile} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Route path='/new-article' component={NewArticale} />
      </ErrorBoundary>
    </div>
  );
}

export default App;