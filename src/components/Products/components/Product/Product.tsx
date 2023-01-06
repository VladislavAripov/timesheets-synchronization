import './Product.css';
import { Button, Divider, Space, Modal } from 'antd';
import { useState } from 'react';

export interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface IProps {
  item: IProduct;
  handleAddItemToCart: (product: IProduct) => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = () => {
    console.log('handle more click');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    console.log('handle cancel');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product">
        <div className="product-image-wrapper">
          <img className="product-image" src={props.item.image} alt="" />
        </div>
        <div className="product-title">{props.item.title}</div>
        <Divider style={{ marginTop: '8px', marginBottom: '14px' }} />
        <div className="product-price">{props.item.price} ₽</div>
        <div className="product-description">
          Описание: {props.item.description}
        </div>
        <Space.Compact block size="large">
          <Button
            block
            type="primary"
            ghost
            onClick={() => props.handleAddItemToCart(props.item)}
          >
            Купить
          </Button>
          <Button block type="default" danger ghost onClick={handleMoreClick}>
            Подробнее
          </Button>
        </Space.Compact>
      </div>
      <Modal
        open={isModalOpen}
        title={props.item.title}
        onCancel={handleCancel}
        footer={null}
        centered
        width={'304px'}
      >
        <div className="product-image-wrapper">
          <img className="product-image" src={props.item.image} alt="" />
        </div>
        <div className="product-price">{props.item.price} ₽</div>
        <div className="product-description">
          Описание: {props.item.description}
        </div>
      </Modal>
    </>
  );
};

export default Product;
