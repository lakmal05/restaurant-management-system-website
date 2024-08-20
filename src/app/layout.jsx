import { Rubik, Monoton } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const monoton = Monoton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-monoton",
  display: "swap",
});

import "@styles/css/plugins/bootstrap.min.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/font-awesome.min.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import "@styles/scss/style.scss";
import "./globals.css";

import ScrollbarProgress from "@layouts/scrollbar-progress/Index";

import AppData from "@data/app.json";
import store from "../redux";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./_layouts/loader/Loader";
import { Provider } from "react-redux";

export const metadata = {
  title: {
    default: AppData.settings.siteName,
    template: "%s | " + AppData.settings.siteName,
  },
  description: AppData.settings.siteDescription,
};

const Layouts = ({ children }) => {
  return (
    <html lang="en" className={`${rubik.variable} ${monoton.variable}`}>
      <body>
        {/* <Provider store={store}> */}
          <Suspense fallback={<Loader />}>
            <Loader />
            <div className="sb-app">{children}</div>
            <ToastContainer newestOnTop />
          </Suspense>
        {/* </Provider> */}
      </body>
    </html>
  );
};
export default Layouts;
