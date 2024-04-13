import React, { FC } from "react";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import LikeButton from "../components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "../components/BagIcon";
import NcInputNumber from "../components/NcInputNumber";
// import { PRODUCTS } from "data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "../components/IconDiscount";
import Prices from "../components/Prices";
import toast from "react-hot-toast";

import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "../containers/ProductDetailPage/AccordionInfo";
import { Link } from "react-router-dom";

export interface ProductQuickViewProps {
  className?: string;
}


const detail1JPG = "https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg";
const detail2JPG = "https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg";
const detail3JPG = "https://surfshotsd.s3.amazonaws.com/20231231060544/surf2-scaled.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  tags: string[];
  link: "/product-detail/";
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
}

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: string;
  color?: string;
  featuredImage: string;
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: "Black",
    thumbnail: detail1JPG,
    featuredImage: detail1JPG,
  },
  {
    id: 2,
    name: "White",
    thumbnail: detail1JPG,
    featuredImage: detail1JPG,
  },
  {
    id: 3,
    name: "Orange",
    thumbnail: detail1JPG,
    featuredImage: detail1JPG,
  },
  {
    id: 4,
    name: "Sky Blue",
    thumbnail: detail1JPG,
    featuredImage: detail1JPG,
  },
  {
    id: 5,
    name: "Natural",
    thumbnail: detail1JPG,
    featuredImage: detail1JPG,
  },
];

const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    name: "Violet",
    color: "bg-violet-400",
    featuredImage: detail1JPG,
  },
  {
    id: 2,
    name: "Yellow",
    color: "bg-yellow-400",
    featuredImage: detail1JPG,
  },
  {
    id: 3,
    name: "Orange",
    color: "bg-orange-400",
    featuredImage: detail1JPG,
  },
  {
    id: 4,
    name: "Sky Blue",
    color: "bg-sky-400",
    featuredImage: detail1JPG,
  },
  {
    id: 5,
    name: "Green",
    color: "bg-green-400",
    featuredImage: detail1JPG,
  },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rey Nylon Backpack",
    description: "Brown cockroach wings",
    price: 74,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
  },
  {
    id: 2,
    name: 'Round Buckle 1" Belt',
    description: "Classic green",
    price: 68,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
  },
  {
    id: 3,
    name: "Waffle Knit Beanie",
    description: "New blue aqua",
    price: 132,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 4,
    name: "Travel Pet Carrier",
    description: "Dark pink 2023",
    price: 28,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
  },
  {
    id: 5,
    name: "Leather Gloves",
    description: "Perfect mint green",
    price: 42,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
  },
  {
    id: 7,
    name: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
  },
  {
    id: 8,
    name: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
  },
];

export const SPORT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mastermind Toys",
    description: "Brown cockroach wings",
    price: 74,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
  },
  {
    id: 2,
    name: "Jump Rope Kids",
    description: "Classic green",
    price: 68,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
  },
  {
    id: 3,
    name: "Tee Ball Beanie",
    description: "New blue aqua",
    price: 132,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 4,
    name: "Rubber Table Tennis",
    description: "Dark pink 2023",
    price: 28,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "Sold Out",
  },
  {
    id: 5,
    name: "Classic Blue Rugby",
    description: "Perfect mint green",
    price: 42,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
  },
  {
    id: 6,
    name: "Manhattan Toy WRT",
    description: "New design 2023",
    price: 30,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
  },
  {
    id: 7,
    name: "Tabletop Football ",
    description: "Matte black",
    price: 12,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "New in",
  },
  {
    id: 8,
    name: "Pvc Catching Toy",
    description: "Cream pink",
    price: 145,
    image: detail1JPG,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "limited edition",
  },
];


const ProductQuickView: FC<ProductQuickViewProps> = ({ className = "" }) => {
  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

  const [variantActive, setVariantActive] = React.useState(0);
  const [sizeSelected, setSizeSelected] = React.useState(sizes ? sizes[0] : "");
  const [qualitySelected, setQualitySelected] = React.useState(1);

  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={LIST_IMAGES_DEMO[0]}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderVariants = () => {
    if (!variants || !variants.length) {
      return null;
    }

    return (
      <div>
        <label htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
              {variants[variantActive].name}
            </span>
          </span>
        </label>
        <div className="flex mt-2.5">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative flex-1 max-w-[75px] h-10 rounded-full border-2 cursor-pointer ${variantActive === index
                ? "border-primary-6000 dark:border-primary-500"
                : "border-transparent"
                }`}
            >
              <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
                <img
                  src={variant.thumbnail}
                  alt=""
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!allOfSizes || !sizes || !sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size:
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="##"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2.5">
          {allOfSizes.map((size, index) => {
            const isActive = size === sizeSelected;
            const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${sizeOutStock
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                  } ${isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  }`}
                onClick={() => {
                  if (sizeOutStock) {
                    return;
                  }
                  setSizeSelected(size);
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link to="/product-detail">Heavy Weight Shoes</Link>
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={112}
            />

            <div className="h-6 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <Link
                to="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </Link>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <div className="">{renderVariants()}</div>
        <div className="">{renderSizeList()}</div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          data={[
            {
              name: "Description",
              content:
                "Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.",
            },
            {
              name: "Features",
              content: `<ul class="list-disc list-inside leading-7">
            <li>Material: 43% Sorona Yarn + 57% Stretch Polyester</li>
            <li>
             Casual pants waist with elastic elastic inside
            </li>
            <li>
              The pants are a bit tight so you always feel comfortable
            </li>
            <li>
              Excool technology application 4-way stretch
            </li>
          </ul>`,
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <img
                src={LIST_IMAGES_DEMO[0]}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* STATUS */}
            {renderStatus()}
            {/* META FAVORITES */}
            <LikeButton className="absolute right-3 top-3 " />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
            {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
              return (
                <div key={index} className="aspect-w-3 aspect-h-4">
                  <img
                    src={item}
                    className="w-full rounded-xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
