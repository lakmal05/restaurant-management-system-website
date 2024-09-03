"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import parse from "html-react-parser";
import { truncateDescription } from "@/src/util/CommonFun";

const MenuItem = ({ item, index, noImage, marginBottom }) => {
  const stars = ["", "", "", "", ""];

  return (
    <>
      <a
        data-fancybox="menu"
        data-no-swup
        href={`/product?id=${item.id}`}
        className={`sb-menu-item sb-mb-${marginBottom}`}
      >
        {noImage != 1 && (
          <div className="sb-cover-frame">
            {item?.files && item.files.length > 0 ? (
              item.files.map((img, index) => {
                if (img?.isDeafult) {
                  return (
                    <img
                      src={img?.originalPath}
                      alt={item.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://i.ibb.co/qpB9ZCZ/placeholder.png")
                      }
                    />
                  );
                }
              })
            ) : (
              <img
                src="https://i.ibb.co/qpB9ZCZ/placeholder.png"
                alt="placeholder"
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: item.badge }} />
          </div>
        )}
        <div className="sb-card-tp">
          <h4 className="sb-card-title">{item.name}</h4>
          <div className="sb-price">
            <sub className="mb-2">LKR</sub> {item.price}
          </div>
        </div>
        <div className="sb-description">
          <p className="sb-text sb-mb-15">
            {parse(truncateDescription(item.description, 20))}
          </p>
          <ul className="sb-stars">
            {stars.slice(0, 5).map((star_item, star_key) => (
              <li key={`products-item-${index}-rating-star-${star_key}`}>
                <i className="fas fa-star"></i>
              </li>
            ))}
            <li>
              <span>({5} ratings)</span>
            </li>
          </ul>
        </div>
      </a>
    </>
  );
};
export default MenuItem;
