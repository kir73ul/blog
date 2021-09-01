import './App.scss';
import { Artical } from './Components/Article/Article';
import { ArticalList } from './Components/ArticalList/ArticalList';
import { Header } from './Components/Header/Header';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path={'/' || '/articles'} component={ArticalList} />
      <Route path='/articles/' component={Artical} />
    </div>
  );
}

export default App;