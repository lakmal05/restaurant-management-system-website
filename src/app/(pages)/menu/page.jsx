"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PageBanner from "@components/PageBanner";
import PromoSection from "@components/sections/Promo";
import { getAllCategories } from "@/src/service/categoriesService";
import { handleError } from "@/src/util/CommonFun";

const MenuFiltered = dynamic(() => import("@components/menu/MenuFiltered"), {
  ssr: false,
});


const Menu3 = () => {
  const [categoryList, setCategoryList] = useState([]);

  // let dispatch = useDispatch();

  useEffect(() => {
    document.title = "Menu | Taste Budz Restaurant ";
    loadAllCatagories();
  }, []);

  const loadAllCatagories = () => {
    let temp = [];
    // popUploader(dispatch, true);
    getAllCategories()
      .then(async (resp) => {
        console.log(resp);

        resp?.data?.records.map((category, index) => {
          if (category?.status === 1) {
            temp.push({
              id: category?.id,
              name: category?.name,
              slug: category?.name,
            });
          }
        });
        await setCategoryList(temp);
        // popUploader(dispatch, false);
      })
      .catch((err) => {
        // popUploader(dispatch, false);
        handleError(err);
      });
  };

  return (
    <>
      <PageBanner
        pageTitle={
          "Only <span>appetite</span> <br>Can be lacking in <span>cooking</span>"
        }
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        breadTitle={"Menu"}
        type={2}
      />

      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <MenuFiltered categories={categoryList} />
        </div>
      </section>
      {/* menu end */}

      <PromoSection />
    </>
  );
};
export default Menu3;
