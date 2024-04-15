import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../styles/components/main.css'
import { LateralMenu } from './LateralMenu';

interface Product {
  name: string;
  expire_date: string;
}

const Main: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [color, setColor] = useState<boolean>(false);
  const [sortedList, setSortedList] = useState<{ property: string; descending: boolean }>({ property: '', descending: false });
  const [filteredList, setFilteredList] = useState<string>('');

  useEffect(() => {
    // Simulating fetching of product data from an API
    const fetchProducts = async () => {
      // Mocked product data
      const products = [
        { name: 'Product 1', expire_date: "2024-04-15" },
        { name: 'Product 2', expire_date: "2024-04-14" },
        { name: 'Product 3', expire_date: "2024-04-16" },
        { name: 'Product 4', expire_date: "2024-04-13" },
      ];
      setProductList(products);
    };
    fetchProducts();
  }, []);

  const handleColor = () => {
    setColor(!color);
  };

  const columns = [
    { label: 'Name', property: 'name' },
    { label: 'Expire Date', property: 'expire_date' }
  ];

  // Function to handle sorting of product list based on the sortedList state
  const handleSorting = useMemo(() => {
    let sortedProducts = [...productList];
    // Check if there is a sorting criteria
    if (sortedList.property) {
      // Sort the products array based on the sorting criteria
      sortedProducts.sort((a, b) => {
        // Get the values of the sorting criteria for the two products
        const valueA = a[sortedList.property];
        const valueB = b[sortedList.property];

        // Compare the values and return appropriate comparison result
        if (sortedList.property === 'expire_date') {
          return new Date(valueA).getTime() - new Date(valueB).getTime();
        } else {
          return valueA.localeCompare(valueB);
        }
      });
      // Reverse the array if it was sorted in descending order
      if (sortedList.descending) {
        sortedProducts.reverse();
      }
    }

    return sortedProducts;
  }, [sortedList, productList]);

  // Function to manage the sorting of the columns
  const sortByColumn = (property) => {
    if (property === sortedList.property) {
      setSortedList({ property, descending: !sortedList.descending });
    } else {
      setSortedList({ property, descending: false });
    }
  };

  // Function to handle deletion of a product with the given name
  const handleDelete = (name) => {
    // Filter out the product with the provided name from the productList
    const updatedProductList = productList.filter((product) => product.name !== name);
    setProductList(updatedProductList);
  };

  // Memoized function to filter the productList based on filtering criteria and sorted list
  const filteredProducts = useMemo(() => {
    let filteredProducts = [...handleSorting];

    // Check if there is any filtering criteria
    if (filteredList.length > 0) {
      // Filter the products based on the filtering criteria
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(filteredList.toLowerCase())
      );
    }
    return filteredProducts;
  }, [filteredList, handleSorting]);

  return (
    <div className='main-section'>
      <div className='lateral-menu'><LateralMenu /></div>
      <section className='product-container'>
        <header>
          <div className='header-controls'>
            <button onClick={handleColor}>Color rows</button>
            <button onClick={() => sortByColumn('name')}>
              {sortedList.property === 'name' ? (sortedList.descending ? 'Sort by name (Descending)' : 'Sort by name') : 'Sort by name'}
            </button>
            <button onClick={() => sortByColumn('expire_date')}>
              {sortedList.property === 'expire_date' ? (sortedList.descending ? 'Sort by expire date (Descending)' : 'Sort by expire date') : 'Sort by expire date'}
            </button>
            <input type="text" placeholder="Filter List" value={filteredList} onChange={e => setFilteredList(e.target.value)} />
          </div>
        </header>
        <div className='product-body'>
          {productList && (
            <div className='product-table'>
              <div className='product-row'>
                {filteredProducts.map((product, index) => (
                  <div key={index} className='product-item' style={{ backgroundColor: color ? index % 2 === 0 ? '#4F4A49' : '#9D9593' : 'transparent' }}>
                    {columns.map((col, colIndex) => (
                      <div key={colIndex} className='product-column'>
                        <div className='product-label'>{col.label}:</div>
                        <div className='product-value'>{col.property === 'expire_date' ? new Date(product[col.property]).toLocaleDateString() : product[col.property]}</div>
                      </div>
                    ))}
                    <div className='product-action'>
                      <button onClick={() => handleDelete(product.name)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );

};


export default Main;
