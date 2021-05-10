import { MdAddShoppingCart } from 'react-icons/md';

import { Product } from '../../types/types';
import { useCart } from '../../hooks/useCart';

import { Card } from './styles';

interface CartItemsAmount {
  [key: number]: number;
}

const ProductCard = ({
  id,
  title,
  price,
  image
}: Omit<Product, 'amount'>): JSX.Element => {
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = sumAmount[product.id]
      ? sumAmount[product.id]++ : sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {} as CartItemsAmount);

  return (
    <Card>
      <img src={image} alt={title} />
      <strong>{title}</strong>
      <span>{price}</span>
      <button
        type="button"
        data-testid="add-product-button"
        onClick={() => addProduct(id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {cartItemsAmount[id] || 0}
        </div>

        <span>ADD TO CART</span>
      </button>
    </Card>
  );
};

export default ProductCard;
