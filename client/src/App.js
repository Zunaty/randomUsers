import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  async function userDataFetch() {
    // sending a request for the user data, since the api is limited to a max of 5000 per pull,
    // instead four seperate requests of 2000 to reach the requested amount of 7000
    const [fetchOne, fetchTwo, fetchThree, fetchFour] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/users'),
      fetch('/api/users'),
      fetch('/api/users')
    ]);

    // converting response to json
    const fetch1 = await fetchOne.json();
    const fetch2 = await fetchTwo.json();
    const fetch3 = await fetchThree.json();
    const fetch4 = await fetchFour.json();

    // pulling only results from the responses
    let arr1 = fetch1.results;
    let arr2 = fetch2.results;
    let arr3 = fetch3.results;
    let arr4 = fetch4.results;

    // combining all the responses into one array
    let combinedArray = arr1.concat(arr2, arr3, arr4);

    // moving data into the useState
    setData(combinedArray);
  }

  useEffect(() => {
    userDataFetch()
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Random User List
        </h1>
      </header>

      <body>

      </body>
    </div>
  );
}

export default App;