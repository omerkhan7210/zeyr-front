import React from 'react'

export const CSVFileUsers = ({users}) => {

     
    const convertToCSV = (data) => {
      const header = ['id', 'name', 'email', 'date_registered'].join(',');
      const rows = data.map(user => {
        const name = `${user.fname} ${user.lname}`;
        return [user.id, name, user.email, user.date_registered].join(',');
      });
  
      return [header, ...rows].join('\n');
    };
  
    const downloadCSV = () => {
      const csvContent = convertToCSV(users);
  
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_data.csv';
  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      window.URL.revokeObjectURL(url);
    };
      
return(
  <div className='d-flex justify-center w100 mt2'>

 
    <button onClick={downloadCSV}  className="product-form__submit btn btn--primary ">Download CSV</button>
    </div> 

)
}
