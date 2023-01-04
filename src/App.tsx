import React from 'react';
import './App.css';
import logo from './assets/logo.svg';
import NavBar from './components/NavBar';
import Products from './components/Products';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App: React.FC = () => {
  return (
    <>
      <div className='header'>
        <div className='logo'>
          <img className='logo-img' src={logo} alt='' />
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
      </div>
      <div className='body'>
        <div className='about-area' id='about-area'>
          <div className="title">Lorem ipsum</div>
          <div className="content">
            {loremIpsum}
          </div>
        </div>
        <div className="products-area" id='products-area'>
          <div className="title">Наши услуги</div>
          <Products />
        </div>
      </div>
      <div className='footer'>
        <div className='contacts' id='contacts'>
          Контакты:
          <div className='contact'>+7 939.. - Владислав</div>
          <div className='contact'>+7 939.. - Владислав</div>
          <div className='contact'>+7 939.. - Владислав</div>
          <div className='contact'>+7 939.. - Владислав</div>
        </div>
        <div className='rights'>
          © Все права защищены. ООО "Фрукты жи есть".
        </div>
      </div>
    </>
  );
}

export default App;
