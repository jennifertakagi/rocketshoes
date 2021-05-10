import { useState, useEffect } from 'react';

import { Product } from '../../types/types';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

import ProductCard from '../../components/ProductCard';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data = [] } = await api.get('/products');
      
      setProducts(data.map((item: Product) => ({
        ...item,
        price: formatPrice(item.price),
      })));
    }

    loadProducts();
  }, []);


  return (
    <ProductList>
      {products.map(product => (
        <ProductCard 
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </ProductList>
  );
};

export default Home;
