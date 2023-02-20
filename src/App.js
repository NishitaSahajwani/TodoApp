import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Todo from './component/Todo';

export const axiosObject = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})

function App() {
  return (
    <div className="App">
     <Todo/>
    </div>
  );
}

export default App;
