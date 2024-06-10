"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import FilterBar from "@/app/components/FilterBar";
import ExportButtons from "@/app/components/ExportButtons";
import SearchBar from "@/app/components/SearchBar";
import ProductTable from "@/app/components/ProductTable";
import Pagination from "@/app/components/Pagination";
// import Product from '@/models/Product'; 


interface Product {
  id: number;
  imageUrl: string;
  category: string;
  articleNo: string;
  fabric: string;
  color: string;
  size: string;
  description: string;
  price: any;
  roomNo: number;
  rackNo: number;
  stock: string;
}

const Page: React.FC = () => {
  const [filters, setFilters] = useState({
    color: "",
    category: "",
    articleNo: "",
    fabric: "",
    minPrice: "",
    maxPrice: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement any additional logic if needed when search is submitted
  };
  

  const allProducts: Product[] = require("@/app/products.json");

  const filteredProducts = allProducts.filter((product) => {
    const matchesFilters =
      (filters.color === "" ||
        product.color.toLowerCase().includes(filters.color.toLowerCase())) &&
      (filters.category === "" ||
        product.category
          .toLowerCase()
          .includes(filters.category.toLowerCase())) &&
      (filters.articleNo === "" ||
        product.articleNo
          .toLowerCase()
          .includes(filters.articleNo.toLowerCase())) &&
      (filters.fabric === "" ||
        product.fabric.toLowerCase().includes(filters.fabric.toLowerCase())) &&
      (filters.minPrice === "" ||
        parseFloat(product.price.replace("₹", "")) >=
          parseFloat(filters.minPrice)) &&
      (filters.maxPrice === "" ||
        parseFloat(product.price.replace("₹", "")) <=
          parseFloat(filters.maxPrice));

    const matchesSearchTerm =
      searchTerm === "" ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.articleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilters && matchesSearchTerm;
  });


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/products');
  //       console.log(response);
        
  //       if (response.ok) {
  //         const products = await response.json();
  //         setProducts(products);
  //       }
  //       else {
  //         console.error('Error fetching products:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const handleSelectProduct = (product: Product) => {
    const isSelected = selectedProducts.some(p => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(prevState => prevState.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts(prevState => [...prevState, product]);
    }
  };
  
    

  return (
    <div className="p-5">
      <FilterBar filters={filters} handleFilterChange={handleFilterChange} />
      <hr className="my-3" />
      <div className="flex justify-start mb-4">
        {/* <ExportPdfButton selectedProducts={selectedProducts} /> */}
      </div>
      <hr className="my-3" />
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <ExportButtons />
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      <ProductTable
        products={filteredProducts}
        handleSelectProduct={handleSelectProduct} 
      />
      {/* <ProductTable
        products={products}
        handleSelectProduct={handleSelectProduct}
      /> */}
      <Pagination />
    </div>
  );
};

export default Page;
