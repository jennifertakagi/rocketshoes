import { render, fireEvent } from '@testing-library/react';

import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';

const mockedRemoveProduct = jest.fn();
const mockedUpdateProductAmount = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

describe('Cart Page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 1,
          id: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 1099.99,
          title: 'TÊNIS ULTRABOOST OG',
        },
        {
          amount: 2,
          id: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 139.9,
          title: 'TÊNIS SUPERSLEEK 72',
        },
      ],
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount,
    });
  });

  it('should be able to increase/decrease a product amount', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [incrementFirstProduct] = getAllByTestId('increment-product');
    const [, decrementSecondProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount, secondProductAmount] = getAllByTestId(
      'product-amount'
    );

    expect(firstProductAmount).toHaveDisplayValue('1');
    expect(secondProductAmount).toHaveDisplayValue('2');

    fireEvent.click(incrementFirstProduct);
    fireEvent.click(decrementSecondProduct);

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 2,
      productId: 1,
    });
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 1,
      productId: 2,
    });

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 2,
          id: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 1099.99,
          title: 'TÊNIS ULTRABOOST OG',
        },
        {
          amount: 1,
          id: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 799.99,
          title: 'TÊNIS SUPERSLEEK 72',
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProductAmount).toHaveDisplayValue('2');
    expect(secondProductAmount).toHaveDisplayValue('1');
  });

  it('should not be able to decrease a product amount when value is 1', () => {
    const { getAllByTestId } = render(<Cart />);

    const [decrementFirstProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty('disabled');
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled();
  });

  it('should be able to remove a product', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    const [removeFirstProduct] = getAllByTestId('remove-product');
    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          id: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 799.99,
          title: 'TÊNIS SUPERSLEEK 72',
        },
      ],
    });

    rerender(<Cart />);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
