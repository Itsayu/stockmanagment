"use client";

import React, { useState, ChangeEvent } from 'react';
import Pagination from '@/app/components/Pagination';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

interface ProductTableProps {
  products: Product[];
  // handleSelectProduct: (event:  ChangeEvent<HTMLInputElement>,product: Product ) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const handleSelectProduct = (product: Product) => {
    const isSelected = selectedProducts.some(p => p.id === product.id);
    if (isSelected) {
      setSelectedProducts(prevState => prevState.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts(prevState => [...prevState, product]);
    }
  };

  const handleExportPDF = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
  
    const imagePromises = selectedProducts.map(product => {
      return new Promise((resolve, reject) => {
        fetch(product.imageUrl)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imageDataURL = reader.result as string;
              resolve(imageDataURL);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
          .catch(reject);
      });
    });
  
    try {
      const imageDataURLs = await Promise.all(imagePromises);
  
      const documentDefinition = {
        content: [
          ...selectedProducts.map((product, index) => {
            const productContent = [
              { image: imageDataURLs[index], width: 250, height: 250, margin: [0, 0, 0, 20], alignment: 'center' },
              { text: `Article No.: ${product.articleNo}`, style: ['header', 'center'] },
              { text: `Category: ${product.category}`, style: ['title', 'value', 'center'] },
              { text: `Fabric: ${product.fabric}`, style: ['title', 'value', 'center'] },
              { text: `Color: ${product.color}`, style: ['title', 'value', 'center'] },
              { text: `Size: ${product.size}`, style: ['title', 'value', 'center'] },
              { text: `Description: ${product.description}`, style: ['title', 'value', 'center'] },
              { text: `Price: ${product.price}`, style: ['title', 'value', 'center'] },
              { text: '', pageBreak: 'after' }
            ];
            
            return productContent;
          })
        ],
        styles: {
          header: {
            fontSize: 21,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          title: {
            fontSize: 18,
            bold: true,
            margin: [0, 5, 0, 5]
          },
          value: {
            fontSize: 15,
            margin: [0, 5, 0, 5]
          },
          center: {
            alignment: 'center'
          }
        },
        footer: function(currentPage:number) {
          return {
            text: currentPage.toString(),
            alignment: 'center'
          };
        }
      };
  
      pdfMake.createPdf(documentDefinition).download('selected_products.pdf');
    } catch (error) {
      console.error('Error while creating PDF:', error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
      <table id="table-content" className="min-w-full divide-y divide-gray-200 border border-gray-300">
    <thead className="bg-gray-50">
      <tr>
        <th className="border border-gray-300 px-4 py-2">Select</th>
        <th className="border border-gray-300 px-4 py-2">Product Image</th>
        <th className="border border-gray-300 px-4 py-2">Category</th>
        <th className="border border-gray-300 px-4 py-2">Article No.</th>
        <th className="border border-gray-300 px-4 py-2">Fabric</th>
        <th className="border border-gray-300 px-4 py-2">Color</th>
        <th className="border border-gray-300 px-4 py-2">Size</th>
        <th className="border border-gray-300 px-4 py-2">Description</th>
        <th className="border border-gray-300 px-4 py-2">Price</th>
        <th className="border border-gray-300 px-4 py-2">Room No.</th>
        <th className="border border-gray-300 px-4 py-2">Rack No.</th>
        <th className="border border-gray-300 px-4 py-2">Stock</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currentItems.map((product) => (
        <tr key={product.id}>
          <td className="border border-gray-300 px-4 py-2">
            <input 
              type="checkbox"
              // checked={isChecked}
              checked={selectedProducts.some(p => p.id === product.id)}
              // onChange={(event) => handleSelectProduct(event, product)}  
              onChange={() => handleSelectProduct(product)}  
            />
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <img src={product.imageUrl} alt={product.category} className="w-16 h-16 object-cover" />
          </td>
          <td className="border border-gray-300 px-4 py-2">{product.category}</td>
          <td className="border border-gray-300 px-4 py-2">{product.articleNo}</td>
          <td className="border border-gray-300 px-4 py-2">{product.fabric}</td>
          <td className="border border-gray-300 px-4 py-2">{product.color}</td>
          <td className="border border-gray-300 px-4 py-2">{product.size}</td>
          <td className="border border-gray-300 px-4 py-2">{product.description}</td>
          <td className="border border-gray-300 px-4 py-2">{product.price}</td>
          <td className="border border-gray-300 px-4 py-2">{product.roomNo}</td>
          <td className="border border-gray-300 px-4 py-2">{product.rackNo}</td>
          <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
      <Pagination itemsPerPage={itemsPerPage} totalItems={products.length} paginate={paginate} currentPage={currentPage} />
      <button onClick={handleExportPDF} className="btn">
        Export PDF
      </button>
    </div>
  );
};

export default ProductTable;
