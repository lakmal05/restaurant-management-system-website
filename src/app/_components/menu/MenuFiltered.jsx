"use client";

import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef, useState } from "react";
import MenuItem from "@components/menu/MenuItem";
import { productsFiltration } from "@/src/service/productService";

const MenuFiltered = ({ categories, noImage, columns }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    //setTimeout(() => {
    isotope.current = new Isotope(".sb-masonry-grid", {
      itemSelector: ".sb-grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".sb-grid-sizer",
      },
      transitionDuration: "0.5s",
    });
    //}, 500);
  }, []);

  useEffect(() => {
    if (isotope.current) {
      isotope.current.layout();
    }
  }, [productList]);

  useEffect(() => {
    handleProductFiltration(null);
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key, e) => {
    e.preventDefault();
    setFilterKey(key);
    const filterLinks = document.querySelectorAll(".sb-filter a");
    filterLinks.forEach((filter) => {
      const filterValue = filter.getAttribute("data-filter");
      if (filterValue == key) {
        filter.classList.add("sb-active");
      } else {
        filter.classList.remove("sb-active");
      }
    });
    handleProductFiltration(key);
  };

  const handleProductFiltration = (category) => {
    setProductList([]);
    // popUploader(dispatch, true);

    let data = {
      name: "",
      category: category === undefined ? "" : category === null ? "" : category,
      status: "",
      maxPrice: "",
      minPrice: "",
    };
    let temp = [];
    productsFiltration(data)
      .then((res) => {
        res.data?.records.map((product, index) => {
          if (product?.status === 1) {
            temp.push({
              id: product?.id,
              name: product?.name,
              status: product?.status,
              price: product?.price,
              files: product?.productFile,
              description: product?.description,
              category: product?.category,
            });
          }
        });
        setProductList(temp);
        // setCurrentPage(res?.data?.currentPage);
        // setTotalRecodes(res?.data?.totalCount);
        // popUploader(dispatch, false);
      })
      .catch((c) => {
        // popUploader(dispatch, false);
        handleError(c);
      });
  };

  var columnsClass = "";

  switch (columns) {
    case 3:
      columnsClass = "sb-item-33";
      break;
    case 2:
      columnsClass = "sb-item-50";
      break;
    default:
      columnsClass = "sb-item-25";
  }

  return (
    <>
      {/* filter */}
      <div className="sb-filter mb-30">
        <a
          href="#."
          data-filter="*"
          onClick={(e) => handleFilterKeyChange("*", e)}
          className="sb-filter-link sb-active"
        >
          All dishes
        </a>
        {categories.map((category) => (
          <a
            href="#."
            data-filter={`${category.slug}`}
            key={category.id}
            onClick={(e) => handleFilterKeyChange(category.slug, e)}
            className="sb-filter-link"
          >
            {category.name}
          </a>
        ))}
      </div>
      {/* filter end */}

      <div className="sb-masonry-grid sb-masonry-grid-auto-height">
        <div className="sb-grid-sizer"></div>

        <Fragment key={`menu-filtered-category`}>
          {productList.map((item) => (
            <div
              className={`sb-grid-item ${columnsClass} ${item.category.name}`}
              key={`menu-filtered-item-${item.category.id}-${item?.id}`}
            >
              <MenuItem
                item={item}
                index={item?.id}
                noImage={noImage}
                marginBottom={30}
              />
            </div>
          ))}
        </Fragment>
      </div>
    </>
  );
};
export default MenuFiltered;
