import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";

import PageBanner from "@components/PageBanner";
import PromoSection from "@components/sections/Promo";
import TeamSection from "@components/sections/Team";
import CategoriesSection from "@components/sections/Categories";
import CallToActionThreeSection from "../../_components/sections/CallToActionThree";

const ProductsSlider = dynamic(() => import("@components/sliders/Products"), {
  ssr: false,
});

export const metadata = {
  title: {
    default: "Shop",
  },
  description: AppData.settings.siteDescription,
};

const Shop = () => {
  return (
    <>
      <PageBanner
        pageTitle={"Taste the dishes of the restaurant without leaving home."}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        breadTitle={"Shop"}
        type={2}
      />
      <CategoriesSection heading={0} paddingTop={90} type={2} columns={4} />
      <ProductsSlider
        // items={Products.collection["popular"]}
        title={"Most <span>popular</span> dishes"}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        button={{
          link: "/menu",
          label: "View all",
          icon: "/img/ui/icons/arrow.svg",
        }}
        slidesPerView={4}
        itemType={"product"}
      />
      <CallToActionThreeSection />
      <ProductsSlider
        // items={Products.collection["bestseller"]}
        title={"Our <span>Bestsellers</span>"}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        button={{
          link: "/menu",
          label: "View all",
          icon: "/img/ui/icons/arrow.svg",
        }}
        slidesPerView={4}
        itemType={"product"}
      />
      <TeamSection />
      <PromoSection />
    </>
  );
};
export default Shop;
