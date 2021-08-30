import { Pagination } from 'antd';
import './App.scss';
import { ArticlePreview } from './Components/ArticlePreview/ArticlePreview';
import { Body } from './Components/Body/Body';
import { Header } from './Components/Header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ArticlePreview />
      <div className='pagination'>
        <Pagination size="small" total={50} />
      </div>
    </div>
  );
}

export default App;
