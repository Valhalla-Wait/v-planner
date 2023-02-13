import { useContext, useEffect, useRef, useState } from "react";
import SwiperCore, { Navigation, Pagination, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../context/AuthContext";
import { likeVendor } from "../Store/Actions/likeVendor"
import { connect, useDispatch } from "react-redux";
import axios from "axios"
SwiperCore.use([Pagination, Navigation, Virtual]);

const MatchListSlider = ({ files = [], vendorId, triggerStories, data, setVendorIndex }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  // const [flagLast, setFlagLast] = useState(false)
  // const [flagFirst, setFlagFirst] = useState(true)
  const token = localStorage.getItem('token')
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(0);
      // setFlagLast(false)
      // setFlagFirst(true)
    }
  }, []);

  const like = () => {
    dispatch(likeVendor(vendorId, data)).then(() => {
      setVendorIndex((prevState) => prevState + 1)
    })
      .catch((err) => {
        console.log(err)
      })
    triggerStories();
  };

  const dislike = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/matches/liked-or-not?vendorId=${vendorId}&status=false`,
      headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${token}` },
    }).then((res) => {
      setVendorIndex((prevState) => prevState + 1)
    })
      .catch((err) => {
        console.log(err)
      })
    triggerStories();
  };

  return (
    <Swiper
      onSwiper={setSwiperRef}
      slidesPerView={1}
      allowTouchMove={true}
      grabCursor={true}
      modules={[Pagination, Navigation, Virtual]}
      className="slider-matchlist"
      pagination={{
        type: "bullets",
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
        disabledClass: "slider-matchlist__prev-disabled",
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
      virtual
    >
      {files.map((file, idx) => (
        <SwiperSlide key={file.id} virtualIndex={idx}>
          <img src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${file.name}`} alt="" />
          <div className="slider-matchlist__actions">
            <div className="slider-matchlist__like" onClick={like}>
              <i className="icon-like"></i>
            </div>
            <div className="slider-matchlist__times" onClick={dislike}>
              <i className="icon-times"></i>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div
        className="slider-matchlist__prev"
        // onClick={prevStoriesSlide}
        ref={prevRef}
      >
        <i className="icon-arrow"></i>
      </div>
      <div
        className="slider-matchlist__next"
        // onClick={nextStoriesSlide}
        ref={nextRef}
      >
        <i className="icon-arrow"></i>
      </div>
    </Swiper>
  );
};
export default connect()(MatchListSlider);

//`http://localhost:7000/${file}`
