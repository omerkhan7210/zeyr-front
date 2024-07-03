import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart,Pie, Cell, BarChart, Bar, ComposedChart, Area } from 'recharts';
import axios from 'axios';
import { hostLink } from '../../Hostlink/hostlink';
import { ProductFetchContext } from '../../Context/ProductFetch';

const Charts = () => {
  const { products } = useContext(ProductFetchContext);

  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  const fetchChartData = async () => {
    try {
      const results = await Promise.all(
        products.map(async (product) => {
          const salesResponse = await axios.get(`${hostLink}/products-sales/${product.id}`);
          
          return {
            name: product.name, // Assuming you have a "name" property in your product object
            revenue: salesResponse.data.totalamount,
            sale: salesResponse.data.totalcount,
          };
        })
      );

    const stockResponse = await axios.get(`${hostLink}/orders-details`);
        
    setChartData2(stockResponse.data);
      setChartData(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if(products && products.length > 0){

      fetchChartData();
    }
  }, [products]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF7E79'];
  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]
      
  
            
  return (
    <>
    <div className='d-flex justify-between mt3 align-center charts' style={{maxWidth:'95%'}}>
      <div className='d-flex flex-c align-center'>
                  <h6 className='app-content-headerText'>Products Revenue & Sales</h6>
      <LineChart width={800} height={500} data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" isAnimationActive={true} dataKey="revenue" stroke="#ff7300"  />
      </LineChart>
      </div>

                 <div className='d-flex flex-c align-center'>
                  <h6 className='app-content-headerText'>Orders Details</h6>
                 <PieChart width={300} height={250}>
  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="gray" label />
</PieChart>
<PieChart width={300} height={250}>
  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="gray" label />
</PieChart>
                  </div>     
    </div>

   
    <div className='d-flex justify-between mt3 align-center' style={{maxWidth:'95%'}}>
      <div className='d-flex flex-c align-center'>   
      <h6 className='app-content-headerText'>Users Details</h6>               
<BarChart width={550} height={400} data={data}>
  <XAxis dataKey="name" />
  <YAxis fill="white"/>
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" />
</BarChart>
</div>

<div className='d-flex flex-c align-center'>  
<h6 className='app-content-headerText'>Completed Orders</h6>
<ComposedChart width={550} height={400} data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" />
</ComposedChart>
</div>
</div>

    </>
  );
};

export default Charts;
