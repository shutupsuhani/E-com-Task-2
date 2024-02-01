// ProductList.js

import  { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import "./image.css"
import Footer from './Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category, minPrice, and maxPrice
  const filteredProducts = products.filter(product =>
    (!filters.category || product.category === filters.category) &&
    (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
    (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice)) &&
    (product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort products based on sortBy
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else {
      // Add more sorting options if needed
      return 0;
    }
  });

  
  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);
    setCart([...cart, selectedProduct]);
  };

  const handleBuyNow = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);
    setCart([selectedProduct]);
    // Implement redirection to checkout page or any other action for buying
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">

       {/*Search bar*/}
         
      <div className="mb-4">
        <h2 className="text-lg font-mono font-bold mb-2">Search</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-1/3 font-mono p-2 border border-gray-300 rounded"
        />
      </div>
       
       {/*image section */} 
      <div className="flex mt-5 overflow-x-auto space-x-4 scrollbar-hidden ">
        <img className="w-full rounded-lg" src="banner-1.jpg" alt="Banner 1" />
        <img className="w-full rounded-lg" src='banner-2.jpg'/>
        <img className="w-full rounded-lg" src='banner-3.jpg'/>
       </div>

      {/* Filter section */}
      <div className="mb-4 font-mono text-slate-600">
        <h2 className="text-lg font-bold mb-2 text-slate-500 font-mono">Filter by Category</h2>
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} value={filters.category} className="w-full p-2 border border-gray-300 rounded">
          <option value="">All</option>
          {/* Add more categories dynamically if needed */}
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2 text-pink-400 font-mono">Filter by Price Range</h2>
       
       <div className='flex justify-evenly'>
        <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="w-1/3 p-2 border border-gray-300 rounded mb-2" />
        <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="w-1/3 p-2 border border-gray-300 rounded" />
     </div>

      </div>

      {/* Sort section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Sort by</h2>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="w-full p-2 border border-gray-300 rounded">
          <option value="price">Price</option>
          {/* Add more sorting options if needed */}
        </select>
      </div>
      

      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {sortedProducts.map(product => (
          <div key={product.id} className="border border-gray-300 p-4 rounded">
            <img src={product.image} alt={product.title} className="w-44  h-44 items-center m-auto mb-2" />
            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
            <p className="text-gray-600 font-bold font-mono">Price: ${product.price}</p>

            <div className='flex justify-around mt-4'>
                <button onClick={() => handleBuyNow(product.id)} className='bg-gradient-to-r from-purple-500  to-pink-500 hover:text-black text-white py-2 px-4 rounded-md '>Buy Now</button>
                <button onClick={() => handleAddToCart(product.id)} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:text-black text-white py-2 px-4 rounded-md '>Add to Cart</button>
              </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductList;
