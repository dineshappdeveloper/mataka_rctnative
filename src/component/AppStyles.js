import AppColors from "../constants/AppColors";

export default class AppStyles {
  // Singleton instance
  static instance = null;

  static getInstance() {
    if (!AppStyles.instance) {
      AppStyles.instance = new AppStyles();
    }
    return AppStyles.instance;
  }

  constructor() {
    // Define text styles
    this.h1 = {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.h2 = {
      fontSize: 21,
      fontWeight: 'bold',
      color: '#000000',
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.h3 = {
      fontSize: 18,
      fontWeight: '600',
      color: AppColors.white,
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.h4 = {
      fontSize: 15,
      fontWeight: '500',
      color: AppColors.black,
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.h5 = {
      fontSize: 13,
      fontWeight: '300',
      color: 'rgba(0, 0, 0, 0.87)',
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.h6 = {
      fontSize: 11,
      fontWeight: '600',
      color: 'rgba(0, 0, 0, 0.87)',
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };

    this.bodyText = {
      fontSize: 16,
      color: AppColors.white,
    //   fontFamily: Assets.getInstance().fontsAbeze,
    };
  }
}
