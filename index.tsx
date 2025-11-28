import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'testimonials' | 'cart' | 'checkout' | 'wishlist' | 'shipping' | 'returns' | 'faq' | 'privacy' | 'terms' | 'journal' | 'auth' | 'forgot-password' | 'new-password' | 'profile';
type Currency = 'NGN' | 'USD';

interface User {
  name: string;
  email: string;
}

type Category = 'Lip Gloss' | 'Lip Liners' | 'Lip Masks' | 'Face Masks' | 'Lip Scrubs' | 'Accessories';
type BadgeType = 'New Arrival' | 'Best Seller' | 'On Sale';

interface Product {
  id: string;
  name: string;
  sub: string;
  price: number; // Base price in NGN
  img: string;
  category: Category;
  description?: string;
  badge?: BadgeType;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { id: '1', name: "Luxe Lip Oil", sub: "Crystal Clear", price: 28000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKj21ZbHEbXYRtj7j6uGi5ly-LNfWv14P0T_rBJ7aB-oqSmMH9LQnMUKKnocX1OSNcogTjVYb5Y5zBteVhphmi3GKAuxsMn4Xlg6nhOu6wlJ_u2AYY3puxrP2Z_VjYn1Oks_N7bnV9pR1mqlgnBQCv82tdCkiph4nbL6Jp8JHfptGdMInBOG2N8ue80Bo0zy-VN328MutjoPoOB-rlPgezsKv3j6kTQYKh6Zk8eFoMI8WnYgdJZXrJ7WkCUVDUiD_Go3REg__VzeQ", category: 'Lip Gloss', description: "A non-sticky, high-shine lip oil infused with nourishing ingredients for a glass-like finish.", badge: 'Best Seller' },
  { id: '2', name: "Radiant Serum", sub: "Hydrating Elixir", price: 45000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACYOX2EDB6sFMQZ7gVxQwv7MAQiTBgPoJL2cFNTPYPvDS5pGCqmkPIwRiDYPjagdYqdvlF9REXZOXlhD37uIpa7IyMo9gpO9Th4BZYQBLknkSjfODHpW6F9P9cy78lBr-sngMKCAKvXRZW-YK0Loe0E84Sy0FoA2xSJgU9sQZF5Ur69zxpadxW69DnEWhPMroUOwvyOaHtxLuFt37iEvZnmCF0p9Ra-bvIHvpKo7DDwToSkNRJyClJR1hxwVWJD02mhaN_Oluur1Q", category: 'Face Masks', description: "Deeply hydrating serum that revitalizes dull skin, leaving it glowing and refreshed.", badge: 'New Arrival' },
  { id: '3', name: "Glow Foundation", sub: "Shade 2N", price: 52000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcykf455oiIm92LkgTJDw4C4PU15P0FKToSg6w71z13rUBqu_pXYbAAR11RqEXkHMSkHel4EHxpFxsT-cPSAlkb9henIyY2GeSdF9yiZ30myYNbSPQbz34mrlUm81SWjdL-7L1hYHWR268CrXMAuKzVYWS5EV8vuyleRti9S8o4R1MnDZ-NAlQnIInGe4eIkfRlCrjbbjso9cqwdGZpk5vHxSkqv1ie3cOeLFHawImWrRAhEsko6OH3QfhemNcE0BTCcZgOq-jLmY", category: 'Face Masks', description: "Lightweight, buildable foundation that provides a natural, dewy finish for all-day wear." },
  { id: '4', name: "Velvet Matte Lipstick", sub: "Rose Petal", price: 34000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR4v4uEHHtakPxFT5H_tei_p7400lDW7vdCYZGSpB6aGMPx569l--qVDlMkSzRZjyJv22tYALeeVTMwJhnT3RvJJuU_z2jEnD_Y2PxZhMvSApf6swCBRyC2jgkGqRTAIX4Zk5mm_U2cAp6iJ6HfDIKxf7sOKoNQqW7MeIm4Lwlz153s6I8KVlDLXqwjwyzm_6eS_i311EXkeAwI2MRQL4Wh1f5Lm1lHIljPBm3Tlh1q0qwCvT1GNFL9niwktgqN9khwz8AL5J63mg", category: 'Lip Gloss', description: "Richly pigmented lipstick with a soft matte finish that doesn't dry out your lips.", badge: 'On Sale' },
  { id: '5', name: "Crystal Clear Gloss", sub: "High Shine", price: 28000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6B2ky3Wv5aQQNEp03ILaWXLGRMZffXd4p8hk5nhpUSJQ56AdjasSwM5HnPgSV3C8DU-vJSa46jkQHliHXoiUZrQDqfLLc6hjD8QxWQU10Zfz5JVz2Kb4fcNwryvMdJhR_tcYRiUV0og5D6-PLkkae3KmBEkC9tsXXOLzSv8jM9eGGQZwFwbGDOLQt16VRjR3XA_a_8uWhYad_EQMunPdeiETqwLWVjEnrXL0MKzLJEN127rt0ZMDN3_GcWApKHpYRho24q9YOnE8", category: 'Lip Gloss', description: "The ultimate clear gloss for a mirror-like shine that can be worn alone or over lipstick." },
  { id: '6', name: "Rose Petal Lip Liner", sub: "Precision Define", price: 22000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNuNqHpDTC6N3IPpFFBBL0nOBt_OO6IWHt74ygkxqvAdR664On-900ApFUhNCRtrdABUHZ65_BQIrfsahCk4DZvWPgRWMF3_DwjLsYxS0IZXw5NZ3iSMe3tL15OiOuRoOkhM8wgSlGwRNNkgbrxeOnWSxtxrXRomglAJk8HYyKBf48DNPKk1ahzcB4P0Q07c9Nd8PIEg4on3qtqr-DJAGvEHFIhz71DgegOzJ8lVfzcqzMv8cuh_VNdr92Tr_RG8AKpKCB1OViCVE", category: 'Lip Liners', description: "Creamy, long-wearing lip liner to define and shape your lips with precision.", badge: 'Best Seller' },
  { id: '7', name: "Velvet Lip Mask", sub: "Overnight Repair", price: 35000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGqJXww6B6Wq-XRY4-YMiwcdRZThZeLJ8S02PWZ81FOeiESkkdzsvhHBAag5XOkFkmNa8AQ-ypFrZOa_UZPVNbVC0V6cHD6a9FfW6kXGuBNifNEO6MVdu78VYjAQpMdy_N6qAppo_Peqe0zgV8-0_LNC-HznfLt7mFONy5RsjIj2nYYp-Y3t05f3z7dKOtV4fbF4KiOlPNFclc66gHp6ZTjrTKdPCThVJJTJDgY69O1KoXQAowh-datfXqpYji0NeVpHGZjQQ9UIg", category: 'Lip Masks', description: "An intensive overnight mask that soothes and moisturizes lips while you sleep." },
  { id: '8', name: "Glow Hydration Face Mask", sub: "Deep Moisture", price: 40000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzLEAUcO2O9lgSNRfWuwn3iTrzc2AETR_u72m8reajnJHqOfb8jtqEXot_LI4onz5U7mYilkB1eAeGbvekCVMyvU6bwH2FWyFl0YBIOoR_8gWHTuhM1TQgeMU-C8ASAwZ8BBBrmXrMZHZdWAuuUq-5fF5cBEfGPF5f7YzpXzehVc3m5Yb9xP7-bK0M3AzHkvwgdNhgKKXiN5ob3lPmzRDUkIYiLDJSdthI8CMM8whSqIumr3mvYVHeIcK4V_QQSlVAqH8eFkTGYWQ", category: 'Face Masks', description: "A refreshing gel mask that instantly quenches dry skin and boosts radiance." },
  { id: '9', name: "Sugar Kiss Lip Scrub", sub: "Exfoliating", price: 18000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByY4UWFbo67-ZYxSqQdVTFutE4gp1h1JPd3b5O1k71rdcJ_z95yQirgOvO-OYqwPq7aLqJ_GInwGgoSg8gWsLCCBHeqtWY3AQY-U1w1kV9QpBPq8-YlpO3VI5XaOxmaCV6w_bnYQJP6w3VQlIZMvdHp_wBJ_5ojvqHcaaJke-eU6Bn5XIJ68uBkDj04Zm54ocdj48VO4RGaICO4gA5pxRGd6A8SjZ_5kDlKmRf58cMBpQpoji6BgErQodzjbnEjH391PB0yf9UMG8", category: 'Lip Scrubs', description: "Gentle sugar scrub that buffs away dead skin for soft, smooth, kissable lips." },
  { id: '10', name: "Plush Beauty Headband", sub: "Soft Pink", price: 15000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq1p7bQY7iihF753CHbcNtFf26vESdRcFICULbtYX_vRy3g5y9qnFZSy5fCvh3Z70PQth_kYlCQt3FwZYZOUZSs506GCmuhNwpggT_rOY4opRvs4-uCkTzvcKw_KPS1kJtok7vahwk0l9urW7QENVFr-OAddONPE4XAaHfsPclY7ZyTk6AjypxmKdKRm9uManlbEAq0kzVHkvQlcCx4F_-9vWFAfmEz6M2VCY26sDpGcFphgXVgGOjZXpIfgOxkCun2NO2U6LjD68", category: 'Accessories', description: "Keep hair away from your face during your skincare routine with this ultra-soft headband." },
  { id: '11', name: "Diamond Shine Gloss", sub: "Sparkle Finish", price: 28000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJxF7ArW7cz8BJkNhJpMf6Zhg48Gq23-oUMjn5YCMunP9UlBdLr_GIc5LuR3BSRuCl-mFjlgcV7zdY_ToOGlWi0TfSxXhMUQXlDhXwzXfI96h8RKDUrd_BdxCACb3h0Cho6vRdVt1GuRhd0McDFRrk8ynIY6Lse8D5uvMTZ1jlMz9ttpBcXHDmU1w8QtavojGnHH4z0KMG941Nkr1tcbmsTAGdaWWqNMeBVWGM1P6jrKWZUSRY3UthiMVsyJ7jks3tYMQvifHrz-I", category: 'Lip Gloss', description: "A high-shine gloss infused with micro-shimmer for a dazzling, diamond-like finish." },
  { id: '12', name: "Nude Attitude Lip Liner", sub: "Natural Shade", price: 22000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMO72ZznnFJse2TrsAfr265Wedb_JovSJVE63eM46PfvB8isVpZF_gboS5T7Q2BDxiSXkz16DQuuoZQ_YCBsRAI_Exbt2NqXFqeXLhIaQ8t9RJrNGWxbZs5CXV_hKehEFIp5Vk0rALSDpTkfq5xdS1rZsIXLSZSMIFgJ1X8Wy58ZEjXW52uZt_J85JpiUihvw_LJ7bxde6ksCTkpgrosXHyB1iZOHiNw8oMLDv2eGABgsDN12DI7rjdKrZoMvg8SqPoPlUuEyTDk4", category: 'Lip Liners', description: "The perfect nude lip liner to contour and define your lips for a natural look.", badge: 'New Arrival' },
];

const MOCK_REVIEWS: Review[] = [
  { id: 1, name: "Sarah J.", rating: 5, text: "Best gloss I've ever used. Not sticky at all!", date: "Oct 20, 2023" },
  { id: 2, name: "Emily R.", rating: 5, text: "Love the shine and the smell is amazing.", date: "Oct 15, 2023" },
  { id: 3, name: "Michael B.", rating: 4, text: "Great product, but the shipping took a bit longer than expected.", date: "Oct 10, 2023" }
];

// Helper function to format price based on currency
const formatPrice = (price: number, currency: Currency) => {
  if (currency === 'USD') {
    // Approximate conversion rate: 1 USD = 1400 NGN (Simplified for demo)
    const usdPrice = price / 1400;
    return `$${usdPrice.toFixed(2)}`;
  }
  return `₦${price.toLocaleString()}`;
};

// --- Shared Components ---

const Header = ({ activePage, navigate, cartCount, user, searchTerm, setSearchTerm, currency, setCurrency }: { activePage: Page, navigate: (p: Page) => void, cartCount: number, user: User | null, searchTerm: string, setSearchTerm: (t: string) => void, currency: Currency, setCurrency: (c: Currency) => void }) => {
  const navLinkClass = (page: Page) => 
    `text-sm font-medium transition-colors cursor-pointer ${activePage === page ? 'text-primary font-bold' : 'text-text-light hover:text-primary'}`;
  
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-center border-b border-subtle-light bg-background-light/90 backdrop-blur-sm">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Strictly ZARA'S GLOSS */}
        <div className="flex items-center gap-4 cursor-pointer mr-8" onClick={() => navigate('home')}>
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_header)">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </g>
              <defs><clipPath id="clip0_header"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tighter font-serif text-text-light whitespace-nowrap">ZARA'S GLOSS</h2>
        </div>
        
        <nav className="hidden items-center gap-8 lg:flex">
          <a onClick={() => navigate('shop')} className={navLinkClass('shop')}>Shop</a>
          <a onClick={() => navigate('about')} className={navLinkClass('about')}>About Us</a>
          <a onClick={() => navigate('journal')} className={navLinkClass('journal')}>Journal</a>
          <a onClick={() => navigate('contact')} className={navLinkClass('contact')}>Contact</a>
          <a onClick={() => navigate('wishlist')} className={navLinkClass('wishlist')}>Wishlist</a>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          {/* Currency Switcher - Animated Dropdown */}
          <div className="relative hidden md:block">
             <button 
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 bg-transparent border-none text-sm font-medium text-text-light focus:outline-none cursor-pointer hover:text-primary transition-colors"
             >
               <span>{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
               <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`}>expand_more</span>
             </button>
             
             <div className={`absolute right-0 top-full mt-2 w-32 bg-white dark:bg-background-dark rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out origin-top-right z-50 ${isCurrencyOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}`}>
                <div className="py-1">
                  <button
                    onClick={() => { setCurrency('NGN'); setIsCurrencyOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${currency === 'NGN' ? 'bg-primary/10 text-primary font-bold' : 'text-text-light hover:bg-subtle-light'}`}
                  >
                    ₦ NGN
                  </button>
                  <button
                    onClick={() => { setCurrency('USD'); setIsCurrencyOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${currency === 'USD' ? 'bg-primary/10 text-primary font-bold' : 'text-text-light hover:bg-subtle-light'}`}
                  >
                    $ USD
                  </button>
                </div>
             </div>
          </div>

          <div className="hidden max-w-xs flex-1 md:flex">
            <div className="relative w-full">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light text-[20px]">search</span>
              <input 
                className="w-full h-10 pl-10 pr-4 rounded-full bg-subtle-light border-0 focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-text-muted-light transition-all" 
                placeholder="Search products..." 
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (activePage !== 'shop') navigate('shop');
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-subtle-light"
              onClick={() => navigate('shop')} 
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <button 
              className={`flex h-10 w-10 items-center justify-center rounded-full hover:bg-subtle-light ${user ? 'text-primary' : ''}`} 
              onClick={() => user ? navigate('profile') : navigate('auth')}
            >
              <span className="material-symbols-outlined">{user ? 'account_circle' : 'person'}</span>
            </button>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-subtle-light" onClick={() => navigate('cart')}>
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ navigate, setCategory }: { navigate: (p: Page) => void, setCategory: (c: Category | 'All Products') => void }) => (
  <footer className="w-full border-t border-black/10 bg-background-light py-10 mt-auto">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
         <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('home')}>
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_footer)">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </g>
              <defs><clipPath id="clip0_footer"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight font-serif text-text-light">ZARA'S GLOSS</h2>
        </div>
        
        {/* Newsletter Signup Form */}
        <div className="w-full md:w-auto max-w-md">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light mb-3">Subscribe to our Newsletter</h3>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-10 px-4 rounded-l-lg border border-border-color text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-white"
            />
            <button className="h-10 px-6 bg-primary text-white text-sm font-bold rounded-r-lg hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex gap-6">
           <a className="hover:text-primary cursor-pointer text-text-light"><i className="material-symbols-outlined">public</i></a>
           <a className="hover:text-primary cursor-pointer text-text-light"><i className="material-symbols-outlined">share</i></a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-black/10 pt-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light">Shop</h3>
          <a onClick={() => { setCategory('All Products'); navigate('shop'); }} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Shop All</a>
          <a onClick={() => { setCategory('Lip Gloss'); navigate('shop'); }} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Lips</a>
          <a onClick={() => { setCategory('Face Masks'); navigate('shop'); }} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Face</a>
          <a onClick={() => { setCategory('All Products'); navigate('shop'); }} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Sets</a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light">Support</h3>
          <a onClick={() => navigate('contact')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Contact Us</a>
          <a onClick={() => navigate('shipping')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Shipping</a>
          <a onClick={() => navigate('returns')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Returns</a>
          <a onClick={() => navigate('faq')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">FAQ</a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light">Legal</h3>
          <a onClick={() => navigate('privacy')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Privacy Policy</a>
          <a onClick={() => navigate('terms')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Terms of Service</a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light">About</h3>
          <a onClick={() => navigate('about')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Our Story</a>
          <a onClick={() => navigate('journal')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Journal</a>
          <a onClick={() => navigate('testimonials')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Testimonials</a>
        </div>
      </div>
      <div className="mt-12 border-t border-black/10 pt-8 text-center text-sm text-text-muted-light">
        <p>© 2024 ZARA'S GLOSS. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Quick View Modal ---

const QuickViewModal = ({ product, isOpen, onClose, addToCart, toggleWishlist, isInWishlist, currency }: { product: Product | null, isOpen: boolean, onClose: () => void, addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void, isInWishlist: (id: string) => boolean, currency: Currency }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 z-10" onClick={onClose}>
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${product.img})` }}></div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-serif font-bold text-text-light mb-2">{product.name}</h2>
          <p className="text-text-muted-light text-sm mb-4">{product.sub}</p>
          <p className="text-xl font-bold text-primary mb-4">{formatPrice(product.price, currency)}</p>
          <p className="text-text-light/80 text-sm mb-6 line-clamp-3">{product.description || "A luxurious beauty essential for your daily routine."}</p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => { addToCart(product); onClose(); }}
              className="flex-1 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`h-12 w-12 flex items-center justify-center border border-border-color rounded-lg hover:bg-subtle-light transition-colors ${isInWishlist(product.id) ? 'text-primary' : 'text-text-muted-light'}`}
            >
              <span className={`material-symbols-outlined ${isInWishlist(product.id) ? 'filled' : ''}`}>favorite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialShareButtons = () => (
    <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.635 4.218 3.82 4.652-.76.207-1.564.246-2.384.092.627 1.956 2.445 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-1.01 0-1.928-.057-2.828-.168 2.396 1.536 5.246 2.434 8.312 2.434 9.878 0 15.34-8.158 15.01-15.632.97-.699 1.8-1.568 2.46-2.548z"/></svg>
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.318.545 3.591.545 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
        </button>
    </div>
);

// --- Pages ---

const HomePage = ({ navigate, addToCart, toggleWishlist, isInWishlist, currency, setCategory }: { navigate: (p: Page) => void, addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void, isInWishlist: (id: string) => boolean, currency: Currency, setCategory: (c: Category | 'All Products') => void }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col w-full">
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        addToCart={addToCart} 
        toggleWishlist={toggleWishlist} 
        isInWishlist={isInWishlist}
        currency={currency}
      />

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-3xl bg-cover bg-center bg-no-repeat p-8 text-center shadow-sm overflow-hidden relative" 
             style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8T6fJD1l0k-AQDGzS3SHebplRLvYBC5Rk4ZpjjEe1YZQ33u8l13BNQqJ7zRYIG0h8jhIgGTKP6CZAk7QeJPeiLrvBcqPT6_EvtDQPNTxpGW3dWaq-Hnd66S-iGSW1UmvlzLb6KbI7PzmlzpSuGj0WcjgfemE8SL_OlR0ZvqJ9hhSF2tGDA9ZBW3pNTXfRdaBjW2CuPKv01Sx0RD314uJ1QHBh9m-qZFsANLM-23Ocq_0OHOujWOqoT6CqX0JCW_d94ONawawjTtQ")' }}>
          <div className="flex flex-col gap-4 z-10">
            <h1 className="font-serif text-5xl font-bold text-white md:text-7xl drop-shadow-lg">Gloss Up. Glow Up.</h1>
            <h2 className="max-w-xl mx-auto text-lg font-medium text-white/90 md:text-xl">Unveil your radiance with our exclusive collection of luxury beauty essentials. Beauty made just for you.</h2>
          </div>
          <button onClick={() => navigate('shop')} className="z-10 flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90">
            Shop Now
          </button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-text-light font-serif">Discover Our Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((item) => (
            <div key={item.id} className="group flex flex-col gap-3 cursor-pointer relative" onClick={() => navigate('product')}>
              <div className="relative w-full aspect-[3/4] bg-subtle-light rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                
                {/* Badges */}
                {item.badge && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    item.badge === 'New Arrival' ? 'bg-blue-100 text-blue-800' :
                    item.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.badge}
                  </div>
                )}

                {/* Quick View Button Overlay */}
                <button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto px-4 h-9 bg-white/90 backdrop-blur-sm text-text-light text-xs font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white z-20"
                  onClick={(e) => { e.stopPropagation(); setQuickViewProduct(item); }}
                >
                  Quick View
                </button>
              </div>
              <div>
                <p className="text-lg font-bold text-text-light">{item.name}</p>
                <p className="text-sm text-text-muted-light">{item.sub}</p>
                <p className="mt-1 font-medium text-text-light">{formatPrice(item.price, currency)}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                className="mt-2 w-full h-10 rounded-lg bg-primary text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-subtle-light py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-light font-serif mb-4">Join the Gloss Club</h2>
          <p className="text-lg text-text-muted-light mb-8">Sign up for exclusive offers, new product launches, and more.</p>
          <div className="flex max-w-md mx-auto">
            <input className="flex-1 h-14 rounded-l-full border-0 bg-white px-6 text-base focus:ring-2 focus:ring-primary" placeholder="Enter your email" type="email" />
            <button className="h-14 px-8 rounded-r-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ navigate, addToCart, searchTerm, toggleWishlist, isInWishlist, currency, selectedCategory, setSelectedCategory }: { navigate: (p: Page) => void, addToCart: (p: Product) => void, searchTerm: string, toggleWishlist: (p: Product) => void, isInWishlist: (id: string) => boolean, currency: Currency, selectedCategory: Category | 'All Products', setSelectedCategory: (c: Category | 'All Products') => void }) => {
  const categories = ['All Products', 'Lip Gloss', 'Lip Liners', 'Lip Masks', 'Face Masks', 'Lip Scrubs', 'Accessories'];
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
            <div key={item.id} className="group flex flex-col gap-4 relative" onClick={() => navigate('product')}>
              <div className="relative w-full aspect-[3/4] bg-subtle-light rounded-xl overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                
                {/* Badges */}
                {item.badge && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    item.badge === 'New Arrival' ? 'bg-blue-100 text-blue-800' :
                    item.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.badge}
                  </div>
                )}

                <button 
                  className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white z-20"
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                >
                  <span className={`material-symbols-outlined text-lg ${isInWishlist(item.id) ? 'filled text-primary' : ''}`}>favorite</span>
                </button>

                {/* Quick View Button Overlay */}
                <button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto px-4 h-9 bg-white/90 backdrop-blur-sm text-text-light text-xs font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white z-20"
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

const ProductPage = ({ navigate, addToCart, toggleWishlist, isInWishlist, currency }: { navigate: (p: Page) => void, addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void, isInWishlist: (id: string) => boolean, currency: Currency }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const product = PRODUCTS[0]; // Displaying the first product as example for Product Details page

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      setReviews([...reviews, { ...newReview, id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }]);
      setNewReview({ name: '', rating: 5, text: '' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-sm text-text-muted-light mb-8">
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('home')}>Home</span>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('shop')}>Lip Gloss</span>
        <span>/</span>
        <span className="text-text-light font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCnGUgg5iI5A7vNf2mgSv5e1TcxHkOx0rmoPSkrEwqJj3Mg-KMogoPbG99ZxcAiXcKDgT_UqjJbi1s0TtvVqJvvpT3FS5pTfaSUW5kqFgZeVXNyw-15a6QPCsJ_9jIl7NQR77gYLL0E3b2zlv_jDCXIa5v8Zg2w3JVKbEpVT0iUt1SDTLarBOf42Jm9eFFYtnLJKP1dvZHuO8ypivrDFu3DS8T3I6rSPuWWoFqKj8EskHoYavjwe_kmM7EQP0epBhzcy6ZXg1FQtZk",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBwTIqxLxc73x-O84l68mY35Qb3asmRXY5bXsPAer1gga6M6DYy3JF0hbUzSuqcz2zbDrmSdaXnGyUko70Ydx61zTOz2uPMSMZsW7331SqoHBDoJi08THBOlTL76_GdX5P-DlJQek_-JzWIpG_uqAe-hWp1gja899enTZ70f2GeuN1SpF0_QgJzTklvs-DZ3mGEl9Q_ZeYxoJOQFXuEf3kpAYgoNafcgrQyq0JyH1QDe6zJvV8E9EQ6Xe7pEmz9a2Tn7qSxl985ZqA",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuBCjlemriFiW-h-Y0AFzToGMt2ud3LZAi2RxaEvtCotxQJ3-LAucOTYV1e3PTGMKmaFSv_tpCqtLsNbDC5DDA7LrrJHMEU2i3uDKNe3eKhMFjOCKgOhIlR4ZomYZWrbrZF21KuR0LAnV1VwqHb1tVnUBH9JMWq8aUeKOST0BVtVW7N89dLK0E_VL9GdqNoTIK_ZCd6hrpH97qHU4KSjUUS6La_4m8RboJ-jhkUA2OLM8E86Ic4MurqFvUZO7KLDVsLpuZ26QKlg4uw"
            ].map((img, i) => (
              <div key={i} className={`w-20 h-20 rounded-lg bg-cover bg-center cursor-pointer border-2 ${i === 0 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`} style={{ backgroundImage: `url(${img})` }}></div>
            ))}
          </div>
          <div className="flex-1 aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCerzxNisJ_Vb07Wgpl1tW20tRBSmxxNgFfvpsrBaH5Y3AmZ-vlvyF0f8rCu9uhlPb3rUs8jEfCP32qf4LShdIPXk2q7uut1BKjLxTE14nh4zgmJWTRGukUUPDofnjKBj1iu7nIFq1uTi2065uQvnFCrOk9GQqrerKsF-uByfJTInPGCwM02tyzqlc30xkElyrBqIvz-sI0dGdBFcdD-AmNfCWG5ppGfPkjqzrs8MFEKcybgEYSTQ4fx3LIS13tIRe4Bf4MWofPJ-I")' }}></div>
        </div>

        <div className="flex flex-col">
          {/* Product Badge */}
          {product.badge && (
            <span className={`w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              product.badge === 'New Arrival' ? 'bg-blue-100 text-blue-800' :
              product.badge === 'Best Seller' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="text-4xl font-serif font-bold text-text-light mb-2">{product.name}</h1>
          <p className="text-lg text-text-muted-light mb-4">{product.sub}</p>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-primary">
              {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined filled text-lg">star</span>)}
              <span className="material-symbols-outlined text-lg">star</span>
            </div>
            <span className="text-sm text-text-muted-light">({reviews.length} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-text-light mb-8">{formatPrice(product.price, currency)}</p>

          <div className="flex items-center gap-6 mb-8">
            <button onClick={() => addToCart(product)} className="flex-1 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md">
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`h-12 w-12 flex items-center justify-center border border-border-color rounded-lg hover:bg-subtle-light transition-colors ${isInWishlist(product.id) ? 'text-primary' : 'text-text-muted-light'}`}
            >
              <span className={`material-symbols-outlined ${isInWishlist(product.id) ? 'filled' : ''}`}>favorite</span>
            </button>
          </div>
          
          <SocialShareButtons />

          <div className="border-t border-border-color pt-8 mt-6">
            <div className="flex gap-8 border-b border-border-color mb-6">
              <button 
                className={`pb-3 border-b-2 font-medium transition-colors ${activeTab === 'description' ? 'border-primary text-text-light font-bold' : 'border-transparent text-text-muted-light hover:text-primary'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`pb-3 border-b-2 font-medium transition-colors ${activeTab === 'ingredients' ? 'border-primary text-text-light font-bold' : 'border-transparent text-text-muted-light hover:text-primary'}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={`pb-3 border-b-2 font-medium transition-colors ${activeTab === 'reviews' ? 'border-primary text-text-light font-bold' : 'border-transparent text-text-muted-light hover:text-primary'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            <div className="text-text-light/80 leading-relaxed min-h-[150px]">
              {activeTab === 'description' && (
                <p>Experience the ultimate in lip luxury with our Luxe Shine Lip Gloss. This formula provides a brilliant, long-lasting shine without the stickiness. Enriched with nourishing Vitamin E and Jojoba Oil, it hydrates and conditions your lips, leaving them feeling soft, supple, and irresistibly smooth.</p>
              )}
              {activeTab === 'ingredients' && (
                <p>Polybutene, Octyldodecanol, Bis-Diglyceryl Polyacyladipate-2, Tricaprylin, Cera Microcristallina (Microcrystalline Wax), Euphorbia Cerifera (Candelilla) Wax, Ricinus Communis (Castor) Seed Oil, Silica Dimethyl Silylate, Butyrospermum Parkii (Shea) Butter, VP/Eicosene Copolymer, VP/Hexadecene Copolymer, Octyldodecyl Stearoyl Stearate, Simmondsia Chinensis (Jojoba) Seed Oil, Tocopheryl Acetate.</p>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Review Form */}
                   <form onSubmit={handleReviewSubmit} className="bg-subtle-light p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-bold mb-3">Write a Review</h4>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full mb-2 p-2 rounded border border-border-color text-sm focus:ring-primary focus:border-primary"
                      value={newReview.name}
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                      required
                    />
                    <textarea 
                      placeholder="Your Review" 
                      className="w-full mb-2 p-2 rounded border border-border-color text-sm focus:ring-primary focus:border-primary"
                      rows={2}
                      value={newReview.text}
                      onChange={e => setNewReview({...newReview, text: e.target.value})}
                      required
                    ></textarea>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded text-xs font-bold hover:bg-primary/90">Submit Review</button>
                  </form>

                  {/* Review List */}
                  {reviews.map((review) => (
                     <div key={review.id} className="border-b border-subtle-light pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text-light">{review.name}</span>
                          <div className="flex text-primary text-xs">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'filled' : ''}`}>star</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-text-muted-light">{review.date}</span>
                      </div>
                      <p className="text-sm">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="w-full">
    <section className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center text-center px-4" style={{ backgroundImage: 'linear-gradient(rgba(25, 16, 20, 0.3), rgba(25, 16, 20, 0.3)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqzs1Ib9Sbtnii4lUdeo-1aLleBpa_O2_sw3zzw6tTgdty5EwKQgR-8LX2wD4GxymFyjN-h-LWfZsZgOc0cc8chdASMxi5IuNnw5G1ltRb-sVL5r5UyeEXwsX1BxHPkYD8ohk7Ok8U8sbl3ZjgKob22cicSyBDcQ48ZUMIaPZ4CBOrjrq5iUDhNMrAQ-YzY4CqFHtqbrTjThM2yNJSgYvvZqlX8iOrbzGhBLUqEiFpbDIdu1_Mozo7TPWxXe8XHFeXeDBE0WfxBzw")' }}>
      <div className="max-w-4xl">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">Beauty, Crafted by Hand.</h1>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary">Inspired by You.</h2>
      </div>
    </section>
    
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h2 className="font-serif text-4xl font-bold text-text-light mb-8">Our Story</h2>
      <p className="text-lg text-text-light/80 leading-relaxed">
        ZARA'S GLOSS was born from a passion for authentic, handcrafted quality and a deep belief that luxury should be both beautiful and conscious. We meticulously source our ingredients and craft each product with care, ensuring an experience that is as pure as it is indulgent.
      </p>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="h-[500px] rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJwr63qbRaf306IRwe23935CrM9qneaEQkLJOUbBg4hXTBG4EEUvttJIHXaOkhD9_UxZO8ujuoP2p-PzC5tFBCj5crlBnYajlVJ4ng5JhF8qhNsiss81Um52qD2_q4ZVOxaSGdqHEk5X128Uur9G3Cw2mcdYA4w0oZI1LMQqvK-BwBHdGm_IFWmuDcfe0Xvsq7RvxaI9q00sYDcj12TkdQgx17m-iKeDkE1QvuGikQUbYXrdvPcWBZ_XLJvJnnjTq5OeTonhKk8mY")' }}></div>
        <div>
          <h3 className="font-serif text-3xl font-bold text-primary mb-6">Handcrafted Excellence</h3>
          <p className="text-lg text-text-light/80 leading-relaxed">
            Each product is a testament to our commitment to craftsmanship. We blend traditional techniques with modern science to create formulations that are not only effective but also a joy to use. Our small-batch process ensures the highest quality.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const TestimonialsPage = () => (
  <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-black tracking-tight text-text-light mb-4">Words from Our Community</h1>
      <p className="text-lg text-text-muted-light">Real stories from our valued customers.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "Jessica P.", date: "October 12, 2023", text: "Absolutely in love with the Glow Serum! My skin has never felt so radiant and smooth.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrAX-YPzbIOc_Tka6741DbjinUDCYc43AmnSxddlzIgr9_KHWr39gScOD2yqANc7oIBUCSROh7of6lU9oez3Pk8oU9wKOqwZssO80ok8I_vnNe5tgBCjAblHCmqhGR2wkTSxPTm2FXHyXQfzCut0aKLv2lej0azVwK0zDUoJ8nXyG4KP_IzaR36b4xWqWaYGDcIBVfT2wP0ft_H56Gd2gxEFsji9IV3n8a09vQjwl_MqTntOUILRh9r7JFCBHG4hy3DEENdMzDDcs" },
        { name: "Amanda K.", date: "September 28, 2023", text: "The Velvet Matte lipstick is my new holy grail. The color is rich and it lasts all day.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKzLXBSxFEOnRSp27uCsYafKHbiWd0sCW6f6iLwFyyFNvkQtQuM0kfS2O_CG_o02xAgTkMOazc8yAzsQ-lT97qZcth3qrb5Ly0wkoTEn42pLFm_oWd5yXkDFw1kZ7OIXv-dt2Sx9CrmZL3b6Jvb1H7X1vXNN4PGM91HzC7JAzfjtIm8tDdk3ssb_OrQ2H-Jn3AHXH-GCUhmJfF21u5m7IvjiJjMDlYDuMRY5EyEJl-wSZZD3I6h7kQ7hN27a2o1nHemKRGHcf346M" },
        { name: "Sophia L.", date: "September 15, 2023", text: "The Radiance Foundation provides great coverage without feeling heavy. Very impressed.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHvKagbHRj8vphbktWtnAsTN4GMC-3STyn0h3NHJjF7pUF-2UJwMHKtWTAnA9NvZemIansk5QBmy4zh_0tHGBNSOGgdghqeikq5OPUH4L7H5XhUkbP_hsPkZKv07xAwxigjCg5CRMS5N0Capmic7dMSM4_lQraeLS3nR1Hgp3WRYxt2R8RPC3p4_s2wQ29STDY83EdKIkd6KoJ-BHix7GlJHpGKPAXknGjqgpnkk0sIgnADMQqIvqPsXTgxJ-0uuUqE8t1--7DQjQ" }
      ].map((review, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-subtle-light">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${review.img})` }}></div>
            <div>
              <p className="font-bold text-text-light">{review.name}</p>
              <p className="text-sm text-text-muted-light">{review.date}</p>
            </div>
          </div>
          <div className="flex text-primary mb-3">
            {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined filled text-xl">star</span>)}
          </div>
          <p className="text-text-light/80">{review.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const CartPage = ({ navigate, cartItems, updateQuantity, currency }: { navigate: (p: Page) => void, cartItems: CartItem[], updateQuantity: (id: string, delta: number) => void, currency: Currency }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-text-light mb-10">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-subtle-light rounded-full flex items-center justify-center text-text-muted-light mb-6">
             <span className="material-symbols-outlined text-4xl">shopping_bag</span>
          </div>
          <h2 className="text-2xl font-bold text-text-light mb-2">Your cart is feeling a little lonely!</h2>
          <p className="text-lg text-text-muted-light mb-8 max-w-md">Let's fill it up with some goodies.</p>
          <button onClick={() => navigate('shop')} className="h-14 px-10 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-6 py-6 border-b border-subtle-light items-center">
                <div className="w-24 h-24 bg-subtle-light rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-text-light">{item.name}</h3>
                  <p className="text-text-muted-light">{item.sub}</p>
                  <p className="text-text-muted-light mt-1">{formatPrice(item.price, currency)}</p>
                </div>
                <div className="flex items-center border border-border-color rounded-lg h-10">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-3 text-text-muted-light hover:text-primary">-</button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-3 text-text-muted-light hover:text-primary">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-subtle-light">
              <h3 className="text-xl font-bold text-text-light mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-muted-light">
                  <span>Subtotal</span>
                  <span className="text-text-light font-medium">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-text-muted-light">
                  <span>Shipping</span>
                  <span className="text-text-light font-medium">Calculated at next step</span>
                </div>
              </div>
              <div className="border-t border-subtle-light pt-4 mb-8">
                <div className="flex justify-between text-lg font-bold text-text-light">
                  <span>Total</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
              </div>
              <button onClick={() => navigate('checkout')} className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = () => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-8">Secure Checkout</h1>
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl border border-subtle-light">
        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-text-muted-light mb-2">Full Name</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-text-muted-light mb-2">Address</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted-light mb-2">City</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted-light mb-2">Postal Code</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-subtle-light">
        <h2 className="text-xl font-bold mb-6">Payment Details</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted-light mb-2">Card Number</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted-light mb-2">Expiry Date</label>
              <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted-light mb-2">CVC</label>
              <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" placeholder="123" />
            </div>
          </div>
        </div>
      </div>

      <button className="w-full h-14 bg-primary text-white text-lg font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg">
        Place Order
      </button>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="w-full max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h1 className="font-serif text-5xl font-bold text-text-light mb-4">Get In Touch</h1>
      <p className="text-lg text-text-muted-light">We'd love to hear from you. Fill out the form below.</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-soft">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">Full Name</label>
            <input type="text" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">Email Address</label>
            <input type="email" className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">Message</label>
            <textarea rows={4} className="w-full rounded-lg border-border-color focus:ring-primary focus:border-primary"></textarea>
          </div>
          <button className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Send Message
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div>
            <h3 className="font-bold text-text-light">Email</h3>
            <p className="text-text-muted-light">support@zarasgloss.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">call</span>
          </div>
          <div>
            <h3 className="font-bold text-text-light">Phone</h3>
            <p className="text-text-muted-light">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <h3 className="font-bold text-text-light">Business Hours</h3>
            <p className="text-text-muted-light">Mon - Fri: 9am - 5pm EST</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WishlistPage = ({ wishlistItems, addToCart, toggleWishlist, addAllToCart, currency, isInWishlist }: { wishlistItems: Product[], addToCart: (p: Product) => void, toggleWishlist: (p: Product) => void, addAllToCart: (items: Product[]) => void, currency: Currency, isInWishlist: (id: string) => boolean }) => {
    const [wishlistSearchTerm, setWishlistSearchTerm] = useState('');
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    const filteredWishlist = wishlistItems.filter(item => 
        item.name.toLowerCase().includes(wishlistSearchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <QuickViewModal 
                product={quickViewProduct} 
                isOpen={!!quickViewProduct} 
                onClose={() => setQuickViewProduct(null)} 
                addToCart={addToCart} 
                toggleWishlist={toggleWishlist} 
                isInWishlist={isInWishlist}
                currency={currency}
            />

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h1 className="text-4xl font-black text-text-light">My Wishlist</h1>
                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light">search</span>
                    <input 
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-subtle-light border-0 focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-text-muted-light transition-all"
                        placeholder="Search wishlist..."
                        type="text"
                        value={wishlistSearchTerm}
                        onChange={(e) => setWishlistSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-20">
                <p className="text-xl text-text-muted-light mb-6">Your wishlist is empty.</p>
                </div>
            ) : filteredWishlist.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-text-muted-light">No items found in wishlist.</p>
                </div>
            ) : (
            <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredWishlist.map((item, i) => (
                    <div key={i} className="flex flex-col gap-3 relative group cursor-pointer" onClick={() => setQuickViewProduct(item)}>
                    <div className="w-full aspect-[3/4] rounded-lg bg-cover bg-center relative" style={{ backgroundImage: `url(${item.img})` }}>
                        <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white z-10"
                        >
                        <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                         {/* Quick View Button Overlay */}
                        <button 
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto px-4 h-8 bg-white/90 backdrop-blur-sm text-text-light text-xs font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white z-10"
                            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(item); }}
                        >
                            Quick View
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="font-medium text-text-light">{item.name}</p>
                        <p className="text-sm text-text-light mt-1">{formatPrice(item.price, currency)}</p>
                        <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                        className="mt-3 w-full h-10 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors"
                        >
                        Add to Cart
                        </button>
                    </div>
                    </div>
                ))}
                </div>
                <div className="flex justify-center mt-12">
                <button 
                    onClick={() => addAllToCart(filteredWishlist)}
                    className="h-12 px-8 border border-border-color rounded-lg font-bold text-text-light hover:bg-subtle-light transition-colors"
                >
                    Add All to Cart
                </button>
                </div>
            </>
            )}
        </div>
    );
};

// --- New Pages ---

const ShippingPage = ({ currency }: { currency: Currency }) => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-6">Shipping Policy</h1>
    <div className="space-y-6 text-text-muted-light">
      <p>
        We are committed to delivering your order accurately, in good condition, and always on time. 
        Please note our shipping policies below:
      </p>
      <h2 className="text-xl font-bold text-text-light">Processing Time</h2>
      <p>Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
      <h2 className="text-xl font-bold text-text-light">Shipping Rates</h2>
      <p>Standard shipping is free for orders over {formatPrice(50000, currency)}. For orders under {formatPrice(50000, currency)}, a flat rate of {formatPrice(5000, currency)} applies.</p>
      <h2 className="text-xl font-bold text-text-light">International Shipping</h2>
      <p>We currently ship to select international countries. International shipping rates vary by location and are calculated at checkout.</p>
    </div>
  </div>
);

const ReturnsPage = () => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-6">Returns & Exchanges</h1>
    <div className="space-y-6 text-text-muted-light">
      <p>
        We want you to love your purchase. If you are not completely satisfied, we are here to help.
      </p>
      <h2 className="text-xl font-bold text-text-light">30-Day Return Policy</h2>
      <p>You have 30 days from the date of delivery to return your item. Items must be unused and in the same condition that you received them.</p>
      <h2 className="text-xl font-bold text-text-light">How to Return</h2>
      <p>To initiate a return, please contact our support team at support@zarasgloss.com with your order number and reason for return.</p>
      <h2 className="text-xl font-bold text-text-light">Refunds</h2>
      <p>Once we receive your item, we will inspect it and notify you on the status of your refund. If approved, a credit will automatically be applied to your original method of payment.</p>
    </div>
  </div>
);

const FAQPage = ({ currency }: { currency: Currency }) => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-8">Frequently Asked Questions</h1>
    <div className="space-y-6">
      {[
        { q: "Are your products cruelty-free?", a: "Yes, absolutely! We are proud to be 100% cruelty-free and vegan." },
        { q: "How can I track my order?", a: "Once your order ships, you will receive an email with a tracking number to monitor your shipment." },
        { q: `Do you offer samples?`, a: `We occasionally include free samples with orders over ${formatPrice(50000, currency)}. Check our promotions page for current offers.` },
        { q: "Can I change my order after placing it?", a: "We process orders quickly, but if you contact us within 1 hour of placing your order, we will do our best to accommodate changes." }
      ].map((faq, i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-subtle-light">
          <h3 className="text-lg font-bold text-text-light mb-2">{faq.q}</h3>
          <p className="text-text-muted-light">{faq.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const PrivacyPolicyPage = () => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-6">Privacy Policy</h1>
    <div className="space-y-4 text-text-muted-light text-sm">
      <p>Last updated: January 1, 2024</p>
      <p>At ZARA'S GLOSS, we value your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">How We Use Information</h3>
      <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">Data Security</h3>
      <p>We implement reasonable security measures to protect your personal information.</p>
    </div>
  </div>
);

const TermsOfServicePage = () => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-6">Terms of Service</h1>
    <div className="space-y-4 text-text-muted-light text-sm">
      <p>Welcome to ZARA'S GLOSS. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">Use of Service</h3>
      <p>You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">Intellectual Property</h3>
      <p>The content on this website, including text, graphics, and logos, is the property of ZARA'S GLOSS and is protected by copyright laws.</p>
      <h3 className="text-lg font-bold text-text-light mt-4">Limitation of Liability</h3>
      <p>ZARA'S GLOSS shall not be liable for any indirect, incidental, or consequential damages arising from your use of our service.</p>
    </div>
  </div>
);

const JournalPage = () => (
  <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-black font-serif text-center mb-4">The Beauty Journal</h1>
    <p className="text-center text-text-muted-light mb-12 max-w-2xl mx-auto">Tips, trends, and tales from the world of ZARA'S GLOSS.</p>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "5 Tips for the Perfect Glass Skin", date: "Jan 12, 2024", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxGXX2YIAA8KTRxkETei1MgTB1T9AQT6MEwFp-3QgudMkkG5W57L_p0cycKjCTu-jz-r2wxV1IxpDQFdOfTTn5kdPNC7M21vsAHQs1pzOB0T96UD209w6uv8gKXHybdVHLCjMpHoMef2USQTimRbrlkE_2uU2Cu8xXIVhP2pBJ9M5uIPM4KjZkypqC1qlMOuyeQ2O-zvIHrCOQHLniwn-CvNxNlhkfSzKcDtQXubkHTuLTKVOwV2-FaOV-TidJ5eMRqXM4dWwES-s" },
        { title: "Why Clean Beauty Matters", date: "Jan 05, 2024", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwr63qbRaf306IRwe23935CrM9qneaEQkLJOUbBg4hXTBG4EEUvttJIHXaOkhD9_UxZO8ujuoP2p-PzC5tFBCj5crlBnYajlVJ4ng5JhF8qhNsiss81Um52qD2_q4ZVOxaSGdqHEk5X128Uur9G3Cw2mcdYA4w0oZI1LMQqvK-BwBHdGm_IFWmuDcfe0Xvsq7RvxaI9q00sYDcj12TkdQgx17m-iKeDkE1QvuGikQUbYXrdvPcWBZ_XLJvJnnjTq5OeTonhKk8mY" },
        { title: "Meet the Founder: Zara's Vision", date: "Dec 28, 2023", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrsBDMR8rFG9hyvXvK6HkW5Ze72N-wo-3LkIjKMrI7bAP5mDRoWEwGitivCQpgMvgA_9UdWS3ysuWReVaZL-12Ygk5Tcdk4a9HmwExRooePhJH5YNtYd3w1noSf6Mdy2MN6SZlBTj6tZxAq5gKnDS84y0OQ87jQIG8194Os_yN68Jy0GRHWP2y7j0srHF9tqxayi6HAJf4KvBaijhffmXZ2tSPIThDBCh5e9DJV7QFCcmJh84NMU9tD5x3I2gE7Aczn5ah_Jf5Lp8" }
      ].map((article, i) => (
        <div key={i} className="group cursor-pointer">
          <div className="aspect-video rounded-xl bg-cover bg-center mb-4" style={{ backgroundImage: `url(${article.img})` }}></div>
          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Beauty</p>
          <h3 className="text-xl font-bold text-text-light mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
          <p className="text-sm text-text-muted-light">{article.date}</p>
          <div onClick={(e) => e.stopPropagation()}>
            <SocialShareButtons />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ForgotPasswordPage = ({ navigate }: { navigate: (p: Page) => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('new-password');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-subtle-light">
        <h1 className="text-3xl font-bold text-center mb-4 text-text-light">Reset Password</h1>
        <p className="text-center text-text-muted-light mb-8">Enter your email to receive a password reset link.</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">Email Address</label>
            <input type="email" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
          </div>
          
          <button className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Send Reset Link
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a onClick={() => navigate('auth')} className="text-sm font-medium text-text-muted-light hover:text-primary cursor-pointer">Back to Sign In</a>
        </div>
      </div>
    </div>
  );
};

const NewPasswordPage = ({ navigate }: { navigate: (p: Page) => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('auth');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-subtle-light">
        <h1 className="text-3xl font-bold text-center mb-4 text-text-light">New Password</h1>
        <p className="text-center text-text-muted-light mb-8">Please enter your new password below.</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">New Password</label>
            <input type="password" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2">Confirm Password</label>
            <input type="password" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
          </div>
          
          <button className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

const AuthPage = ({ setUser, navigate }: { setUser: (u: User) => void, navigate: (p: Page) => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup success
    setUser({ name: 'Jane Doe', email: 'jane@example.com' });
    navigate('profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-subtle-light">
        <h1 className="text-3xl font-bold text-center mb-8 text-text-light">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        
        <div className="flex mb-8 border-b border-subtle-light">
          <button 
            className={`flex-1 pb-3 font-medium transition-colors ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-muted-light hover:text-text-light'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 pb-3 font-medium transition-colors ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-muted-light hover:text-text-light'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">Full Name</label>
              <input type="text" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">Email Address</label>
            <input type="email" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">Password</label>
            <input type="password" required className="w-full h-12 rounded-lg border-border-color focus:ring-primary focus:border-primary px-4" />
          </div>
          
          <button className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors mt-4">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        {isLogin && (
          <p className="text-center text-sm text-text-muted-light mt-4">
            <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('forgot-password')}>Forgot Password?</span>
          </p>
        )}
      </div>
    </div>
  );
};

const ProfilePage = ({ user, logout, currency }: { user: User, logout: () => void, currency: Currency }) => (
  <div className="w-full max-w-5xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-8">My Account</h1>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <div className="bg-white p-6 rounded-xl border border-subtle-light text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">person</span>
          </div>
          <h2 className="text-xl font-bold text-text-light">{user.name}</h2>
          <p className="text-text-muted-light text-sm mb-6">{user.email}</p>
          <button onClick={logout} className="w-full h-10 border border-border-color rounded-lg text-sm font-medium hover:bg-subtle-light transition-colors text-text-light">
            Log Out
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-2/3 space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-text-light">Recent Orders</h3>
          <div className="bg-white rounded-xl border border-subtle-light overflow-hidden">
            {[
              { id: "#10234", date: "Oct 12, 2023", total: 73000, status: "Delivered" },
              { id: "#10201", date: "Sep 05, 2023", total: 45000, status: "Delivered" }
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center p-6 border-b border-subtle-light last:border-0 hover:bg-fbf9fa transition-colors">
                <div>
                  <p className="font-bold text-text-light">{order.id}</p>
                  <p className="text-sm text-text-muted-light">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-light">{formatPrice(order.total, currency)}</p>
                  <p className="text-sm text-green-600 font-medium">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-text-light">Account Details</h3>
          <div className="bg-white p-6 rounded-xl border border-subtle-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-text-muted-light mb-1">Name</label>
                <p className="text-text-light font-medium">{user.name}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-text-muted-light mb-1">Email</label>
                <p className="text-text-light font-medium">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-text-muted-light mb-1">Location</label>
                <p className="text-text-light font-medium">New York, USA</p>
              </div>
            </div>
            <button className="mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

const App = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Global search term
  const [currency, setCurrency] = useState<Currency>('NGN'); // Global Currency State
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All Products'>('All Products');

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id: string) => wishlistItems.some(item => item.id === id);

  const addAllToCart = (items: Product[]) => {
     items.forEach(item => addToCart(item));
     setActivePage('cart');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage navigate={setActivePage} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} currency={currency} setCategory={setSelectedCategory} />;
      case 'shop': return <ShopPage navigate={setActivePage} addToCart={addToCart} searchTerm={searchTerm} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} currency={currency} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
      case 'product': return <ProductPage navigate={setActivePage} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} currency={currency} />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'cart': return <CartPage navigate={setActivePage} cartItems={cartItems} updateQuantity={updateCartQuantity} currency={currency} />;
      case 'checkout': return <CheckoutPage />;
      case 'wishlist': return <WishlistPage wishlistItems={wishlistItems} addToCart={addToCart} toggleWishlist={toggleWishlist} addAllToCart={addAllToCart} currency={currency} isInWishlist={isInWishlist} />;
      
      // New Pages
      case 'shipping': return <ShippingPage currency={currency} />;
      case 'returns': return <ReturnsPage />;
      case 'faq': return <FAQPage currency={currency} />;
      case 'privacy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsOfServicePage />;
      case 'journal': return <JournalPage />;
      case 'auth': return <AuthPage setUser={setUser} navigate={setActivePage} />;
      case 'forgot-password': return <ForgotPasswordPage navigate={setActivePage} />;
      case 'new-password': return <NewPasswordPage navigate={setActivePage} />;
      case 'profile': return user ? <ProfilePage user={user} logout={() => { setUser(null); setActivePage('home'); }} currency={currency} /> : <AuthPage setUser={setUser} navigate={setActivePage} />;
      
      default: return <HomePage navigate={setActivePage} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} currency={currency} setCategory={setSelectedCategory} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-display text-text-light bg-background-light">
      <Header activePage={activePage} navigate={setActivePage} cartCount={cartCount} user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currency={currency} setCurrency={setCurrency} />
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      <Footer navigate={setActivePage} setCategory={setSelectedCategory} />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}