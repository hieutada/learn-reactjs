import { useEffect, useState } from 'react';
import productsApi from '../../../api/productsApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productsApi.get(productId);
        setProduct(result)
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return {product, loading};
}
