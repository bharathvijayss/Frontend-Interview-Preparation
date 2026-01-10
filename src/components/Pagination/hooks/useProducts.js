import { useEffect, useState } from "react";

const useProducts = () => {

    const [productList, setProductList] = useState([]);

    const getProductList = async (signal) => {
        try {
            const productsResp = await fetch(
                "https://dummyjson.com/products?limit=0",
                { signal }
            );
            if (!productsResp.ok) {
                throw new Error(`Request failed: ${productsResp.status}`);
            }

            const productsRespJson = await productsResp.json();
            setProductList(productsRespJson?.products ?? []);
        } catch (e) {
            if (e?.name === "AbortError") return;
            console.error(e);
            setProductList([]);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        getProductList(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, []);

    return productList;
}

export default useProducts;