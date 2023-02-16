import Button from "../components/UI/Button";
import SwiperCore, { Lazy, Virtual } from "swiper";
import { useContext, useEffect, useState } from "react";
import Stories from "../components/Stories";
import MatchListSlider from "../components/MatchListSlider";
import Select from "react-select";
import { customReactSelectOptions } from "../utils/customReactSelectOptions";
import { Slider } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import useDevice from "../hooks/useDevice";
import { LabelLike } from "../components/Sidebar/LabelLike";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailVendor } from "../Store/Actions/getVendorAction.js";
import { connect } from "react-redux";
import { getAllVendorsAction } from "../Store/Actions/GetAllVendors.js";
import { getMessages as getMessagesAction } from "../Store/Actions/getAllMessages";
import { connectToChat, sendMessage } from "../utils/webSocketChat";


SwiperCore.use([Lazy, Virtual]);

const storiesData = [
  {
    id: 1,
    title: "data is changed ",
    price: "1$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 2,
    title: "Wedding Cakes 2",
    price: "2$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake. When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 3,
    title: "Wedding Cakes 3",
    price: "3$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 4,
    title: "Wedding Cakes 4",
    price: "4$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 5,
    title: "Wedding Cakes 5",
    price: "5$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 6,
    title: "Wedding Cakes 6",
    price: "6$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 7,
    title: "Wedding Cakes 7",
    price: "7$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 8,
    title: "Wedding Cakes 8",
    price: "8$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 9,
    title: "Wedding Cakes 9",
    price: "9$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 10,
    title: "Wedding Cakes 10",
    price: "10$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 11,
    title: "Wedding Cakes 11",
    price: "11$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 12,
    title: "Wedding Cakes 12",
    price: "12$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 13,
    title: "Wedding Cakes 13",
    price: "13$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 14,
    title: "Wedding Cakes 14",
    price: "14$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 15,
    title: "Wedding Cakes 15",
    price: "15$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 16,
    title: "Wedding Cakes 16",
    price: "16$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 17,
    title: "Wedding Cakes 17",
    price: "17$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 18,
    title: "Wedding Cakes 18",
    price: "18$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
  {
    id: 19,
    title: "Wedding Cakes 19",
    price: "19$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg",
      "https://klike.net/uploads/posts/2019-06/1560838551_1.jpg",
      "https://mobimg.b-cdn.net/v3/fetch/28/2892a3887bd226b3cdd24742aa0a48b5.jpeg",
      "https://pix-feed.com/wp-content/uploads/2019/08/2-11.jpg",
    ],
  },
  {
    id: 20,
    title: "Wedding Cakes 20",
    price: "20$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://st.depositphotos.com/2044631/2014/i/600/depositphotos_20146623-stock-photo-tigers-face.jpg",
      "https://storge.pic2.me/cm/2560x1920/147/54a996a7bb68e.jpg",
      "http://co15.nevseoboi.com.ua/animal/230/23044/1481357993-161004558-animal-nevseoboi.com.ua.jpg",
    ],
  },
  {
    id: 21,
    title: "Wedding Cakes 21",
    price: "21$-3000$",
    description:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    services: ["Wedding Bakary", "Wedding Cakes"],
    about:
      "When couples start thinking about their wedding plans, one of the details that typically first comes to mind is their wedding cake.",
    files: [
      "https://funart.pro/uploads/posts/2021-03/1617048969_52-p-oboi-krasivie-peizazhi-prirodi-56.jpg",
      "https://images.prom.ua/1928657107_w640_h640_fotooboi-flizelinovye-3d.jpg",
      "https://klike.net/uploads/posts/2020-09/1600242017_1.jpg",
      "https://www.5.ua/media/pictures/1140x641/188383.jpg?t=1594112566",
    ],
  },
];

const marks = [{ value: 0 }, { value: 50 }, { value: 100 }];

function Matchlist({ dto, getAll, token, loading, getMessages, chatState }) {
  // const [data, setData] = useState(dto.result[0]);

  const [vendorIndex, setVendorIndex] = useState(0);

  const currentUserData = useSelector(state => state.userInfo?.userData)
  const likedVendors = useSelector((state) => state.myVendors.vendors)
  const vendors = useSelector((state) => state.matchList.allVendors.result)
  const allVendors = [...likedVendors, ...vendors]
  const selectVendor = allVendors[vendorIndex]

  useEffect(() => {
    if (vendorIndex < 0) {
      setVendorIndex(allVendors.length-1)
    }
    if (vendorIndex > allVendors.length-1) {
      setVendorIndex(0)
    }
  }, [vendorIndex])

  console.log(selectVendor,likedVendors)
  console.log('vendorIndex', vendorIndex)

  const [filterActive, setFilterActive] = useState(false);

  const navigate = useNavigate();
  // console.log("data photos ебучий",data.photos)
  const dispatch = useDispatch();
  const [triggerStoriesSlide, setTriggerStoriesSlide] = useState(false);
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const device = useDevice();


  const [tags, setTags] = useState([
    { value: "Reception Venues", title: "Reception Venues", active: true },
    { value: "Photographers", title: "Photographers", active: true },
    { value: "Videographers", title: "Videographers", active: true },
    { value: "Bridal Salons", title: "Bridal Salons", active: true },
    { value: "Beauty", title: "Beauty", active: true },
    { value: "DJ", title: "DJ", active: false },
    { value: "Wedding Bands", title: "Wedding Bands", active: false },
    { value: "Florists", title: "Florists", active: false },
    { value: "Wedding Planners", title: "Wedding Planners", active: false },
    { value: "Hotels", title: "Hotels", active: false },
    { value: "Jewelers", title: "Jewelers", active: false },
    {
      value: "Officiants & Premarital Counseling",
      title: "Officiants & Premarital Counseling",
      active: false,
    },
    { value: "Bar Services", title: "Bar Services", active: false },
    { value: "Caterers", title: "Caterers", active: false },
    { value: "Dance Lessons", title: "Dance Lessons", active: false },
    { value: "Decor", title: "Decor", active: false },
    {
      value: "Ensembles & Soloists",
      title: "Ensembles & Soloists",
      active: false,
    },
    { value: "Favors & Gifts", title: "Favors & Gifts", active: false },
    { value: "Invitations", title: "Invitations", active: false },
    { value: "Photo Booths", title: "Photo Booths", active: false },
    {
      value: "Rehearsal Dinners, Bridal Parties & Showers",
      title: "Rehearsal Dinners, Bridal Parties & Showers",
      active: true,
    },
    { value: "Travel Specialists", title: "Travel Specialists", active: true },
    { value: "Rentals", title: "Rentals", active: true },
    { value: "Transportation", title: "Transportation", active: true },
    { value: "Wedding Cakes", title: "Wedding Cakes", active: true },
  ]);

  const triggerStories = () => {
    setTriggerStoriesSlide(!triggerStoriesSlide);
  };
  const [story,setStory] = useState("")
  console.log("all vendors",dto)
   useEffect(() => {
     getAll()
    //  getMessages()

  }, [token]);
  // console.log("chatState after changing",chatState)

  // console.log("Загрузка при рендере компоненты",loading)
  // console.log(token)

  return (
    <>
      {loading ? <div>loading...</div> : <section className="matchlist">
        <div className="matchlist__header">
          <h3>Matchlist</h3>
          <Button
            className="btn btn-equalizer"
            onClick={() => setFilterActive(!filterActive)}
          >
            <div>
              <span>Filters</span>
              <i className="icon-equalizer"></i>
            </div>
          </Button>

          <div className={filterActive ? "filter active" : "filter"}>
            <h4 className="filter__title">Filters</h4>
            <div className="filter__content">
              <div className="filter__subtitle">Services</div>
              <div className="filter__tag tag-filter">
                {tags.map((tag) => (
                  <div
                    className={
                      tag.active ? "tag-filter__item active" : "tag-filter__item"
                    }
                    onClick={() => {
                      setTags(
                        tags.map((item) =>
                          item.title === tag.title
                            ? { ...item, active: !item.active }
                            : item
                        )
                      );
                    }}
                    key={tag.value}
                  >
                    {tag.title}
                  </div>
                ))}
              </div>
              <div className="filter__subtitle">Location</div>
              <div className="filter__location">
                <label className="input-label">
                  <Select
                    placeholder="State"
                    options={[
                      { value: "kiev", label: "Kiev" },
                      { value: "new-your", label: "New York" },
                    ]}
                    isClearable={false}
                    isSearchable={false}
                    onChange={(...props) => {
                      console.log(props);
                    }}
                    {...customReactSelectOptions(theme.get())}
                  />
                </label>
                <label className="input-label">
                  <Select
                    placeholder="Distance"
                    options={[
                      { value: "+0", label: "+0 km" },
                      { value: "+5", label: "+5 km" },
                      { value: "+10", label: "+10 km" },
                      { value: "+20", label: "+20 km" },
                    ]}
                    isClearable={false}
                    isSearchable={false}
                    onChange={(...props) => {
                      console.log(props);
                    }}
                    {...customReactSelectOptions(theme.get())}
                  />
                </label>
              </div>
              <div className="filter__subtitle">Price</div>
              <div className="filter__price">
                <div className="filter__price-labels">
                  <div className="filter__price-labels-item">Low</div>
                  <div className="filter__price-labels-item">Medium</div>
                  <div className="filter__price-labels-item">High</div>
                </div>
                <Slider
                  step={null}
                  defaultValue={50}
                  marks={marks}
                  style={{
                    backgroudColor: "red",
                  }}
                />
              </div>
            </div>
            <div className="modal__close" onClick={() => setFilterActive(false)}>
              <i className="icon-times"></i>
            </div>
          </div>
        </div>
        {device.isMobile &&
          Object.keys(auth.user.profile.likes.users).length < 10 && <LabelLike />}
        <div className="matchlist__stories stories">
          <Stories
            onCallback={(story) => {
              // console.log("stroyDto", ...storiesData);
              // console.log("idshki",story.id)
              // setData(...dto.result.filter((item) => story.id === item.id));
              // console.log("data after changing", dto);

            }}
            // dto={
            // }
            triggerStories={triggerStoriesSlide}
          />
        </div>
        {selectVendor === undefined
          ? <>MatchList is empty</>
          : <div className="matchlist__content content-matchlist">
            <div className="content-matchlist__wrapper">
              <div className="content-matchlist__body">
                <div className="content-matchlist__inner">
                  <div className="content-matchlist__content">
                    {loading == true ? (
                      "Loading..."
                    ) : (
                      <MatchListSlider
                        files={selectVendor?.photos}
                        vendorData={selectVendor}
                        triggerStories={triggerStories}
                        data={selectVendor}
                        likedVendors={likedVendors}
                        setVendorIndex={setVendorIndex}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="content-matchlist__info info-matchlist">
                {loading == true ? (
                  "Loading..."
                ) : (
                  <>
                    <h3 className="info-matchlist__title">{selectVendor?.companyName}</h3>
                    <div className="info-matchlist__content">
                      <div className="info-matchlist__price">{selectVendor?.price}</div>
                      <p className="info-matchlist__description">
                        {selectVendor?.companyDescription}
                      </p>
                      <div className="info-matchlist__subtitle">Services</div>
                      {
                        selectVendor?.services.map((service =>
                          <p className="italic">{service.name}</p>
                        ))
                      }
                      <div className="info-matchlist__subtitle">About</div>
                      <p>{selectVendor?.aboutCompany}</p>
                    </div>
                    <div className="info-matchlist__footer">
                      {likedVendors.length >= 10 && (
                        <Button
                          className="btn btn-go-chat d-block w-100"
                          onClick={async () => {
                            // await connectToChat(currentUserData.id, () => console.log(`go chat with ${commonVendors?.firstName}`), {
                            //   userId: currentUserData.id,
                            //   vendorId: commonVendors?.id,
                            //   userFirstName: currentUserData.firstName,
                            //   vendorFirstName: commonVendors.firstName
                            // })
                            navigate(`/chat/${selectVendor?.userModel?.id}`);
                          }}
                        >
                          Go Chat
                        </Button>
                      )}

                      <Button
                        className="btn btn-light d-block w-100"
                        onClick={() => {
                          dispatch(getDetailVendor(selectVendor?.userModel?.id));
                          navigate(`/vendor/${selectVendor?.userModel?.id}`);
                        }}
                      >
                        View Vendor
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        }

      </section>}
    </>

  );
}
const mapStateToProps = function (state) {
  return {
    dto: state.matchList.allVendors,
    token: state.userInfo.token,
    loading: state.matchList.loading,
    chatState: state.chat

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAll: () => dispatch(getAllVendorsAction()),
    getMessages: () => dispatch(getMessagesAction())

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Matchlist);
