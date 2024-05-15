import React, { useState, useEffect, useMemo, useRef } from "react";
import "../../styles/components/main.css";
import { LateralMenu } from "../Components/LateralMenu";
import { ItemInfo } from "../Components/ItemInfo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import { ArrowRightIcon } from "@/Icons/ArrowRightIcon";
import { ArrowLeftIcon } from "@/Icons/ArrowBackIcon";
import { useForm } from "@inertiajs/react";

const Main = ({ auth, products }) => {
    const [productList, setProductList] = useState([]);
    const [sortedList, setSortedList] = useState({
        property: "",
        descending: false,
    });
    const [filteredList, setFilteredList] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchProducts = async () => {
            if (products) {
                var organizedProducts = []
                products.forEach(product => {
                    let casObject = organizedProducts.find(obj =>
                        obj.CAS_NUMBER === product.cas_number && obj.CONCENTRATION === product.concentration
                    );
                    if (casObject) {
                        casObject.products.push(product);
                    } else {
                        organizedProducts.push({
                            name: product.name,
                            CONCENTRATION: product.concentration,
                            CAS_NUMBER: product.cas_number,
                            products: [product]
                        });
                    }
                });
                setProductList(organizedProducts);
            }
        };
        fetchProducts();
    }, []);

    const productsPerPage = 12;

    const columns = [
        { label: "Name", property: "name" },
        { label: "Expire Date", property: "expire_date" },
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
                if (sortedList.property === "expire_date") {
                    return (
                        new Date(valueA).getTime() - new Date(valueB).getTime()
                    );
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

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        destroy(route("products.destroy", id), {
            onSuccess: () => {
                window.location.href = route("products.index");
            },
        });
    };

    // Memoized function to filter the productList based on filtering criteria and sorted list
    const filteredProducts = useMemo(() => {
        let filteredProducts = [...handleSorting];

        // Check if there is any filtering criteria
        if (filteredList.length > 0) {
            // Filter the products based on the filtering criteria
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(filteredList.toLowerCase())
            );
        }
        return filteredProducts;
    }, [filteredList, handleSorting]);

    // Calculate the range of indices for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(
        startIndex + productsPerPage,
        filteredProducts.length
    );

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
        setCurrentPage((prevPage) =>
            Math.min(
                prevPage + 1,
                Math.ceil(filteredProducts.length / productsPerPage)
            )
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white leading-tight">
                    Home
                </h2>
            }
        >
            <div className="main-section">
                <div className="lateral-menu">
                    <LateralMenu />
                </div>
                <section className="product-container">
                    <header>
                        <div className="header-controls">
                            <button
                                onClick={() => sortByColumn("name")}
                                style={{
                                    color:
                                        sortedList.property === "name"
                                            ? sortedList.descending
                                                ? "#ffffff"
                                                : "#48bb78"
                                            : "#ffffff",
                                }}
                            >
                                {sortedList.property === "name"
                                    ? sortedList.descending
                                        ? "Ordenar per nom (D)"
                                        : "Ordenar per nom (A)"
                                    : "Ordenar per nom"}
                            </button>
                            <button
                                onClick={() => sortByColumn("expire_date")}
                                style={{
                                    color:
                                        sortedList.property === "expire_date"
                                            ? sortedList.descending
                                                ? "#ffffff"
                                                : "#48bb78"
                                            : "#ffffff",
                                }}
                            >
                                {sortedList.property === "expire_date"
                                    ? sortedList.descending
                                        ? "Ordenar per data d'expiració (D)"
                                        : "Ordenar per data d'expiració (A)"
                                    : "Ordenar per data d'expiració"}
                            </button>
                            <TextInput
                                type="text"
                                placeholder="Buscar"
                                value={filteredList}
                                onChange={(e) =>
                                    setFilteredList(e.target.value)
                                }
                            />
                        </div>
                    </header>
                    <div className="product-body">
                        {paginatedProducts && (
                            <div className="product-row">
                                {paginatedProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="product-item"
                                        onClick={() => openPopup(product)}
                                        onMouseEnter={(e) =>
                                            e.currentTarget.classList.add(
                                                "zoom-in"
                                            )
                                        }
                                        onMouseLeave={(e) =>
                                            e.currentTarget.classList.remove(
                                                "zoom-in"
                                            )
                                        }
                                    >
                                        <div className="product-column">
                                            <div className="product-value">
                                                <span>{`${product.name}`} <br/> {`${product.CONCENTRATION}%`}</span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="pagination">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            <ArrowLeftIcon />
                        </button>
                        <span>{currentPage}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={
                                currentPage ===
                                Math.ceil(
                                    filteredProducts.length / productsPerPage
                                )
                            }
                            className="pagination-button"
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </section>
                {popupOpen && (
                    <ItemInfo
                        user={auth.user}
                        product={selectedProduct}
                        onClose={() => setPopupOpen(false)}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Main;
