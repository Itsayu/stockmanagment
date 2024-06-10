import React, { ChangeEvent } from 'react';

interface FilterBarProps {
  filters: {
    color: string;
    category: string;
    articleNo: string;
    fabric: string;
    minPrice: any;
    maxPrice: any;
  };
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, handleFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 justify-center">
      <input type="text" name="color" value={filters.color} placeholder="Color" className="form-input" onChange={handleFilterChange} />
      <input type="text" name="category" value={filters.category} placeholder="Category" className="form-input" onChange={handleFilterChange} />
      <input type="text" name="articleNo" value={filters.articleNo} placeholder="Article No." className="form-input" onChange={handleFilterChange} />
      <input type="text" name="fabric" value={filters.fabric} placeholder="Fabric" className="form-input" onChange={handleFilterChange} />
      <input type="number" name="minPrice" value={filters.minPrice} placeholder="Min Price" className="form-input" onChange={handleFilterChange} />
      <input type="number" name="maxPrice" value={filters.maxPrice} placeholder="Max Price" className="form-input" onChange={handleFilterChange} />
    </div>
  );
};

export default FilterBar;
