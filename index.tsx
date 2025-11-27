
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type Page = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'testimonials' | 'cart' | 'checkout' | 'wishlist' | 'shipping' | 'returns' | 'faq' | 'privacy' | 'terms' | 'journal' | 'auth' | 'profile';

interface User {
  name: string;
  email: string;
}

// --- Shared Components ---

const Header = ({ activePage, navigate, cartCount, user }: { activePage: Page, navigate: (p: Page) => void, cartCount: number, user: User | null }) => {
  const navLinkClass = (page: Page) => 
    `text-sm font-medium transition-colors cursor-pointer ${activePage === page ? 'text-primary font-bold' : 'text-text-light hover:text-primary'}`;

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
          <div className="hidden max-w-xs flex-1 md:flex">
            <div className="relative w-full">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light text-[20px]">search</span>
              <input className="w-full h-10 pl-10 pr-4 rounded-full bg-subtle-light border-0 focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-text-muted-light transition-all" placeholder="Search products..." type="text"/>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-subtle-light">
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

const Footer = ({ navigate }: { navigate: (p: Page) => void }) => (
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
        <div className="flex gap-6">
           <a className="hover:text-primary cursor-pointer text-text-light"><i className="material-symbols-outlined">public</i></a>
           <a className="hover:text-primary cursor-pointer text-text-light"><i className="material-symbols-outlined">share</i></a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-black/10 pt-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-light">Shop</h3>
          <a onClick={() => navigate('shop')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Shop All</a>
          <a onClick={() => navigate('shop')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Lips</a>
          <a onClick={() => navigate('shop')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Face</a>
          <a onClick={() => navigate('shop')} className="text-sm text-text-muted-light hover:text-primary cursor-pointer">Sets</a>
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

// --- Pages ---

const HomePage = ({ navigate }: { navigate: (p: Page) => void }) => (
  <div className="flex flex-col w-full">
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
        {[
          { name: "Luxe Lip Oil", sub: "Crystal Clear", price: "$28.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKj21ZbHEbXYRtj7j6uGi5ly-LNfWv14P0T_rBJ7aB-oqSmMH9LQnMUKKnocX1OSNcogTjVYb5Y5zBteVhphmi3GKAuxsMn4Xlg6nhOu6wlJ_u2AYY3puxrP2Z_VjYn1Oks_N7bnV9pR1mqlgnBQCv82tdCkiph4nbL6Jp8JHfptGdMInBOG2N8ue80Bo0zy-VN328MutjoPoOB-rlPgezsKv3j6kTQYKh6Zk8eFoMI8WnYgdJZXrJ7WkCUVDUiD_Go3REg__VzeQ" },
          { name: "Radiant Serum", sub: "Hydrating Elixir", price: "$45.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACYOX2EDB6sFMQZ7gVxQwv7MAQiTBgPoJL2cFNTPYPvDS5pGCqmkPIwRiDYPjagdYqdvlF9REXZOXlhD37uIpa7IyMo9gpO9Th4BZYQBLknkSjfODHpW6F9P9cy78lBr-sngMKCAKvXRZW-YK0Loe0E84Sy0FoA2xSJgU9sQZF5Ur69zxpadxW69DnEWhPMroUOwvyOaHtxLuFt37iEvZnmCF0p9Ra-bvIHvpKo7DDwToSkNRJyClJR1hxwVWJD02mhaN_Oluur1Q" },
          { name: "Glow Foundation", sub: "Shade 2N", price: "$52.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcykf455oiIm92LkgTJDw4C4PU15P0FKToSg6w71z13rUBqu_pXYbAAR11RqEXkHMSkHel4EHxpFxsT-cPSAlkb9henIyY2GeSdF9yiZ30myYNbSPQbz34mrlUm81SWjdL-7L1hYHWR268CrXMAuKzVYWS5EV8vuyleRti9S8o4R1MnDZ-NAlQnIInGe4eIkfRlCrjbbjso9cqwdGZpk5vHxSkqv1ie3cOeLFHawImWrRAhEsko6OH3QfhemNcE0BTCcZgOq-jLmY" },
          { name: "Velvet Matte Lipstick", sub: "Rose Petal", price: "$34.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR4v4uEHHtakPxFT5H_tei_p7400lDW7vdCYZGSpB6aGMPx569l--qVDlMkSzRZjyJv22tYALeeVTMwJhnT3RvJJuU_z2jEnD_Y2PxZhMvSApf6swCBRyC2jgkGqRTAIX4Zk5mm_U2cAp6iJ6HfDIKxf7sOKoNQqW7MeIm4Lwlz153s6I8KVlDLXqwjwyzm_6eS_i311EXkeAwI2MRQL4Wh1f5Lm1lHIljPBm3Tlh1q0qwCvT1GNFL9niwktgqN9khwz8AL5J63mg" }
        ].map((item, idx) => (
          <div key={idx} className="group flex flex-col gap-3 cursor-pointer" onClick={() => navigate('product')}>
            <div className="w-full aspect-[3/4] bg-subtle-light rounded-xl overflow-hidden">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
            </div>
            <div>
              <p className="text-lg font-bold text-text-light">{item.name}</p>
              <p className="text-sm text-text-muted-light">{item.sub}</p>
              <p className="mt-1 font-medium text-text-light">{item.price}</p>
            </div>
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

const ShopPage = ({ navigate }: { navigate: (p: Page) => void }) => {
  const categories = ['All Products', 'Lip Gloss', 'Lip Liners', 'Lip Masks', 'Face Masks', 'Lip Scrubs', 'Accessories'];
  
  const products = [
    { name: "Crystal Clear Gloss", price: "$28.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6B2ky3Wv5aQQNEp03ILaWXLGRMZffXd4p8hk5nhpUSJQ56AdjasSwM5HnPgSV3C8DU-vJSa46jkQHliHXoiUZrQDqfLLc6hjD8QxWQU10Zfz5JVz2Kb4fcNwryvMdJhR_tcYRiUV0og5D6-PLkkae3KmBEkC9tsXXOLzSv8jM9eGGQZwFwbGDOLQt16VRjR3XA_a_8uWhYad_EQMunPdeiETqwLWVjEnrXL0MKzLJEN127rt0ZMDN3_GcWApKHpYRho24q9YOnE8" },
    { name: "Rose Petal Lip Liner", price: "$22.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNuNqHpDTC6N3IPpFFBBL0nOBt_OO6IWHt74ygkxqvAdR664On-900ApFUhNCRtrdABUHZ65_BQIrfsahCk4DZvWPgRWMF3_DwjLsYxS0IZXw5NZ3iSMe3tL15OiOuRoOkhM8wgSlGwRNNkgbrxeOnWSxtxrXRomglAJk8HYyKBf48DNPKk1ahzcB4P0Q07c9Nd8PIEg4on3qtqr-DJAGvEHFIhz71DgegOzJ8lVfzcqzMv8cuh_VNdr92Tr_RG8AKpKCB1OViCVE" },
    { name: "Velvet Lip Mask", price: "$35.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGqJXww6B6Wq-XRY4-YMiwcdRZThZeLJ8S02PWZ81FOeiESkkdzsvhHBAag5XOkFkmNa8AQ-ypFrZOa_UZPVNbVC0V6cHD6a9FfW6kXGuBNifNEO6MVdu78VYjAQpMdy_N6qAppo_Peqe0zgV8-0_LNC-HznfLt7mFONy5RsjIj2nYYp-Y3t05f3z7dKOtV4fbF4KiOlPNFclc66gHp6ZTjrTKdPCThVJJTJDgY69O1KoXQAowh-datfXqpYji0NeVpHGZjQQ9UIg" },
    { name: "Glow Hydration Face Mask", price: "$40.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzLEAUcO2O9lgSNRfWuwn3iTrzc2AETR_u72m8reajnJHqOfb8jtqEXot_LI4onz5U7mYilkB1eAeGbvekCVMyvU6bwH2FWyFl0YBIOoR_8gWHTuhM1TQgeMU-C8ASAwZ8BBBrmXrMZHZdWAuuUq-5fF5cBEfGPF5f7YzpXzehVc3m5Yb9xP7-bK0M3AzHkvwgdNhgKKXiN5ob3lPmzRDUkIYiLDJSdthI8CMM8whSqIumr3mvYVHeIcK4V_QQSlVAqH8eFkTGYWQ" },
    { name: "Sugar Kiss Lip Scrub", price: "$18.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByY4UWFbo67-ZYxSqQdVTFutE4gp1h1JPd3b5O1k71rdcJ_z95yQirgOvO-OYqwPq7aLqJ_GInwGgoSg8gWsLCCBHeqtWY3AQY-U1w1kV9QpBPq8-YlpO3VI5XaOxmaCV6w_bnYQJP6w3VQlIZMvdHp_wBJ_5ojvqHcaaJke-eU6Bn5XIJ68uBkDj04Zm54ocdj48VO4RGaICO4gA5pxRGd6A8SjZ_5kDlKmRf58cMBpQpoji6BgErQodzjbnEjH391PB0yf9UMG8" },
    { name: "Plush Beauty Headband", price: "$15.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq1p7bQY7iihF753CHbcNtFf26vESdRcFICULbtYX_vRy3g5y9qnFZSy5fCvh3Z70PQth_kYlCQt3FwZYZOUZSs506GCmuhNwpggT_rOY4opRvs4-uCkTzvcKw_KPS1kJtok7vahwk0l9urW7QENVFr-OAddONPE4XAaHfsPclY7ZyTk6AjypxmKdKRm9uManlbEAq0kzVHkvQlcCx4F_-9vWFAfmEz6M2VCY26sDpGcFphgXVgGOjZXpIfgOxkCun2NO2U6LjD68" },
    { name: "Diamond Shine Gloss", price: "$28.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJxF7ArW7cz8BJkNhJpMf6Zhg48Gq23-oUMjn5YCMunP9UlBdLr_GIc5LuR3BSRuCl-mFjlgcV7zdY_ToOGlWi0TfSxXhMUQXlDhXwzXfI96h8RKDUrd_BdxCACb3h0Cho6vRdVt1GuRhd0McDFRrk8ynIY6Lse8D5uvMTZ1jlMz9ttpBcXHDmU1w8QtavojGnHH4z0KMG941Nkr1tcbmsTAGdaWWqNMeBVWGM1P6jrKWZUSRY3UthiMVsyJ7jks3tYMQvifHrz-I" },
    { name: "Nude Attitude Lip Liner", price: "$22.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMO72ZznnFJse2TrsAfr265Wedb_JovSJVE63eM46PfvB8isVpZF_gboS5T7Q2BDxiSXkz16DQuuoZQ_YCBsRAI_Exbt2NqXFqeXLhIaQ8t9RJrNGWxbZs5CXV_hKehEFIp5Vk0rALSDpTkfq5xdS1rZsIXLSZSMIFgJ1X8Wy58ZEjXW52uZt_J85JpiUihvw_LJ7bxde6ksCTkpgrosXHyB1iZOHiNw8oMLDv2eGABgsDN12DI7rjdKrZoMvg8SqPoPlUuEyTDk4" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black font-serif mb-8 text-text-light">The Collection</h1>
      
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {categories.map((cat, i) => (
          <button key={i} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-primary/10 text-text-light hover:bg-primary/20'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item, idx) => (
          <div key={idx} className="group flex flex-col gap-4" onClick={() => navigate('product')}>
            <div className="relative w-full aspect-[3/4] bg-subtle-light rounded-xl overflow-hidden cursor-pointer">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
              <button className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white">
                <span className="material-symbols-outlined text-lg">favorite</span>
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-text-light cursor-pointer hover:text-primary">{item.name}</h3>
              <p className="text-sm text-text-muted-light mt-1">{item.price}</p>
              <button className="mt-3 w-full max-w-[160px] h-10 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300 mx-auto block">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary"><span className="material-symbols-outlined">chevron_left</span></button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">1</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10">2</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10">3</button>
        <span className="w-10 h-10 flex items-center justify-center">...</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary"><span className="material-symbols-outlined">chevron_right</span></button>
      </div>
    </div>
  );
};

const ProductPage = ({ navigate }: { navigate: (p: Page) => void }) => (
  <div className="w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
    <div className="flex items-center gap-2 text-sm text-text-muted-light mb-8">
      <span className="hover:text-primary cursor-pointer" onClick={() => navigate('home')}>Home</span>
      <span>/</span>
      <span className="hover:text-primary cursor-pointer" onClick={() => navigate('shop')}>Lip Gloss</span>
      <span>/</span>
      <span className="text-text-light font-medium">Luxe Shine</span>
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
        <h1 className="text-4xl font-serif font-bold text-text-light mb-2">Luxe Shine Lip Gloss</h1>
        <p className="text-lg text-text-muted-light mb-4">A high-shine, nourishing gloss for luscious lips.</p>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-primary">
            {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined filled text-lg">star</span>)}
            <span className="material-symbols-outlined text-lg">star</span>
          </div>
          <span className="text-sm text-text-muted-light">(121 reviews)</span>
        </div>

        <p className="text-3xl font-bold text-text-light mb-8">$28.00</p>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center border border-border-color rounded-lg">
            <button className="px-4 py-3 text-text-muted-light hover:bg-subtle-light transition-colors">-</button>
            <span className="w-12 text-center font-medium">1</span>
            <button className="px-4 py-3 text-text-muted-light hover:bg-subtle-light transition-colors">+</button>
          </div>
          <button onClick={() => navigate('cart')} className="flex-1 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md">
            Add to Cart
          </button>
          <button className="h-12 w-12 flex items-center justify-center border border-border-color rounded-lg hover:bg-subtle-light transition-colors text-text-muted-light">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>

        <div className="border-t border-border-color pt-8">
          <div className="flex gap-8 border-b border-border-color mb-6">
            <button className="pb-3 border-b-2 border-primary font-bold text-text-light">Description</button>
            <button className="pb-3 border-b-2 border-transparent font-medium text-text-muted-light hover:text-primary">Ingredients</button>
            <button className="pb-3 border-b-2 border-transparent font-medium text-text-muted-light hover:text-primary">Reviews</button>
          </div>
          <p className="text-text-light/80 leading-relaxed">
            Experience the ultimate in lip luxury with our Luxe Shine Lip Gloss. This formula provides a brilliant, long-lasting shine without the stickiness. Enriched with nourishing Vitamin E and Jojoba Oil, it hydrates and conditions your lips, leaving them feeling soft, supple, and irresistibly smooth.
          </p>
        </div>
      </div>
    </div>
  </div>
);

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

const CartPage = ({ navigate }: { navigate: (p: Page) => void }) => (
  <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-black text-text-light mb-10">Shopping Cart</h1>
    
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 flex flex-col gap-6">
        {[
          { name: "Luxe Lip Oil", sub: "Rose Petal", price: "$28.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4iOxgLp-QQYmLjyhnKmL_3eBL-xvVqxSnzuo3tQ0nRWgSe40G39k_r613bcMcc_dbKBJo-Bok7Wzqd33ydVv4VOUn9DLIwOFd5MFLNN3ACal4d9D1L_NzNpf3AWmHcs6vptkMM4c31RT8sN6jaxHgoLNtW28VPcmCDkd3vG6yqqaSuo7R_S9GlPvZ40UfI3JhS9ZK2yeQAYqR9N2uD4RBdJ1FdzO7YYd4rFtFvGXgFUDT5OpBao3aTCuFctPRfHOuxvHv0iI7ipw" },
          { name: "Radiant Glow Serum", sub: "30ml", price: "$45.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjf8yMin0oBERQYkw22cYqxQmwsyaomQF243aN9d7Gx9IXRrT4ul3VglzDJR7PBhQlopGQDAqhpXJZc6akyJ0qqFEBEdfKQ-AUAEQsU8WbG0KuAmM47aqhK-aKaLzR4KwuwJthztAbcYl4iSjrSSpoakBg9wETP7tPH-igI50bxFOl-80ErxJ_y3FbJK5LoI655AMeaCRpeYKYcolwQAA8WBCiMqi8A5IkbtFV7G-x1eg3Uyiz0QlvISDKuL0ny-ADil95fDE_6S0" }
        ].map((item, i) => (
          <div key={i} className="flex gap-6 py-6 border-b border-subtle-light items-center">
            <div className="w-24 h-24 bg-subtle-light rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}></div>
            <div className="flex-1">
              <h3 className="font-medium text-lg text-text-light">{item.name}</h3>
              <p className="text-text-muted-light">{item.sub}</p>
              <p className="text-text-muted-light mt-1">{item.price}</p>
            </div>
            <div className="flex items-center border border-border-color rounded-lg h-10">
              <button className="px-3 text-text-muted-light hover:text-primary">-</button>
              <span className="w-8 text-center text-sm">1</span>
              <button className="px-3 text-text-muted-light hover:text-primary">+</button>
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
              <span className="text-text-light font-medium">$73.00</span>
            </div>
            <div className="flex justify-between text-text-muted-light">
              <span>Shipping</span>
              <span className="text-text-light font-medium">Calculated at next step</span>
            </div>
          </div>
          <div className="border-t border-subtle-light pt-4 mb-8">
            <div className="flex justify-between text-lg font-bold text-text-light">
              <span>Total</span>
              <span>$73.00</span>
            </div>
          </div>
          <button onClick={() => navigate('checkout')} className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
);

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
        Place Order - $78.83
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

const WishlistPage = () => (
  <div className="w-full max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-black text-text-light mb-8">My Wishlist</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { name: "Luminous Silk Lip Oil", price: "$32.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCrwPUgoNCVykY3MExpAemdrgw2vZEH1eiQeVW4o2JbDuVWsY7sKdtJVgehK-7obruw0yRMJSP5_wpQUgGaVWnGVx5FyOYd-059sNgAH_1l6-uUSUzAQ5jybtmcIg5vNeoS5ntHtPP7eX9WGxOlv1eZQlLdzRK74wq1CI_f9Jw73lAsNqR6RI7ZFy5OjhKTmDDSE_ab6xxGJRRnFziHVF-ustGl7Lgrnt8T8Y76G6j67KEw0-CPXyA8-0fAsywhzD3HOOKsVbymB4" },
        { name: "Velvet Matte Lipstick", price: "$38.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOWB0SKxQDA-c1EfmiCMV2mvEftMCZZTtvr7Rw967QuDbxHRvun0lzUn4syZOZEm0x5WsuXtpdEbX0zMgk3nTdMelPJBg5-_T7_QmQ7TkwLoKzuPMQMe_jKi5LfG_-8eR1hP7W8CND5YnKvtkrTs7vUdKQ_7T8mJXisk4J39LmpA1Ot1umzbFm7twSBg_PWHKL_z8jrDve21B-E3Lob_lOUyXUvL9XWq1OP4ZT-0tAv1DfKoi55aND6mKBGc5-nUzz37r_nPdC9mA" },
        { name: "Glass Skin Highlighter", price: "$45.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrCjMcTu__vYjbZ4JkLStI3gagubAvUjUhen_NJyJpq9h07Sf5qmelCvnGF3JfyruZ1oxRnxsbn0kuXNmr71sbwakCytgop4LmEIu65wLGF87RBORFc9VyCd7RHvWc40X9b_1GbOQ66eaH-UjMt4Dgv98-6Ir6IiEE85GLWyQrfTmCKIzMR48N-zQYW2dYEGeVKiTpKDwcG5fMt7m6Bbl-3ZeIi8NTeR2RG7NGH5vTy_hF8bcSe3Da8C-JDsmdphbjvIvntjbLyiE" },
        { name: "Radiant Finish Foundation", price: "$55.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbdSRpa8xi9hlheSldgamkKRG21aEX5swE0RjDIxpO1PNCAH09LV91wDrMWTfhcIojb8IUuGrjmrCqvR2d0DEI5egj5b001TqinZeVvpZ9s0w8kB012LJg1v1-_noFtEcPk157OQHW6VADUCdj79HX-68yFnGp9aIowBagSj1WBhrJ0GrVeuZPsyd3rvJ0xOOtII586hNFmHP8tdQOmpNJl4TIyVHsVP9x87RVd50SjGwRW__daL-Z80sp7vWJLUEdawejaThGu3A" }
      ].map((item, i) => (
        <div key={i} className="flex flex-col gap-3 relative group">
          <div className="w-full aspect-[3/4] rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}>
            <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="text-center">
            <p className="font-medium text-text-light">{item.name}</p>
            <p className="text-sm text-text-light mt-1">{item.price}</p>
            <button className="mt-3 w-full h-10 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-12">
      <button className="h-12 px-8 border border-border-color rounded-lg font-bold text-text-light hover:bg-subtle-light transition-colors">
        Add All to Cart
      </button>
    </div>
  </div>
);

// --- New Pages ---

const ShippingPage = () => (
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
      <p>Standard shipping is free for orders over $50. For orders under $50, a flat rate of $5.99 applies.</p>
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

const FAQPage = () => (
  <div className="w-full max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-text-light mb-8">Frequently Asked Questions</h1>
    <div className="space-y-6">
      {[
        { q: "Are your products cruelty-free?", a: "Yes, absolutely! We are proud to be 100% cruelty-free and vegan." },
        { q: "How can I track my order?", a: "Once your order ships, you will receive an email with a tracking number to monitor your shipment." },
        { q: "Do you offer samples?", a: "We occasionally include free samples with orders over $50. Check our promotions page for current offers." },
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
        </div>
      ))}
    </div>
  </div>
);

const AuthPage = ({ setUser, navigate }: { setUser: (u: User) => void, navigate: (p: Page) => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({ name: 'Jane Doe', email: 'jane@example.com' });
    navigate('profile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-subtle-light">
        <h1 className="text-3xl font-bold text-center mb-8">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        
        <div className="flex mb-8 border-b border-subtle-light">
          <button 
            className={`flex-1 pb-3 font-medium ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-muted-light'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 pb-3 font-medium ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-muted-light'}`}
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
          <p className="text-center text-sm text-text-muted-light mt-4 cursor-pointer hover:text-primary">Forgot Password?</p>
        )}
      </div>
    </div>
  );
};

const ProfilePage = ({ user, logout }: { user: User, logout: () => void }) => (
  <div className="w-full max-w-5xl mx-auto px-4 py-12">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <div className="bg-white p-6 rounded-xl border border-subtle-light text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">person</span>
          </div>
          <h2 className="text-xl font-bold text-text-light">{user.name}</h2>
          <p className="text-text-muted-light text-sm mb-6">{user.email}</p>
          <button onClick={logout} className="w-full h-10 border border-border-color rounded-lg text-sm font-medium hover:bg-subtle-light transition-colors">
            Log Out
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-2/3 space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <div className="bg-white rounded-xl border border-subtle-light overflow-hidden">
            {[
              { id: "#10234", date: "Oct 12, 2023", total: "$73.00", status: "Delivered" },
              { id: "#10201", date: "Sep 05, 2023", total: "$45.00", status: "Delivered" }
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center p-6 border-b border-subtle-light last:border-0">
                <div>
                  <p className="font-bold text-text-light">{order.id}</p>
                  <p className="text-sm text-text-muted-light">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-light">{order.total}</p>
                  <p className="text-sm text-green-600 font-medium">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Account Details</h3>
          <div className="bg-white p-6 rounded-xl border border-subtle-light">
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

const App = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [cartCount, setCartCount] = useState(2);
  const [user, setUser] = useState<User | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage navigate={setActivePage} />;
      case 'shop': return <ShopPage navigate={setActivePage} />;
      case 'product': return <ProductPage navigate={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'cart': return <CartPage navigate={setActivePage} />;
      case 'checkout': return <CheckoutPage />;
      case 'wishlist': return <WishlistPage />;
      
      // New Pages
      case 'shipping': return <ShippingPage />;
      case 'returns': return <ReturnsPage />;
      case 'faq': return <FAQPage />;
      case 'privacy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsOfServicePage />;
      case 'journal': return <JournalPage />;
      case 'auth': return <AuthPage setUser={setUser} navigate={setActivePage} />;
      case 'profile': return user ? <ProfilePage user={user} logout={() => { setUser(null); setActivePage('home'); }} /> : <AuthPage setUser={setUser} navigate={setActivePage} />;
      
      default: return <HomePage navigate={setActivePage} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-display text-text-light bg-background-light">
      <Header activePage={activePage} navigate={setActivePage} cartCount={cartCount} user={user} />
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      <Footer navigate={setActivePage} />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
