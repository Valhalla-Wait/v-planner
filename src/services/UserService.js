export default class UserService {
  static async login(
    email,
    firstName,
    lastName,
    phone,
    avatar,
    nickname,
    partnersFirstName,
    partnersLastName,
    engagementDate,
    weddingDate,
    location,
    countGuest,
    budget,
    token
  ) {
    const user = {
      role: process.env.REACT_APP_ROLE_USER,
      profile: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        avatar:
          "https://content.freelancehunt.com/profile/photo/225/CrazyTapok.png",
        nickname: nickname,
        partnersFirstName: partnersFirstName,
        partnersLastName: partnersLastName,
        likes: {
          users: {
            1: true,
            // 2: true,
            // 3: true,
            // 4: true,
            // 5: true,
            // 6: true,
            // 7: true,
            // 8: true,
            // 9: true,
            // 10: true
            // 1 - ид юзера
          },
          total: 7,
        },
      },
      wedding: {
        engagementDate: engagementDate,
        weddingDate: weddingDate,
        location: location,
        countGuest: countGuest,
        budget: budget,
      },
    };

    return {
      data: {
        accessToken: JSON.stringify(token),
        refreshToken: "refresh",
        user,
      },
    };
  }
}
