import './../../App.scss';
import { Artical } from '../Article/Article';
import ArticalList from '../ArticalList/ArticalList';
import { Route } from 'react-router-dom';
import { SignIn } from '../Auth/SignIn/SignIn';
import { EditProfile } from '../Auth/EditProfile/EditProfile';
import { SignUp } from '../Auth/SignUp/SignUp';
import { NewArticale } from '../Auth/NewArticale/NewArticale';
import { ErrorBoundary } from '../ErroProcessing/ErrorBoundary';
import Preloader from '../Common/Preloader';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/rootReducer';

const Body = () => {
  const isFetching = useSelector((state: AppStateType) => state.common.isFetching)
  return (
    isFetching ? <Preloader /> :
      <div className='App'>
        <ErrorBoundary>
          <Route path={`/articles/:slug/edit`} component={NewArticale} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path={`/articles/:slug`} component={Artical} />
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
export default Body;