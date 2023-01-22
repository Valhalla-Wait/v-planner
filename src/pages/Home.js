import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  GalleryGrid,
  GalleryGridCell,
  GalleryGridImg,
} from "../components/GalleryGrid";
import SignInUserModal from "../components/Modals/SignInUserModal";
import SignUpUserModal from "../components/Modals/SignUpUserModal";
import Button from "../components/UI/Button";
import useDevice from "../hooks/useDevice";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { ModalContext } from "../context/ModalContext";

export default function Home() {
  const { isMobile } = useDevice();
  const modal = useContext(ModalContext);

  SwiperCore.use([Autoplay]);

  const signUpClick = () => {
    modal.start();
    modal.setContent(<SignUpUserModal />);
  };

  const signInClick = () => {
    modal.start();
    modal.setContent(<SignInUserModal />);
  };

  const slider = () => {
    return (
      <div className="started__slider slider-started">
        <div className="slider-started__content">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            allowTouchMove={true}
            spaceBetween={8}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            breakpoints={{
              991.98: {
                allowTouchMove: false,
                spaceBetween: 32,
              },
            }}
            centeredSlides={true}
          >
            <SwiperSlide>
              <div className="slider-started__slide">
                <img
                  className="slider-started__img"
                  src="/assets/images/slider/slide-1.jpg"
                  alt=""
                />
                <div className="slider-started__text">
                  <div className="slider-started__title">
                    Company Wedding Dresses
                  </div>
                  <div className="slider-started__subtitle">
                    Wedding Dresses, Clothes
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-started__slide">
                <img
                  className="slider-started__img"
                  src="/assets/images/slider/slide-2.jpg"
                  alt=""
                />
                <div className="slider-started__text">
                  <div className="slider-started__title">
                    Company Wedding Dresses
                  </div>
                  <div className="slider-started__subtitle">
                    Wedding Dresses, Clothes
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-started__slide">
                <img
                  className="slider-started__img"
                  src="/assets/images/slider/slide-1.jpg"
                  alt=""
                />
                <div className="slider-started__text">
                  <div className="slider-started__title">
                    Company Wedding Dresses
                  </div>
                  <div className="slider-started__subtitle">
                    Wedding Dresses, Clothes
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    );
  };

  return (
    <main>
      <section className="started">
        <div className="container">
          <div className="started__content">
            <h1 className="started__title">
              Your {isMobile && " Perfect "} Wedding <span>Starts Here!</span>
            </h1>
            <small className="started__desc">
              Planning a wedding involves endless details, deadlines
            </small>
            {!isMobile && (
              <Button
                className="btn btn-accent started__btn"
                onClick={signUpClick}
              >
                Sign Up
              </Button>
            )}
          </div>
          {slider()}
          {isMobile && (
            <>
              <Button
                className="btn btn-accent started__btn d-block w-100"
                onClick={signUpClick}
              >
                Sign Up
              </Button>
              <Button
                className="btn btn-light started__btn m-t-16 d-block w-100"
                onClick={signInClick}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="gallery__content">
            <h2 className="gallery__title">Your Wedding Starts Here!</h2>
            <small className="gallery__desc">
              Use our planning checklist, read our budgeting tips, and access
              our wedding planner to help you pull it all together.
            </small>
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
    </main>
  );
}
