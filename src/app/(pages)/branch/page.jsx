import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";

import PageBanner from "@components/PageBanner";
import FeaturesOneSection from "@/src/app/_components/sections/Features";
import BranchSection from "../../_components/sections/Branch";

const TestimonialSlider = dynamic(
  () => import("@components/sliders/Testimonial"),
  { ssr: false }
);

export const metadata = {
  title: {
    default: "Branches",
  },
  description: AppData.settings.siteDescription,
};

const Branches = () => {
  return (
    <>
      <PageBanner
        pageTitle={
          "Savor the finest flavors at our branches, each offering uniqueness."
        }
        breadTitle={"Our Branches"}
        description={
          "Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        }
        type={2}
      />
      <BranchSection />
    </>
  );
};
export default Branches;
