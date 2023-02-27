import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fancybox } from "../components/Fancybox";
import {
  GalleryGrid,
  GalleryGridCell,
  GalleryGridImg,
} from "../components/GalleryGrid";
import UnlikeModal from "../components/Modals/UnlikeModal";
import Button from "../components/UI/Button";
import { ModalContext } from "../context/ModalContext";
import useDevice from "../hooks/useDevice";
import { connect, useSelector } from "react-redux";
import { getDetailVendor } from "../Store/Actions/getVendorAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getLikedVendors } from "../Store/Actions/getLikedVendors";

SwiperCore.use([Navigation]);

function VendorItem({ isLoading }) {

  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const likedVendors = useSelector(state => state.myVendors.vendors)

  const vendorData = useSelector(state => {
   return state.myVendors.vendors.find(vendor => vendor.id === Number(id))
  })

  const modal = useContext(ModalContext);
  const device = useDevice();

  // debugger

  useEffect(() => {
    dispatch(getDetailVendor(id))
  }, [])
  const [like, setLike] = useState(!!likedVendors.find(vendor => vendor.id === vendorData.id));

  const [swiperRef, setSwiperRef] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".header-vendor");
    const scrollTop = window.scrollY;
    scrollTop >= header.offsetTop - 96
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");

    if (device.isMobile) {
      const actions = document.querySelector(".header-vendor__actions");
      const footer = document.querySelector(".footer");
      const scrollTop = window.scrollY;
      scrollTop >= footer.offsetTop - footer.clientHeight - 96
        ? actions.classList.add("hidden")
        : actions.classList.remove("hidden");
    }
  };

  const unlike = () => {
    modal.start();
    modal.setContent(<UnlikeModal onCallback={async () => {
      setLike(false)
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/matches/liked-or-not?vendorId=${vendorData.id}&status=false`,
        headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).catch((err) => {
        console.log(err)
      })
    }} />);
  };
  const images = vendorData.photos
  console.log("vendor more", vendorData)
  console.log("images", images)
  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <section className="vendor">
          <div className="page__back" onClick={() => {
            dispatch(getLikedVendors())
            navigate("/vendor")
            }}>
            <i className="icon-arrow page__back-icon"></i>
            <div className="page__back-text">Back to Vendors</div>
          </div>
          <div className="vendor__content">
            <div className="vendor__video">
              <video
                src="/assets/video/483040_2.mp4"
                poster={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${images[0].name}`}
              ></video>
            </div>
            <div className="vendor__body">
              <div className="vendor__header header-vendor">
                <div className="header-vendor__content">
                  <h3 className="header-vendor__title">
                    <span className="header-vendor__title-text">
                      {vendorData.companyName}
                    </span>
                    {like ? (
                      <i
                        onClick={unlike}
                        className="header-vendor__title-icon active icon-like"
                      ></i>
                    ) : (
                      <svg
                        onClick={() => setLike(true)}
                        className="header-vendor__title-icon"
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.0587 2.63614L18.0595 2.63717C18.6658 3.40873 19 4.38796 19 5.49214C19 6.97064 18.0788 8.79525 15.8643 10.9249C14.0774 12.6433 11.9457 14.0661 10.8228 14.7671C10.5794 14.9182 10.2938 15 10 15C9.70622 15 9.42063 14.9182 9.17719 14.7671C8.05396 14.0664 5.92298 12.6436 4.13587 10.9251C1.92109 8.79428 1 6.97056 1 5.49214C1 4.38796 1.33423 3.40873 1.94052 2.63717L1.94133 2.63614C2.51816 1.90008 3.3373 1.36862 4.27059 1.13361C5.20414 0.898543 6.19191 0.975376 7.07352 1.35043L7.07351 1.35046L7.08025 1.35327C7.87181 1.68321 8.6009 2.252 9.20747 3.04029L9.99903 4.06902L10.7918 3.04123C11.3985 2.25465 12.1284 1.68495 12.9216 1.35252L12.9216 1.35253L12.9265 1.35043C13.8081 0.975376 14.7959 0.898543 15.7294 1.13361C16.6627 1.36862 17.4818 1.90008 18.0587 2.63614Z"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </h3>
                  <h4 className="header-vendor__price">
                  {vendorData.priceFrom}-{vendorData.priceTo}$
                  </h4>
                  <div className="header-vendor__text">
                    {vendorData.companyDescription}
                  </div>
                </div>
                <div className="header-vendor__actions">
                  <Button className="btn btn-accent">Go Chat</Button>
                  <Button className="btn btn-light">Get Quote</Button>
                </div>
              </div>
              <div className="vendor__slider slider-vendor">
                <div className="slider-vendor__content">
                  <Fancybox>
                    <Swiper
                      onSwiper={setSwiperRef}
                      slidesPerView="auto"
                      spaceBetween={8}
                      grabCursor={true}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                        disabledClass: "slider-vendor__navigation-disabled",
                      }}
                    >
                      {images.map((item, index) => {
                        return <SwiperSlide className="slider-vendor__slide" key={index}>
                          <a
                            data-fancybox="gallery"
                            href={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${item.name}`}
                          >
                            <img
                              src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${item.name}`}
                              alt=""
                            />
                          </a>
                        </SwiperSlide>
                      })}


                      <div className="slider-vendor__prev" ref={prevRef}>
                        <i className="icon-arrow"></i>
                      </div>
                      <div className="slider-vendor__next" ref={nextRef}>
                        <i className="icon-arrow"></i>
                      </div>
                    </Swiper>
                  </Fancybox>
                </div>
              </div>
              <div className="vendor__about about-vendor">
                <h4 className="about-vendor__title">About</h4>
                <p className="about-vendor__text">
                  {vendorData.aboutCompany}
                </p>
              </div>
              <div className="vendor__services services-vendor">
                <h4 className="services-vendor__title">Services Details</h4>
                <div className="services-vendor__list">
                  <div className="services-vendor__item">
                    <div className="services-vendor__subtitle">
                      {vendorData.fieldOfActivity}
                    </div>
                    <p>{vendorData.typeOfService}</p>
                  </div>
                  <div className="services-vendor__item">
                    <div className="services-vendor__subtitle"></div>
                    <p>{vendorData.weddingActivity}</p>
                  </div>
                  <div className="services-vendor__item">
                    <div className="services-vendor__subtitle">
                      Wedding Activity
                    </div>
                    <p>
                      {vendorData.weddingActivity}
                    </p>
                  </div>
                  <div className="services-vendor__item">
                    <div className="services-vendor__subtitle">
                      Starting Price Range
                    </div>
                    <p>
                      {vendorData.priceFrom} - {vendorData.priceTo}$
                    </p>
                  </div>
                </div>
              </div>
              <div className="vendor__awards awards-vendor">
                <h4 className="awards-vendor__title">Awards</h4>
                <div className="awards-vendor__list">
                  <div className="awards-vendor__item">
                    <img src="/assets/images/award.svg" alt="" />
                  </div>
                  <div className="awards-vendor__item">
                    <img src="/assets/images/award.svg" alt="" />
                  </div>
                  <div className="awards-vendor__item">
                    <img src="/assets/images/award.svg" alt="" />
                  </div>
                  <div className="awards-vendor__item">
                    <img src="/assets/images/award.svg" alt="" />
                  </div>
                </div>
              </div>
              <div
                className="vendor__about about-vendor"
                style={{ borderBottom: "none" }}
              >
                <h4 className="about-vendor__title">About Team</h4>
                <p className="about-vendor__text">
                  {vendorData.aboutTeam}
                </p>
              </div>
              <GalleryGrid>
                <GalleryGridCell>

                  <GalleryGridImg
                    src="/assets/images/gallery/img-1@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-2@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-3@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-4@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-5@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-6@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-7@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-8@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-4@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
                <GalleryGridCell>
                  <GalleryGridImg
                    src="/assets/images/gallery/img-5@1x.jpg"
                    alt="Galley grid"
                  />
                </GalleryGridCell>
              </GalleryGrid>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    vendorMore: state.vendorMore,
  };
};
export default connect(mapStateToProps)(VendorItem);
