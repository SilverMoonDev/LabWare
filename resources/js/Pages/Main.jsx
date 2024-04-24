import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../../styles/components/main.css'
import { LateralMenu } from '../Components/LateralMenu';
import { ItemInfo } from '../Components/ItemInfo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';


const Main = ({ auth }) => {
  const [productList, setProductList] = useState([]);
  const [sortedList, setSortedList] = useState({ property: '', descending: false });
  const [filteredList, setFilteredList] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);


  useEffect(() => {
    // Simulating fetching of product data from an API
    const fetchProducts = async () => {
      // Mocked product data
      const products = [
        { name: 'Product 1', expire_date: "2024-04-15", quantitat: 100, numCas: "64-19-7" },
        { name: 'Product 2', expire_date: "2024-04-14", quantitat: 400, numCas: "65-19-7" },
        { name: 'Product 3', expire_date: "2024-04-16", quantitat: 500, numCas: "66-19-7" },
        { name: 'Product 4', expire_date: "2024-04-13", quantitat: 200, numCas: "67-19-7" },
      ];
      setProductList(products);
    };
    fetchProducts();
  }, []);

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

  const openPopup = (product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };
  

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Home</h2>}
        >
    <div className='main-section'>
      <div className='lateral-menu'><LateralMenu /></div>
      <section className='product-container'>
        <header>
          <div className='header-controls'>
            <button onClick={() => sortByColumn('name')}>
              {sortedList.property === 'name' ? (sortedList.descending ? 'Sort by name (Descending)' : 'Sort by name') : 'Sort by name'}
            </button>
            <button onClick={() => sortByColumn('expire_date')}>
              {sortedList.property === 'expire_date' ? (sortedList.descending ? 'Sort by expire date (Descending)' : 'Sort by expire date') : 'Sort by expire date'}
            </button>
            <TextInput type="text" placeholder="Filter List" value={filteredList} onChange={e => setFilteredList(e.target.value)} />
          </div>
        </header>
        <div className='product-body'>
          {productList && (
            <div className='product-row'>
              {filteredProducts.map((product, index) => (
                <div key={index} className='product-item' onClick={() => openPopup(product)}>
                  {columns.map((col, colIndex) => (
                    <div key={colIndex} className='product-column'>
                      <div className='product-label'>{col.label}:</div>
                      <div className='product-value'>{col.property === 'expire_date' ? new Date(product[col.property]).toLocaleDateString() : product[col.property]}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {popupOpen && <ItemInfo product={selectedProduct} onClose={() => setPopupOpen(false)} handleDelete={handleDelete} />}
    </div>
    </AuthenticatedLayout>
  );

};


export default Main;
