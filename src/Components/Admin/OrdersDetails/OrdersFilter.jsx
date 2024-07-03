import React, { useState } from 'react';
export const OrdersFilter = ({ handleSearchChange, searchQuery, handleFilter }) => {
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    paymentStatus: '',
    orderStatus: '',
    startDate: '',
    endDate: '',
    amountRange: '', // Add price range filter
  });

  const handleFilterButtonClick = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleFilterCategoryChange = (event) => {
    const newFilterOptions = { ...filterOptions, [event.target.name]: event.target.value };
    setFilterOptions(newFilterOptions);
    handleFilter(newFilterOptions);
  };

  const handleDateChange = (event, dateType) => {
    const newFilterOptions = { ...filterOptions, [dateType]: event.target.value };
    setFilterOptions(newFilterOptions);
    handleFilter(newFilterOptions);
  };

  const handleAmountRangeChange = (event) => {
    const newFilterOptions = { ...filterOptions, amountRange: event.target.value.split('-') };
    setFilterOptions(newFilterOptions);
    handleFilter(newFilterOptions);
  };

  return (
    <div className="app-content-actions">
      <input
        className="search-bar"
        placeholder="Search..."
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="app-content-actions-wrapper">
        <div className="filter-button-wrapper">
          <button className="action-button filter jsFilter" onClick={handleFilterButtonClick}>
            <span>Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`feather feather-filter ${isFilterMenuOpen && 'active'}`}
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
          <div className={`filter-menu ${isFilterMenuOpen && 'active'}`}>
            <label>Order Status</label>
            <select name="orderStatus" onChange={handleFilterCategoryChange}>
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Shipped</option>
              {/* Add more order status options as needed */}
            </select>
            <label>Payment Status</label>
            <select name="paymentStatus" onChange={handleFilterCategoryChange}>
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              {/* Add more order status options as needed */}
            </select>
            {/* Add more filter options as needed */}
            <label>Start Date</label>
            <input type="date" name="startDate" value={filterOptions.startDate} onChange={(e) => handleDateChange(e, 'startDate')} />
            <label>End Date</label>
            <input type="date" name="endDate" value={filterOptions.endDate} onChange={(e) => handleDateChange(e, 'endDate')} />
            <label>Amount Range</label>
            <select name="amountRange" onChange={handleAmountRangeChange}>
              <option value="">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              {/* Add more amount range options as needed */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
