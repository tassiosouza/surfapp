// ** MUI Imports
// import Grid from '@mui/material/Grid'
import React, { useEffect, FC } from "react";
// import { Helmet } from "react-helmet-async";
import Pagination from "src/pages/shared/Pagination/Pagination";
import TabFilters from "src/pages/containers/TabFilters";
import { PRODUCTS } from "../../../@fake-db/data/data";
import ProductCard from "src/pages/components/ProductCard";
import ButtonPrimary from "src/pages/shared/Button/ButtonPrimary";

// import SectionPromo1 from 'src/pages/components/SectionPromo1';
// import SectionSliderCollections from "src/pages/components/SectionSliderLargeProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setLoading } from "../../../store/apps/product";
import { AppDispatch, RootState } from "src/store";
import { Typography } from "@mui/material";

export interface PageCollectionProps {
  className?: string;
}

const HomeDashboard: FC<PageCollectionProps> = ({ className = "" }) => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.product)

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('fetch products: ' + JSON.stringify(store.products))
  console.log('local products: ' + JSON.stringify(PRODUCTS))

  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      {/* <Helmet>
        <title>Collection || Ciseco Ecommerce Template</title>
      </Helmet> */}

      <div className="lg:pb-28 lg:pt-0 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />

          <main>
            <TabFilters />

            {store.loading ? (
              <Typography>loading...</Typography>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {store.products.map((product, index) => (
                  <ProductCard data={product} key={index} />
                ))}
              </div>
            )}

            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
          </main>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        <hr className="border-slate-200 dark:border-slate-700" />
      </div>
    </div>
  );
};

export default HomeDashboard;
