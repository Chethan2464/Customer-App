import React, { Fragment, useState } from 'react';

const Show = (props) => {
  const [showData, setShowData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 20; 

  const toggleData = () => {
    setShowData(!showData);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = props.data.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(props.data.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div className=''>
        <button className="m-3 btn btn-dark align-center" onClick={toggleData}>
          {showData ? 'Hide Records' : 'Show Records'}
        </button>
        <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="bg-dark text-white page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="bg-dark text-white page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </li>
              </ul>
            </nav>
        {showData && (
          <div>
            <table className="table table-striped mt-3 text-center">
              <thead>
                <tr className='table table-dark'>
                  <th scope="col">S NO.</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Location</th>
                  <th scope="col" colSpan="2">Created At</th>
                </tr>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((row, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstRecord + index + 1}</td>
                    <td>{row.customer_name}</td>
                    <td>{row.age}</td>
                    <td>{row.phone}</td>
                    <td>{row.location}</td>
                    <td>{row.creation.created_date}</td>
                    <td>{row.creation.created_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Show;
