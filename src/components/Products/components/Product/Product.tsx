import './Product.css';
import { Button, Divider, Space, Modal, Tooltip } from 'antd';
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
  cartItems: IProduct[];
  handleOpenCart: () => void;
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
        <div className="action-buttons-wrapper">
          <Space.Compact block size="large">
            {props.cartItems.find(cartItem => cartItem.id === props.item.id) ? (
              <Tooltip title={'Товар уже в корзине'}>
                <Button
                  block
                  type="primary"
                  ghost
                  onClick={props.handleOpenCart}
                >
                  В корзине
                </Button>
              </Tooltip>
            ) : (
              <Button
                block
                type="primary"
                onClick={() => props.handleAddItemToCart(props.item)}
              >
                В корзину
              </Button>
            )}
            <Button block type="primary" ghost onClick={handleMoreClick}>
              Подробнее
            </Button>
          </Space.Compact>
        </div>
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
