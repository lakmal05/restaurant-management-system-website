"use client";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/src/service/categoriesService";
import Data from "@data/sections/servicers.json";
import Link from "next/link";
import { handleError } from "@/src/util/CommonFun";
import defaultCategoryImg from "@/public/img/categories/default-category-img.png";
import parse from "html-react-parser";
import { getAllServicers } from "@/src/service/serviceService";

const ServicersSection = ({
  heading = 1,
  paddingTop = 0,
  type = 1,
  columns,
}) => {
  const [serviceList, setServiceList] = useState([]);

  // let dispatch = useDispatch();

  useEffect(() => {
    loadAllServicers();
  }, []);

  var columnsClass = "";

  switch (columns) {
    case 4:
      columnsClass = "col-lg-3";
      break;
    case 3:
      columnsClass = "col-lg-4";
      break;
    default:
      columnsClass = "col-lg-6";
  }

  const loadAllServicers = () => {
    let temp = [];
    setServiceList([]);
    // popUploader(dispatch, true);
    getAllServicers()
      .then(async (resp) => {
        resp?.data?.map((service, index) => {
          temp.push({
            id: service?.id,
            image:
              service?.file && Object.keys(service?.file).length > 0
                ? service.file?.originalPath
                : null,
            name: service?.name,
            description:
              service?.description != null ? service?.description : "",
          });
        });
        await setServiceList(temp);
        // popUploader(dispatch, false);
      })
      .catch((err) => {
        // popUploader(dispatch, false);
        handleError(err);
      });
  };

  return (
    <>
      {/* categories */}
      <section className={`sb-p-${paddingTop}-60`}>
        <div className="container">
          {heading == 1 && (
            <div className="sb-group-title sb-mb-30">
              <div className="sb-left sb-mb-30">
                <h2
                  className="sb-mb-30"
                  dangerouslySetInnerHTML={{ __html: Data.title }}
                />
                <p
                  className="sb-text"
                  dangerouslySetInnerHTML={{ __html: Data.description }}
                />
              </div>

              <div className="sb-right sb-mb-30">
                {/* button */}
                <Link href={Data.button.link} className="sb-btn sb-m-0">
                  <span className="sb-icon">
                    <img src="/img/ui/icons/arrow.svg" alt="icon" />
                  </span>
                  <span>{Data.button.label}</span>
                </Link>
                {/* button end */}
              </div>
            </div>
          )}
          <div className="row">
            {serviceList.map((item, key) => (
              <div className={columnsClass} key={`categories-item-${item.id}`}>
                <a
                  href={"/menu"}
                  className={
                    type == 1
                      ? "sb-categorie-card sb-categorie-card-2 sb-mb-30"
                      : "sb-categorie-card sb-mb-30"
                  }
                >
                  <div className="sb-card-body">
                    <div className="sb-category-icon">
                      <img
                        src={item.image ? item.image : defaultCategoryImg?.src}
                        alt={item.name}
                      />
                    </div>
                    <div className="sb-card-descr">
                      <h3 className="sb-mb-10">{item.name}</h3>
                      <p className="sb-text">{parse(item.description)}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* categories end */}
    </>
  );
};

export default ServicersSection;
