import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../../styles/components/main.css'
import { LateralMenu } from '../Components/LateralMenu';
import { ItemInfo } from '../Components/ItemInfo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import { ArrowRightIcon } from '@/Icons/ArrowRightIcon';
import { ArrowLeftIcon } from '@/Icons/ArrowBackIcon';


const Main = ({ auth }) => {
  const [productList, setProductList] = useState([]);
  const [sortedList, setSortedList] = useState({ property: '', descending: false });
  const [filteredList, setFilteredList] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulating fetching of product data from an API
    const fetchProducts = async () => {
      // Mocked product data
      const products = [
        { name: 'Product 1', expire_date: "2024-04-15", quantitat: 100, numCas: "64-19-7" },
        { name: 'Product 2', expire_date: "2024-04-14", quantitat: 400, numCas: "65-19-7" },
        { name: 'Product 3', expire_date: "2024-04-16", quantitat: 500, numCas: "66-19-7" },
        { name: 'Product 4', expire_date: "2024-04-13", quantitat: 200, numCas: "67-19-7" },
        { name: 'Product 1', expire_date: "2024-04-15", quantitat: 100, numCas: "64-19-7" },
        { name: 'Product 2', expire_date: "2024-04-14", quantitat: 400, numCas: "65-19-7" },
        { name: 'Product 3', expire_date: "2024-04-16", quantitat: 500, numCas: "66-19-7" },
        { name: 'Product 4', expire_date: "2024-04-13", quantitat: 200, numCas: "67-19-7" },
        { name: 'Product 1', expire_date: "2024-04-15", quantitat: 100, numCas: "64-19-7" },
        { name: 'Product 2', expire_date: "2024-04-14", quantitat: 400, numCas: "65-19-7" },
        { name: 'Product 3', expire_date: "2024-04-16", quantitat: 500, numCas: "66-19-7" },
        { name: 'Product 4', expire_date: "2024-04-13", quantitat: 200, numCas: "67-19-7" },
        { name: 'Product 1', expire_date: "2024-04-15", quantitat: 100, numCas: "64-19-7" },
        { name: 'Product 2', expire_date: "2024-04-14", quantitat: 400, numCas: "65-19-7" },
        { name: 'Product 3', expire_date: "2024-04-16", quantitat: 500, numCas: "66-19-7" },
        { name: 'Product 4', expire_date: "2024-04-13", quantitat: 200, numCas: "67-19-7" },
      ];
      setProductList(products);
    };
    fetchProducts();
  }, []);

  const productsPerPage = 10;

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

  // Calculate the range of indices for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const openPopup = (product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };

  // Function to handle navigation to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to handle navigation to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));
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
              <button onClick={() => sortByColumn('name')} style={{ color: sortedList.property === 'name' ? (sortedList.descending ? "#ffffff" : "#48bb78") : "#ffffff" }}>
              {sortedList.property === 'name' ? (sortedList.descending ? 'Sort by name (A)' : 'Sort by name (D)' ) : 'Sort by name (A)'}
              </button>
              <button onClick={() => sortByColumn('expire_date')} style={{ color: sortedList.property === 'expire_date' ? (sortedList.descending ? "#ffffff" : "#48bb78") : "#ffffff" }}>
              {sortedList.property === 'expire_date' ? (sortedList.descending ? 'Sort by expire date (A)' : 'Sort by expire date (D)') : 'Sort by expire date (A)'}
              </button>
              <TextInput type="text" placeholder="Filter List" value={filteredList} onChange={e => setFilteredList(e.target.value)} />
            </div>
          </header>
          <div className='product-body'>
            {paginatedProducts && (
              <div className='product-row'>
                {paginatedProducts.map((product, index) => (
                  <div key={index} className='product-item' onClick={() => openPopup(product)}
                    onMouseEnter={(e) => e.currentTarget.classList.add('zoom-in')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('zoom-in')}>
                    <div className='product-column'>
                      <div className='product-value'>{product.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-button"><ArrowLeftIcon /></button>
            <span>{currentPage}</span>
            <button onClick={goToNextPage} disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)} className="pagination-button"><ArrowRightIcon /></button>
          </div>
        </section>
        {popupOpen && <ItemInfo product={selectedProduct} onClose={() => setPopupOpen(false)} handleDelete={handleDelete} />}
      </div>
    </AuthenticatedLayout>
  );

};


export default Main;
