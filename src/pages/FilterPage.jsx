import React from 'react';
import { Switch, Input, Divider } from 'antd';

const { Search } = Input;

const FilterPage = ({ setFilters, keys, data }) => {

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value) ? prev[type].filter(v => v !== value) : [...prev[type], value]
        }));
    };

    const getUniqueValues = (key) => {
        const values = data.map(item => item[key]);
        return [...new Set(values)];
    };

    return (
        <div className="flex flex-row justify-between space-x-4 p-4">
            {keys.map((key, index) => (
                <React.Fragment key={key}>
                    <div>
                        <span className="block font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {getUniqueValues(key).map(value => (
                            <div key={value} className="flex items-center space-x-2 my-2">
                                <Switch onChange={() => handleFilterChange(key, value)} />
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                    {index < keys.length - 1 && <Divider type="vertical" className="h-full" style={{ height: 'auto' }} />}

                </React.Fragment>
            ))}
            {keys.includes('name') || keys.includes('mall') ? (
                <div>
                    <span className="block font-bold">{keys.includes('name') ? 'Name' : 'Mall'}</span>
                    <Search
                        placeholder={`Search by ${keys.includes('name') ? 'name' : 'mall'}`}
                        onChange={e => setFilters(prev => ({ ...prev, [keys.includes('name') ? 'name' : 'mall']: [e.target.value] }))}
                        onSearch={value => setFilters(prev => ({ ...prev, [keys.includes('name') ? 'name' : 'mall']: [value] }))}
                        enterButton
                    />
                </div>
            ) : null}
        </div>
    );
};

export default FilterPage;
