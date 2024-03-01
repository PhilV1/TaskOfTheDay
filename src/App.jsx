import axios from 'axios';
import { useState, useEffect } from 'react';
import Panel from './components/Panel';
import ClipLoader from 'react-spinners/ClipLoader';
import Searchbar from './components/Searchbar';

const url = 'https://www.boredapi.com/api/activity';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      if (data) {
        setData(data.activity);
      } else {
        setData('No activity found');
      }
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500 flex-col ">
      <h1 className="font-bold text-white py-4 text-3xl">Task generator.</h1>
      {loading ? (
        <ClipLoader
          color={'#22c55e'}
          loading={loading}
          size={50}
          className="my-8"
        />
      ) : (
        <div className="flex">
          <Panel>{data}</Panel>
          <button className="bg-red-500 h-fit my-8">Save</button>
        </div>
      )}
      <button
        className="bg-white rounded-md text-xl font-medium p-2 hover:bg-green-500 duration-200 ease-in-out"
        onClick={handleClick}
      >
        Another Task
      </button>
      <div>
        <h2 className="text-white font-bold text-center py-4 text-3xl">
          ToDo List
        </h2>
        <Searchbar />
      </div>
    </div>
  );
}
export default App;
