"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AppData from "@data/app.json";
import ProductsData from "@data/products.json";
import PageBanner from "@components/PageBanner";
import ReviewItem from "@components/reviews/ReviewItem";
import ProductImage from "@components/products/ProductImage";
import ProductButtons from "@components/products/ProductButtons";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";
import { useSearchParams } from "next/navigation";
import { getProductById } from "@/src/service/productService";
import parse from "html-react-parser";

const ProductsSlider = dynamic(() => import("@components/sliders/Products"), {
  ssr: false,
});
const ProductTabs = dynamic(() => import("@components/products/ProductTabs"), {
  ssr: false,
});

const Products = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    document.title = "Product | Taste Budz Restaurant";
  }, []);

  useEffect(() => {
    if (id) {
      console.log("Product ID:", id);
      setProductId(id);
      getProductDetails(id);
    }
  }, [id]);

  const getProductDetails = (productId) => {
    setProductDetails([]);
    // popUploader(dispatch, true);
    getProductById(productId)
      .then((res) => {
        setProductDetails(res?.data);
        // setCurrentPage(res?.data?.currentPage);
        // setTotalRecodes(res?.data?.totalCount);
        // popUploader(dispatch, false);
      })
      .catch((c) => {
        // popUploader(dispatch, false);
        handleError(c);
      });
  };

  async function CategoryDescription() {
    return (
      <>
        <div className="sb-text">
          {productDetails?.category?.description
            ? parse(productDetails?.category?.description)
            : ""}
        </div>
      </>
    );
  }

  async function ProductReviews() {
    const ReviewsData = [
      {
        title: "Very tasty",
        name: "Emma Newman",
        rating: 5,
        image: "/img/faces/1.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis fugiat totam nobis quas unde excepturi inventore possimus laudantium provident, rem eligendi velit. Aut molestias, ipsa itaque laborum, natus tempora, ut soluta animi ducimus dignissimos deserunt doloribus in reprehenderit rem accusamus! Quibusdam labore, aliquam dolor harum!",
      },
      {
        title: "I have lunch here every day",
        name: "Paul Trueman",
        rating: 5,
        image: "/img/faces/2.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis fugiat totam nobis quas unde excepturi inventore possimus laudantium provident, rem eligendi velit. Aut molestias, ipsa itaque laborum, natus tempora, ut soluta animi ducimus dignissimos deserunt doloribus in reprehenderit rem accusamus! Quibusdam labore, aliquam dolor harum!",
      },
    ];

    return (
      <div className="row">
        {ReviewsData.map((item, key) => (
          <div className="col-lg-6" key={`product-reviews-item-${key}`}>
            <ReviewItem item={item} key={key} marginBottom={60} />
          </div>
        ))}
      </div>
    );
  }

  const tabs = [
    {
      slug: "reviews",
      name: "Reviews",
    },
    {
      slug: "details",
      name: "Category details",
    },
  ];

  return (
    <>
      <PageBanner
        pageTitle={productDetails?.name}
        breadTitle={productDetails?.name}
        type={1}
      />

      {/* product */}
      <section className="sb-p-90-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {productDetails?.productFile &&
                productDetails?.productFile.length > 0 &&
                productDetails?.productFile.map((image) => {
                  if (image?.isDefault) {
                    return (
                      <ProductImage
                        src={image?.file?.originalPath}
                        alt={productDetails?.name}
                      />
                    );
                  } else {
                    return (
                      <img
                        className="mb-5"
                        style={{ height: 150, width: 150 }}
                        src={image?.file?.originalPath}
                        alt={productDetails?.name}
                      />
                    );
                  }
                })}
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <div className="sb-price-frame sb-mb-30">
                  <h3>Category : {productDetails?.category?.name}</h3>
                  <div className="sb-price">
                    <sub>LKR </sub> {" " + productDetails?.price}
                  </div>
                </div>
                <h4 className="sb-mb-15">Available for purchase</h4>
                <p>
                  {" "}
                  {productDetails?.description
                    ? parse(productDetails?.description)
                    : ""}
                </p>
                <ul className="sb-stars sb-mb-25">
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <span>(5 ratings)</span>
                  </li>
                </ul>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">01</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">
                          Add to the cart and place an order
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">02</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">Enter your order details</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sb-features-item sb-features-item-sm sb-mb-30">
                      <div className="sb-number">03</div>
                      <div className="sb-feature-text">
                        <h4 className="sb-mb-15">
                          Enjoy your favorite food at home!
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <ProductButtons productObject={productDetails} />
              </div>
            </div>
          </div>

          <ProductTabs items={tabs} active={"reviews"} />

          <div className="sb-masonry-grid sb-tabs">
            <div className="sb-grid-sizer" />

            {tabs.map((tab, key) => (
              <div
                className={`sb-grid-item sb-${tab.slug}-tab`}
                key={`product-tab-${key}`}
              >
                <div className="sb-tab">
                  {tab.slug == "details" && <CategoryDescription />}
                  {tab.slug == "reviews" && <ProductReviews />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* product end */}

      <ProductsSlider
        items={ProductsData.items}
        title={"It is usually bought together with this product"}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        button={0}
        slidesPerView={4}
        itemType={"product"}
      />

      <CallToActionTwoSection />
    </>
  );
};
export default Products;
