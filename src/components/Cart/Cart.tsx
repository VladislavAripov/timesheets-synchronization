import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Space, Tabs } from 'antd';
import { useState } from 'react';
import { randomNumberInRange } from '../../utils/randomNumber';
import { IProduct } from '../Products/components/Product';
import CartItemsTab from './components/CartItemsTab';
import OrdersTab from './components/OrdersTab';

interface IProps {
  cartItems: IProduct[];
  handleRemoveItemFromCart: (item: IProduct) => void;
  handleClearCart: () => void;
}

export interface IOrder {
  id?: number;
  products: IProduct[];
  totalPrice: number;
  date: string;
}

const Cart: React.FC<IProps> = (props: IProps) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleAddOrder = (order: IOrder) => {
    order.id = randomNumberInRange(1, 1000000);
    setOrders([...orders, order]);
    props.handleClearCart();
  };

  const handleRemoveOrder = (orderToDelete: IOrder) => {
    setOrders(orders.filter((order) => order.id !== orderToDelete.id));
  };

  return (
    <>
      <Space size={'large'}>
        <Badge count={props.cartItems.length}>
          <Button
            size="large"
            type="text"
            shape="circle"
            style={{ color: 'white' }}
            icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
            onClick={handleOpenCart}
          />
        </Badge>
      </Space>
      <Modal
        open={isCartModalOpen}
        footer={null}
        onCancel={handleCloseCart}
        style={{ top: '11vh', right: '10px' }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={[
            {
              label: 'Корзина',
              key: '1',
              children: (
                <CartItemsTab
                  cartItems={props.cartItems}
                  handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                  handleAddOrder={handleAddOrder}
                />
              ),
            },
            {
              label: 'Заказы',
              key: '2',
              children: (
                <OrdersTab
                  orders={orders}
                  handleRemoveItemFromOrders={handleRemoveOrder}
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default Cart;
