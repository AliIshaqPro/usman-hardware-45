import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

export const useOptimizedSearch = (
  data: any[], 
  searchFields: string[] = ['name'],
  delay: number = 300
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, delay);

  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return data;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    
    return data.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(searchLower);
      })
    );
  }, [data, debouncedSearchTerm, searchFields]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filteredData,
    clearSearch,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
};