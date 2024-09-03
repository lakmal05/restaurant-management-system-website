"use client";
import { getAllOffers } from "@/src/service/offersService";
import { handleError } from "@/src/util/CommonFun";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const PromoSection = () => {
  const [offersList, setOffersList] = useState([]);

  useEffect(() => {
    loadAllOffers();
  }, []);

  const loadAllOffers = () => {
    setOffersList([]);
    // popUploader(dispatch, true);
    let temp = [];
    getAllOffers()
      .then((res) => {
        res.data?.map((offer, index) => {
          temp.push({
            id: offer?.id,
            title: offer?.title,
            startAt: offer?.startAt,
            price: offer?.value,
            files: offer?.file,
            description: offer?.description,
            endAt: offer?.endAt,
          });
        });
        setOffersList(temp);
        // setCurrentPage(res?.data?.currentPage);
        // setTotalRecodes(res?.data?.totalCount);
        // popUploader(dispatch, false);
      })
      .catch((c) => {
        // popUploader(dispatch, false);
        handleError(c);
        console.log(c);
      });
  };

  return (
    <>
      {/* promo */}
      <section className="sb-p-0-60">
        <div className="container">
          <div className="row">
            {offersList.map((offer) => {
              return (
                <div className="col-lg-6">
                  <div className="sb-promo-frame sb-mb-30">
                    <div className="sb-promo-content">
                      <div className="sb-text-frame">
                        <h3 className="sb-mb-10">
                          <sup>-</sup> <b className="sb-h2">{offer?.price}</b>{" "}
                          <sup>%</sup>
                        </h3>
                        <h3 className="sb-mb-15">{offer?.title}</h3>
                        <h5 className="sb-mb-15">
                          Start Date : {offer?.startAt}
                        </h5>
                        <h5 className="sb-mb-15">End Date : {offer?.endAt}</h5>
                        <p className="sb-text sb-text-sm sb-mb-15">
                          {parse(offer?.description)}
                        </p>
                        {/* button */}
                        <Link href="menu" className="sb-btn sb-ppc">
                          <span className="sb-icon">
                            <img src="/img/ui/icons/arrow.svg" alt="icon" />
                          </span>
                          <span>Get it now</span>
                        </Link>
                        {/* button end */}
                      </div>
                      <div className="sb-image-frame">
                        <div className="sb-illustration-4">
                          <img
                            src={offer?.file}
                            alt={offer?.title}
                            className="sb-burger"
                          />

                          <div className="sb-cirkle-1"></div>
                          <div className="sb-cirkle-2"></div>
                          <div className="sb-cirkle-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PromoSection;
