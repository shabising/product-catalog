import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(res => {
      setData(res.products);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};