import React from 'react';
import * as XLSX from 'xlsx';
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

interface ExportButtonsProps {
  selectedProducts: Product[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ selectedProducts }) => {
  const handleExportExcel = () => {
    const selectedData = selectedProducts.map(product => {
      return [product.id, product.imageUrl, product.category, product.articleNo, product.fabric, product.color, product.size, product.description, product.price, product.roomNo, product.rackNo, product.stock];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([['ID', 'Image URL', 'Category', 'Article No.', 'Fabric', 'Color', 'Size', 'Description', 'Price', 'Room No.', 'Rack No.', 'Stock'], ...selectedData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Products');
    XLSX.writeFile(workbook, 'selected_products.xlsx');
  };

  const handleExportPDF = () => {
    const selectedData = selectedProducts.map(product => [
      product.id,
      { image: product.imageUrl, width: 50 },
      product.category,
      product.articleNo,
      product.fabric,
      product.color,
      product.size,
      product.description,
      product.price,
      product.roomNo,
      product.rackNo,
      product.stock
    ]);

    const documentDefinition = {
      content: [
        { text: 'Selected Products', style: 'header' },
        {
          table: {
          headerRows: 1,
        //   widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Image', 'Category', 'Article No.', 'Fabric', 'Color', 'Size', 'Description', 'Price', 'Room No.', 'Rack No.', 'Stock'],
            ...selectedData
          ]
        
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('selected_products.pdf');
  };

  const handlePrint = () => {
    const printContents = document.getElementById('table-content')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents ?? '';

    window.print();

    document.body.innerHTML = originalContents;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={handleExportExcel} className="btn">Excel</button>
        <button onClick={handleExportPDF} className="btn">PDF</button>
        <button onClick={handlePrint} className="btn">Print</button>
      </div>
    </div>
  );
};

export default ExportButtons;