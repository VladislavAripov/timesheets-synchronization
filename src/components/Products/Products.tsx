import Product, { IProduct } from './components/Product';
import './Products.css';
import analys from '../../assets/analys.png';
import calculateZP from '../../assets/calculateZP.jpg';
import calculateNalogVichet from '../../assets/calculateNalogVichet.jpeg';
import calculateNalogBase from '../../assets/calculateNalogBase.jpg';
import timeTracking from '../../assets/timeTracking.jpg';

interface IProps {
  handleAddItemToCart: (product: IProduct) => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const products: IProduct[] = [
    {
      id: 1,
      image: timeTracking,
      title: 'Учет рабочего времени',
      price: 0,
      description: 'Описание',
    },
    {
      id: 2,
      image: calculateZP,
      title: 'Расчет заработной платы',
      price: 0,
      description: 'Описание',
    },
    {
      id: 3,
      image: calculateNalogVichet,
      title: 'Расчет налогового вычета',
      price: 0,
      description: 'Описание',
    },
    {
      id: 4,
      image: analys,
      title: 'Анализ налоговой базы',
      price: 0,
      description: 'Описание',
    },
    {
      id: 5,
      image: calculateNalogBase,
      title: 'Расчет налоговой базы',
      price: 0,
      description: 'Описание',
    },
  ];

  return (
    <div className="products">
      {products.map((item) => (
        <Product
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
        />
      ))}
    </div>
  );
};

export default Products;
