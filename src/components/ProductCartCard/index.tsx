import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { Product } from '../../types/types';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';

import { Card } from './styles';


const ProductCartCard = ({
  id,
  title,
  price,
  image,
  amount
}: Product): JSX.Element => {
  const { removeProduct, updateProductAmount } = useCart();

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  function handleIncrementProduct () {
    updateProductAmount({ productId: id, amount: amount += 1 });
  }

  function handleDecrementProduct () {
    updateProductAmount({ productId: id, amount: amount -= 1 });
  }

  return (
    <Card data-testid="product">
      <td>
        <img src={image} alt={title} />
      </td>
      <td>
        <strong>{title}</strong>
        <span>{formatPrice(price)}</span>
      </td>
      <td>
        <div>
          <button
            type="button"
            data-testid="decrement-product"
            disabled={amount <= 1}
            onClick={() =>  handleDecrementProduct()}
          >
            <MdRemoveCircleOutline size={20} />
          </button>
          <input
            type="text"
            data-testid="product-amount"
            readOnly
            value={amount}
          />
          <button
            type="button"
            data-testid="increment-product"
            onClick={() => handleIncrementProduct()}
          >
            <MdAddCircleOutline size={20} />
          </button>
        </div>
      </td>
      <td>
        <strong>{formatPrice(price * amount)}</strong>
      </td>
      <td>
        <button
          type="button"
          data-testid="remove-product"
          onClick={() => handleRemoveProduct(id)}
        >
          <MdDelete size={20} />
        </button>
      </td>
    </Card>
  );
};

export default ProductCartCard;
