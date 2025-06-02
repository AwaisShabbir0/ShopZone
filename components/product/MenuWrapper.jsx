import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList = [], productList = [] }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    if (
      Array.isArray(productList) &&
      productList.length > 0 &&
      Array.isArray(categoryList) &&
      categoryList.length > 0 &&
      categoryList[active] &&
      categoryList[active].title
    ) {
      setFilter(
        productList.filter(
          (product) =>
            product.category?.toLowerCase() ===
            categoryList[active].title.toLowerCase()
        )
      );
    } else {
      setFilter([]);
    }
  }, [categoryList, active, productList]);

  return (
    <div className="container mx-auto  mb-16">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-[40px]">Our Categories</Title>
        <div className="mt-10">
          {(!categoryList || categoryList.length === 0) && (
            <div>Loading categories...</div>
          )}
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                className={`px-6 py-2 ${
                  index === active && "bg-secondary text-white "
                } ml-4 rounded-3xl `}
                key={category._id}
                onClick={() => {
                  setActive(index);
                  setProductLimit(3);
                }}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">
        {filter.length > 0 ? (
          filter
            .slice(0, productLimit)
            .map((product) => <MenuItem key={product._id} product={product} />)
        ) : (
          <div>No products found.</div>
        )}
      </div>
      <div className="flex items-center justify-center my-8">
        <button
          className="btn-primary"
          onClick={() => setProductLimit(productLimit + 4)}
          disabled={filter.length <= productLimit}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
