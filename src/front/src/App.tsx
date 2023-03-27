import React, { useEffect, useState } from 'react';
import logo from 'assets/logo.svg';
import Cart from 'components/Cart';
import NavBar from 'components/NavBar';
import Products from 'components/Products';
import cookiesNames from 'constants/cookiesNames';
import cookies from 'utils/cookies';
import { IProduct } from 'api/baseApi/models/product';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import SocialNetworks from 'components/social_networks/SocialNetworks';
import vkIcon from 'assets/vk.svg';
import telegramIcon from 'assets/telegram.svg';
import whatsappIcon from 'assets/whatsapp.svg';
import 'App.scss';

const aboutText =
  'Ведение бухучета для юридических лиц. Вам откроются все возможности бухгалетрского учета. Эльба сформирует отчёты за вас и ваших сотрудников в налоговую, ПФР, ФСС и Росстат. А ещё выпустит электронную подпись, чтобы отправлять отчёты прямо из сервиса. Сдавайте отчёты, считайте налоги, создавайте счета, акты и накладные. Проведем начинающих ИП через налоговые лабиринты, научим работать с сотрудниками и поможем разобраться с онлайн-кассой.';

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
          <div className="title">О нас</div>
          <div className="content">{aboutText}</div>
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
        <div className="footer-body">
          <div className="contacts" id="contacts">
            <span className="footer-title">Контакты:</span>
            <div className="contact">
              +7 (843)-312-42-12 - Отдел продвижения
            </div>
            <div className="contact">+7 (843)-330-24-05 - Центр поддержки</div>
            <div className="contact">+7 (843)-312-32-12 - Отдел продаж</div>
            <div className="contact">+7 (843)-231-32-23 - Администрация</div>
          </div>
          <div className="yandex-map-wrapper">
            <div className="footer-title">Мы на карте:</div>
            <YMaps query={{ mode: 'debug' }}>
              <Map
                className="yandex-map"
                options={{
                  autoFitToViewport: 'always',
                  yandexMapDisablePoiInteractivity: true,
                }}
                defaultState={{ center: [55.779474, 49.128126], zoom: 15 }}
              >
                <Placemark
                  geometry={[55.779474, 49.128126]}
                  properties={{
                    iconCaption: 'Мы ждем вас здесь!',
                  }}
                />
              </Map>
            </YMaps>
          </div>
          <div className="social-networks-wrapper">
            <span className="footer-title">Мы в соцсетях:</span>
            <SocialNetworks
              items={[
                { icon: vkIcon, src: 'https://vk.com' },
                { icon: telegramIcon, src: 'https://telegram.org' },
                { icon: whatsappIcon, src: 'https://whatsapp.com' },
              ]}
            />
          </div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot;Фрукты жи есть&quot;.
        </div>
      </div>
    </>
  );
};

export default App;
