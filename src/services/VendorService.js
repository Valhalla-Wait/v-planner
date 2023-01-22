export default class VendorService {

  static async login(
    email,
    firstName,
    lastName,
    phone,
    avatar,
    token,
    companyName,
    nickname,
    partnersFirstName,
    partnersLastName,
    engagementDate,
    weddingDate,
    location,
    countGuest,
    budget,
  ) {
    const user = {
      role: process.env.REACT_APP_ROLE_VENDOR,
      profile: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        avatar: avatar,
        blocks: {
          personal: true,
          company: true,
          service: false,
          about: true,
          files: true,
          networks: false
        }
      },
      company: {
        logo: "https://s3-symbol-logo.tradingview.com/alphabet--600.png",
        name: companyName,
        type: "chocolate",
        amount: 100,
        state: "kiev",
        country: "Ukraine"
      },
      service: {
        types: [],
        types_1: [],
        types_2: [],
        types_3: [],
        priceRange: [],
        activities: []
      },
      about: {
        file: {
          type: "video",
          src: "/assets/video/483040_2.mp4"
        },
        title: "Title text",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        aboutCompany: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        aboutTeam: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      files: [
        {id: 1, src: "/assets/video/483040_2.mp4", type: "video"},
        {id: 2, src: "https://s3-symbol-logo.tradingview.com/alphabet--600.png", type: "image"},
        {id: 3, src: "/assets/video/483040_2.mp4", type: "video"},
        {id: 4, src: "/assets/video/483040_2.mp4", type: "video"},
        {id: 5, src: "https://s3-symbol-logo.tradingview.com/alphabet--600.png", type: "image"},
        {id: 6, src: "https://s3-symbol-logo.tradingview.com/alphabet--600.png", type: "image"},
        {id: 7, src: "https://s3-symbol-logo.tradingview.com/alphabet--600.png", type: "image"},
        {id: 8, src: "/assets/video/483040_2.mp4", type: "video"},
        {id: 9, src: "https://s3-symbol-logo.tradingview.com/alphabet--600.png", type: "image"},
        {id: 10, src: "/assets/video/483040_2.mp4", type: "video"},
      ],
      networks: {
        facebook: null,
        instagram: null,
        youtube: null,
        twitter: null,
        tiktok: null
      }
    }

    return {
      data: {
        accessToken: JSON.stringify(token),
        refreshToken: "refresh",
        user,
      }
    }
  }
  
}