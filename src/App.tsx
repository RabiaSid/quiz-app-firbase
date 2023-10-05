import { Provider } from 'react-redux';
import './App.css';
import AppRouter from './config/router/index';
import Store from './config/redux/store';

function App() {
  return <>
    <Provider store={Store}>
      <AppRouter />
    </Provider>
  </>
}

export default App;
