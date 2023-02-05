import React, { useEffect, useState } from 'react';
import 'App.css';
import logo from 'assets/logo.svg';
import Cart from 'components/Cart';
import NavBar from 'components/NavBar';
import Products from 'components/Products';
import cookiesNames from 'constants/cookiesNames';
import cookies from 'utils/cookies';
import { IProduct } from 'api/baseApi/models/product';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export type CartItem = IProduct & {
  count: number;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    setCartItems(cookies.get(cookiesNames.cart) ?? []);
  }, []);

  const handleAddItemToCart = (product: IProduct) => {
    if (cartItems.find(cartItem => cartItem.id === product.id)) return;

    const newCartItems = [...cartItems, { ...product, count: 1 }];

    setCartItems(newCartItems);

    handleCartItemsChange(newCartItems);
  };

  const handleCartItemCountChange = (cartItemId: number, newCount: number) => {
    if (newCount < 1 || newCount > 100) return;

    const newCartItems = cartItems.slice();
    const cartItem = newCartItems.find(cartItem => cartItem.id == cartItemId);

    if (!cartItem) return;

    cartItem.count = newCount;
    setCartItems(newCartItems);

    handleCartItemsChange(newCartItems);
  };

  const handleRemoveItemFromCart = (product: IProduct) => {
    const newCartItems = [
      ...cartItems.filter(cartItem => cartItem.id !== product.id),
    ];

    setCartItems(newCartItems);

    handleCartItemsChange(newCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    handleCartItemsChange([]);
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleCartItemsChange = (newCartItems: CartItem[]) => {
    cookies.set(cookiesNames.cart, newCartItems);
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="" />
        </div>
        <NavBar
          items={[
            {
              title: 'Мониторинг',
              link: '/#products-area',
            },
            {
              title: 'О нас',
              link: '/#about-area',
            },
            {
              title: 'Контакты',
              link: '/#contacts',
            },
          ]}
        />
        <div className="cart-wrapper">
          <Cart
            cartItems={cartItems}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            handleClearCart={handleClearCart}
            isCartModalOpen={isCartModalOpen}
            handleOpenCart={handleOpenCart}
            handleCloseCart={handleCloseCart}
            handleCartItemCountChange={handleCartItemCountChange}
          />
        </div>
      </div>
      <div className="body">
        <div className="about-area" id="about-area">
          <div className="title">Lorem ipsum</div>
          <div className="content">{loremIpsum}</div>
        </div>
        <div className="products-area" id="products-area">
          <div className="title">Наши услуги</div>
          <Products
            handleAddItemToCart={handleAddItemToCart}
            cartItems={cartItems}
            handleOpenCart={handleOpenCart}
          />
        </div>
      </div>
      <div className="footer">
        <div className="contacts" id="contacts">
          Контакты:
          <div className="contact">+7 939.. - Владислав</div>
          <div className="contact">+7 939.. - Владислав</div>
          <div className="contact">+7 939.. - Владислав</div>
          <div className="contact">+7 939.. - Владислав</div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot;Фрукты жи есть&quot;.
        </div>
      </div>
    </>
  );
};

export default App;
