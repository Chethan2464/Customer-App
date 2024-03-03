import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Show from './components/Show';

const App = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [sortData, setSortData] = useState('date');
  const [pageData, setPageData] = useState(1);
  const [orderData, setOrderData] = useState(true); // true for DESC

  const getData = async () => {
    try {
      // Construct the URL with query parameters
      const url = new URL('http://localhost:5000');
      url.searchParams.set('searchData', searchData);
      url.searchParams.set('sortData', sortData);
      url.searchParams.set('pageData', pageData);
      url.searchParams.set('orderData', orderData);

      // Send GET request to the server
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Parse the response JSON data
      const jsonData = await response.json();

      // Update the state with the received data
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [searchData, sortData, pageData, orderData]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await getData();
  };

  const handleInputChange1 = (e) => {
    setSearchData(e.target.value);
  };

  const setSorting = (sortBy) => {
    if (sortBy === sortData) {
      setOrderData(!orderData);
    } else {
      setSortData(sortBy);
      setOrderData(true);
    }
    setPageData(1);
  };

  
  const toggleOrder = () => {
    setOrderData(!orderData); 
  };

  
  const getSortButtonLabel = (orderData) => {
    const order = orderData ? 'Descending' : 'Ascending';
    return `${order} Order`;
  };

  return (
    <div className='container'>
      <div className='d-flex'>
        {/* Search input field */}
        <div>
          <h4 className="text-center mt-2 mb-3">Search Customer Information</h4>
          <form className="mt-5" onSubmit={onSubmitForm}>
            <label className="form-label">Search by Name or Location</label>
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control h-25"
                  value={searchData}
                  onChange={handleInputChange1}
                />
                <button type="submit" className="btn btn-warning mb-3 ms-2">
                  <i className="material-icons">search</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Sorting options */}
<div className='m-5'>
        <div className="d-flex">
          
          <div className="h-10 mt-5">
            <button
              onClick={() => setSorting('date')}
              
              className="m-3 btn btn-warning"
            >
              Sort By Date
            </button>
            <button
              onClick={() => setSorting('time')}
              className="m-3 btn btn-warning"
            >
              Sort By Time
            </button>
            
          {/* Toggle sorting order button */}
          <button
              onClick={toggleOrder}
              className="m-3 btn btn-secondary"
            >
              {getSortButtonLabel(orderData)}
            </button>
            </div>
        </div>
      </div>
      </div>
      
      {/* Show component to display data */}
      <div><Show data={data} /></div>
    </div>
  );
};

export default App;
