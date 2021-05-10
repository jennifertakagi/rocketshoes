import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

import ProductCartCard from '../../components/ProductCartCard';

const Cart = (): JSX.Element => {
  const { cart } = useCart();

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => (product.price * product.amount) + sumTotal, 0)
    )

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <ProductCartCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              amount={product.amount}
            />
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">CHECKOUT</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
