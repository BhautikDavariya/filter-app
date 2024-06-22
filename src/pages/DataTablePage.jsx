import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import FilterPage from './FilterPage';
import { Card } from 'antd';
import { jsonData } from 'context/dummyData';


const determineKeys = (data) => {
  if (data.length === 0) return [];
  const sampleItem = data[0];
  return Object.keys(sampleItem);
};

const DataTablePage = () => {
  const [data, setData] = useState(jsonData);
  const [filters, setFilters] = useState({});
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const keys = determineKeys(data);
    setKeys(keys);
    const initialFilters = keys.reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    setFilters(initialFilters);
  }, [data]);

  // const filteredData = data.filter(item => {
  //   return keys.every(key => {
  //     if (filters[key] && filters[key].length > 0) {
  //       return filters[key].some(filterValue => {
  //         return filterValue === item[key] || filterValue === '';
  //       });
  //     }
  //     return true;
  //   });
  // });

  const filteredData = data.filter(item => {
    return keys.every(key => {
      if (filters[key] && filters[key].length > 0) {
        return filters[key].some(filterValue => {
          if (typeof filterValue === 'string') {
            return String(item[key]).toLowerCase().includes(filterValue.toLowerCase());
          } else {
            return filterValue === item[key] || filterValue === '';
          }
        });
      }
      return true;
    });
  });

  const columns = keys.map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    selector: row => row[key],
  }));

  return (
    <div className="p-4">
      <Card title='Filter App' className='shadow-md'>
        <FilterPage setFilters={setFilters} keys={keys} data={data} />
        <Card className='shadow-sm'>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
          />
        </Card>
      </Card>
    </div>
  );
};

export default DataTablePage;
