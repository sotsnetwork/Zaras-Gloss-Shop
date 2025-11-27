import React, { useState } from 'react';

type Page = 'home' | 'product' | 'cart';
type Currency = 'USD' | 'EUR' | 'GBP';
type Category = 'Lip Gloss' | 'Lip Liners' | 'Lip Masks' | 'Face Masks' | 'Lip Scrubs' | 'Accessories';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  img: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glossy Lip Shine',
    category: 'Lip Gloss',
    price: 24,
    img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Velvet Lip Liner',
    category: 'Lip Liners',
    price: 18,
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Hydrating Lip Mask',
    category: 'Lip Masks',
    price: 32,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
  }
];

const formatPrice = (price: number, currency: Currency) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
};

const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose, 
  addToCart, 
  toggleWishlist, 
  isInWishlist,
  currency
}: { 
  product: Product | null, 
  isOpen: boolean, 
  onClose: () => void, 
  addToCart: (p: Product) => void,
  toggleWishlist: (p: Product) => void,
  isInWishlist: (id: string) => boolean,
  currency: Currency
}) => {
  if (!isOpen || !product) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col gap-4">
          <img src={product.img} alt={product.name} className="w-full h-64 object-cover rounded-xl" />
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-lg font-medium text-primary">{formatPrice(product.price, currency)}</p>
          <div className="flex gap-2 mt-4">
             <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-lg border ${isInWishlist(product.id) ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 text-gray-400'}`}
            >
              <span className={`material-symbols-outlined ${isInWishlist(product.id) ? 'filled' : ''}`}>favorite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage = ({ navigate, addToCart, searchTerm, toggleWishlist, isInWishlist, currency }: { navigate: (p: Page) => void, addToCart: (p: Product) => void, searchTerm: string, toggleWishlist: (p: Product) => void, isInWishlist: (id: string) => boolean, currency: Currency }) => {
  const categories = ['All Products', 'Lip Gloss', 'Lip Liners', 'Lip Masks', 'Face Masks', 'Lip Scrubs', 'Accessories'];
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All Products'>('All Products');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter by Category and Search Term
  let filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All Products' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort Products
  filteredProducts.sort((a, b) => {
    if (sortOption === 'price-low-high') return a.price - b.price;
    if (sortOption === 'price-high-low') return b.price - a.price;
    if (sortOption === 'alphabetical') return a.name.localeCompare(b.name);
    return 0; // Featured (default order)
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        addToCart={addToCart} 
        toggleWishlist={toggleWishlist} 
        isInWishlist={isInWishlist}
        currency={currency}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-black font-serif text-text-light">The Collection</h1>
        
        {/* Sorting Dropdown */}
        <div className="relative">
          <select 
            className="appearance-none bg-subtle-light border-0 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-text-light focus:ring-2 focus:ring-primary/50 cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="alphabetical">Alphabetical Order</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted-light">
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedCategory(cat as Category | 'All Products')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-primary/10 text-text-light hover:bg-primary/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-text-muted-light mb-6">No products found matching your criteria.</p>
          <button onClick={() => setSelectedCategory('All Products')} className="text-primary hover:underline">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col gap-4 relative p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-white dark:hover:bg-white/5" 
              onClick={() => navigate('product')}
            >
              <div className="relative w-full aspect-[3/4] bg-subtle-light rounded-xl overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                
                <button 
                  className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                >
                  <span className={`material-symbols-outlined text-lg ${isInWishlist(item.id) ? 'filled text-primary' : ''}`}>favorite</span>
                </button>

                {/* Quick View Button Overlay */}
                <button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto px-4 h-9 bg-white/90 backdrop-blur-sm text-text-light text-xs font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white"
                  onClick={(e) => { e.stopPropagation(); setQuickViewProduct(item); }}
                >
                  Quick View
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-text-light cursor-pointer hover:text-primary">{item.name}</h3>
                <p className="text-sm text-text-muted-light mt-1">{formatPrice(item.price, currency)}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                  className="mt-3 w-full max-w-[160px] h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300 mx-auto block"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ShopPage;