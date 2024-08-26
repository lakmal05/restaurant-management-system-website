"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import { getAllGalleryImages } from "@/src/service/galleryService";

const GalleryMasonry = dynamic(
  () => import("@components/gallery/GalleryMasonry"),
  { ssr: false }
);

const Gallery1 = () => {
  const [galleryList, setGalleryList] = useState([]);

  //-------------------------- pagination --------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecodes, setTotalRecodes] = useState(0);

  // let dispatch = useDispatch();

  useEffect(() => {
    document.title = "Gallery | Taste Budz Restaurant";
    loadAllGallery(currentPage);
  }, []);

  const loadAllGallery = (currentPage) => {
    let temp = [];
    setGalleryList([]);
    // popUploader(dispatch, true);
    getAllGalleryImages(currentPage)
      .then((resp) => {
        resp?.data.map((gallery, index) => {
          temp.push({
            id: gallery?.id,
            src: gallery?.file?.originalPath,
          });
        });
        console.log(temp);

        setGalleryList(temp);
        // setCurrentPage(resp?.data?.currentPage);
        // setTotalRecodes(resp?.data?.totalCount);
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
        pageTitle={"It’s a pity that the photo <br>does not convey the taste!"}
        breadTitle={"Gallery"}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        type={2}
      />

      {/* gallery */}
      <div className="sb-p-90-60">
        <div className="container">
          <GalleryMasonry items={galleryList} layout={1} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active">
                <a href="#.">1</a>
              </li>
              <li>
                <a href="#.">2</a>
              </li>
              <li>
                <a href="#.">3</a>
              </li>
              <li>
                <a href="#.">4</a>
              </li>
              <li>
                <a href="#.">...</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* gallery end */}

      <CallToActionSection />
    </>
  );
};
export default Gallery1;
