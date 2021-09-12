import './App.scss';
import { Artical } from './Components/Article/Article';
import { ArticalList } from './Components/ArticalList/ArticalList';
import { Header } from './Components/Header/Header';
import { Route } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn/SignIn';
import { EditProfile } from './Components/EditProfile/EditProfile';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { NewArticale } from './Components/NewArticale/NewArticale';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path='/articles/:' component={Artical} />
      <Route exact path={'/' || '/articles'} component={ArticalList} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/profile' component={EditProfile} />
      <Route path='/new-article' component={NewArticale} />
    </div>
  );
}

export default App;