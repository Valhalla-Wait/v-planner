import { useEffect, useState } from "react";
import SwiperCore, { Lazy, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const storiesList = [
  { id: 1, src: "https://swiperjs.com/demos/images/nature-1.jpg" },
  { id: 2, src: "https://swiperjs.com/demos/images/nature-2.jpg" },
  { id: 3, src: "https://swiperjs.com/demos/images/nature-3.jpg" },
  { id: 4, src: "https://swiperjs.com/demos/images/nature-4.jpg" },
  { id: 5, src: "https://swiperjs.com/demos/images/nature-5.jpg" },
  { id: 6, src: "https://swiperjs.com/demos/images/nature-6.jpg" },
  { id: 7, src: "https://swiperjs.com/demos/images/nature-7.jpg" },
  { id: 8, src: "https://swiperjs.com/demos/images/nature-8.jpg" },
  { id: 9, src: "https://swiperjs.com/demos/images/nature-9.jpg" },
  { id: 10, src: "https://swiperjs.com/demos/images/nature-1.jpg" },
  { id: 11, src: "https://swiperjs.com/demos/images/nature-2.jpg" },
  { id: 12, src: "https://swiperjs.com/demos/images/nature-3.jpg" },
  { id: 13, src: "https://swiperjs.com/demos/images/nature-4.jpg" },
  { id: 14, src: "https://swiperjs.com/demos/images/nature-5.jpg" },
  { id: 15, src: "https://swiperjs.com/demos/images/nature-6.jpg" },
  { id: 16, src: "https://swiperjs.com/demos/images/nature-7.jpg" },
  { id: 17, src: "https://swiperjs.com/demos/images/nature-8.jpg" },
  { id: 18, src: "https://swiperjs.com/demos/images/nature-9.jpg" },
  { id: 19, src: "https://swiperjs.com/demos/images/nature-1.jpg" },
  { id: 20, src: "https://swiperjs.com/demos/images/nature-2.jpg" },
  { id: 21, src: "https://swiperjs.com/demos/images/nature-3.jpg" },
];

// SwiperCore.use([Virtual])

const Stories = ({ onCallback, triggerStories,dto }) => {
  const [stories, setStories] = useState([]);

  const [swiperRef, setSwiperRef] = useState(null);

  const append = (list) => setStories([...stories, ...list]);

  useEffect(() => {
    append(storiesList);
    onCallback(storiesList[0]);
  }, []);

  useEffect(() => {
    if (!swiperRef) return;
    let lastIndex = swiperRef.activeIndex + 1;
    lastIndex = lastIndex < stories.length ? lastIndex : stories.length - 1;
    swiperRef.slideTo(lastIndex);
    onCallback(storiesList[lastIndex]);
  }, [triggerStories]);

  return (
    <Swiper
      onSwiper={setSwiperRef}
      // slidesPerView={10}
      slidesPerView="auto"
      allowTouchMove={true}
      spaceBetween={21}
      grabCursor={true}
      modules={[Virtual]}
      watchSlidesVisibility={true}
      className="stories__slider"
      // virtual
    >
      {stories.map((slide, idx) => (
        <SwiperSlide
          className="stories__slide"
          key={slide.id}
          virtualIndex={idx}
          onClick={() => onCallback(slide)}
        >
          <img src={slide.src} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Stories;
