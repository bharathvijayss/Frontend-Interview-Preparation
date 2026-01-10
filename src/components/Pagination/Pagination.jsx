import { useCallback, useMemo, useState } from "react";
import useProducts from "./hooks/useProducts";
import { PAGE_SIZE } from "./constant";
import {
  page_item,
  active,
  paginator_container,
  page_items_container,
  item_card,
} from "./Pagination.module.css";

const Paginator = ({ page, setPage, totalPages }) => {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index),
    [totalPages]
  );

  const selectPage = (index) => {
    if (index < 0 || index > totalPages - 1) return;
    setPage(index);
  };

  const selectPrevPage = () => {
    setPage((current) => Math.max(0, current - 1));
  };

  const selectNextPage = () => {
    setPage((current) => {
      if (totalPages <= 0) return 0;
      return Math.min(totalPages - 1, current + 1);
    });
  };

  return (
    <div className={paginator_container}>
      <button onClick={selectPrevPage} disabled={totalPages <= 0 || page === 0}>
        ⏮️
      </button>

      {pages.map((index) => (
        <span
          key={index}
          onClick={() => selectPage(index)}
          className={`${page_item} ${page === index ? active : ""}`}
        >
          {index + 1}
        </span>
      ))}

      <button
        onClick={selectNextPage}
        disabled={totalPages <= 0 || page >= totalPages - 1}
      >
        ⏭️
      </button>
    </div>
  );
};

const ItemCard = ({ item }) => {
  const { title, description, thumbnail } = item;
  return (
    <div className={item_card}>
      <img src={thumbnail} alt="product thumbnail" loading="lazy" />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

const PageItems = ({ data }) => {
  return (
    <div className={page_items_container}>
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const clampPage = (value, totalPages) => {
  if (totalPages <= 0) return 0;
  return Math.min(Math.max(0, value), totalPages - 1);
};

const Pagination = () => {
  const products = useProducts();
  const [page, setPage] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(products.length / PAGE_SIZE),
    [products.length]
  );

  const safePage = useMemo(
    () => clampPage(page, totalPages),
    [page, totalPages]
  );

  const setSafePage = useCallback(
    (valueOrUpdater) => {
      setPage((prev) => {
        const prevSafe = clampPage(prev, totalPages);
        const next =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(prevSafe)
            : valueOrUpdater;
        return clampPage(next, totalPages);
      });
    },
    [totalPages]
  );

  const pageItems = useMemo(() => {
    const start = safePage * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, safePage]);

  return (
    <div>
      <Paginator page={safePage} setPage={setSafePage} totalPages={totalPages} />
      <PageItems data={pageItems} />
    </div>
  );
};

export default Pagination;
