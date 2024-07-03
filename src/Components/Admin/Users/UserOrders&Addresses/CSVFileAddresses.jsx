import React from 'react'

export const CSVFileAddresses = ({addresses}) => {

     
    const convertToCSV = (data) => {
      const header = ['user id','address id', 'name', 'email', 'company','address line 1','address line 2','city','country'].join(',');
      const rows = data.map(user => {
        const name = `${user.firstName} ${user.lastName}`;
        return [user.user_id,user.id, name, user.email, user.company,user.addressLine1,user.addressLine2,user.city,user.country].join(',');
      });
  
      return [header, ...rows].join('\n');
    };
  
    const downloadCSV = () => {
      const csvContent = convertToCSV(addresses);
  
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
