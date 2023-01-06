import Product, { IProduct } from './components/Product';
import './Products.css';
import analys from '../../assets/analys.png';
import calculateZP from '../../assets/calculateZP.jpg';
import calculateNalogVichet from '../../assets/calculateNalogVichet.jpeg';
import calculateNalogBase from '../../assets/calculateNalogBase.jpg';
import timeTracking from '../../assets/timeTracking.jpg';

const Products: React.FC = () => {
  const products: IProduct[] = [
    {
      image: timeTracking,
      title: 'Учет рабочего времени',
      price: 0,
      description: 'Описание',
    },
    {
      image: calculateZP,
      title: 'Расчет заработной платы',
      price: 0,
      description: 'Описание',
    },
    {
      image: calculateNalogVichet,
      title: 'Расчет налогового вычета',
      price: 0,
      description: 'Описание',
    },
    {
      image: analys,
      title: 'Анализ налоговой базы',
      price: 0,
      description: 'Описание',
    },
    {
      image: calculateNalogBase,
      title: 'Расчет налоговой базы',
      price: 0,
      description: 'Описание',
    },
  ];

  return (
    <div className="products">
      {products.map((item) => (
        <Product key={item.title} item={item} />
      ))}
    </div>
  );
};

export default Products;
