"use client";
import React, { useEffect, useState } from "react";
import { getAllBranches } from "@/src/service/branchService";
import Data from "@data/sections/branch.json";
import { handleError } from "@/src/util/CommonFun";

const BranchSection = () => {
  const [branchList, setBranchList] = useState([]);

  // let dispatch = useDispatch();

  useEffect(() => {
    loadAllBranches();
  }, []);

  const loadAllBranches = () => {
    let temp = [];
    setBranchList([]);
    // popUploader(dispatch, true);
    getAllBranches()
      .then(async (resp) => {
        resp?.data?.records.map((branch, index) => {
          temp.push({
            id: branch?.id,
            name: branch?.name,
            facilities: branch?.facilities,
            address: branch?.address,
            locationUrl: branch?.url,
          });
        });

        await setBranchList(temp);
        // popUploader(dispatch, false);
      })
      .catch((err) => {
        // popUploader(dispatch, false);
        handleError(err);
      });
  };

  return (
    <>
      {/* branch text */}
      <section className="sb-about-text sb-p-90-0">
        <div className="sb-bg-1" style={{ marginTop: "90px" }}>
          <div></div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="sb-illustration-2 sb-mb-90">
                <div className="sb-interior-frame">
                  <img
                    src={Data.image.url}
                    alt={Data.image.alt}
                    className="sb-interior"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                <div className="sb-square"></div>

                <div className="sb-cirkle-1"></div>
                <div className="sb-cirkle-2"></div>
                <div className="sb-cirkle-3"></div>
                <div className="sb-cirkle-4"></div>

                <div className="sb-experience">
                  <div className="sb-exp-content">
                    <p className="sb-h1 sb-mb-10">{branchList?.length}</p>
                    <p className="sb-h3">{Data.number.label}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center sb-mb-60">
              <h2
                className="sb-mb-60"
                dangerouslySetInnerHTML={{ __html: Data.title }}
              />
              <div
                className="sb-text sb-mb-30"
                dangerouslySetInnerHTML={{ __html: Data.description }}
              />
              <img
                src={Data.signature}
                alt="Signature"
                className="sb-signature sb-mb-30"
              />
            </div>
          </div>
        </div>
      </section>
      {/* branch text end */}

      {/* branches list */}
      <section className="sb-features sb-p-0-30">
        <div className="container">
          <div className="row">
            {branchList.map((item, index) => (
              <div className="col-lg-12" key={`features-item-${index}`}>
                <div className="sb-features-item sb-mb-60">
                  <div className="sb-number">{index + 1}</div>
                  <div className="sb-feature-text">
                    <h3 className="sb-mb-15">{item.name}</h3>
                    <p
                      className="sb-text"
                      dangerouslySetInnerHTML={{ __html: item.facilities }}
                    />
                    <p className="sb-text">Address : {item.address}</p>
                    <a
                      target="blank"
                      href={item.locationUrl}
                      className="sb-text text-underline fw-bold"
                    >
                      <u>Branch Location</u>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* branches list end */}
    </>
  );
};

export default BranchSection;
