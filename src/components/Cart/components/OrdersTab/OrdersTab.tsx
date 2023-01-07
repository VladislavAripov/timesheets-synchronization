import { Button, List } from 'antd';
import { IOrder } from '../../Cart';

interface IProps {
  orders: IOrder[];
  handleRemoveItemFromOrders: (order: IOrder) => void;
}

const OrdersTab: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.orders}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button
              key={'remove-item-button'}
              type="default"
              danger
              onClick={() => props.handleRemoveItemFromOrders(item)}
            >
              Удалить
            </Button>,
          ]}
        >
          {`${item.date} - ${item.products.length}`}
        </List.Item>
      )}
    />
  );
};

export default OrdersTab;
