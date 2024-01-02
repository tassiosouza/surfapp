import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import PlaceIcon from "./PlaceIcon";
import checkInViewIntersectionObserver from "src/utils/isInViewPortIntersectionObserver";
import Skeleton from '@mui/material/Skeleton';

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover w-full h-full",
  ...args
}) => {

  const store = useSelector((state: RootState) => state.product)

  const _containerRef = useRef(null);
  let _imageEl: HTMLImageElement | null = null;

  const [__src, set__src] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const _checkInViewPort = () => {
    if (!_containerRef.current) return;
    checkInViewIntersectionObserver({
      target: _containerRef.current as any,
      options: {
        root: null,
        rootMargin: "0%",
        threshold: 0,
      },
      freezeOnceVisible: true,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src) {
      _handleImageLoaded();
      return true;
    }
    _imageEl = new Image();
    if (_imageEl) {
      _imageEl.src = src;
      _imageEl.addEventListener("load", _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    setImageLoaded(true);
    set__src(src);
  };

  useEffect(() => {
    _checkInViewPort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} rounded-3xl flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
      >
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
          <div className="flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-64 dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      ref={_containerRef}
    >
      {!store.loading ? (
        <img src={__src} className={className} alt={alt} {...args} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default NcImage;
