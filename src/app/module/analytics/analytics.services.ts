import { CourseAndLearning } from "../course-add-learing/course-add-learning.model";
import { User } from "../auth/auth.model";
import { Donation } from "../donation/donation.model";
import { Download } from "../download/download.model";
import { SoftwareAndTools } from "../softwareAndTools/softwareAndTools.model";
import IAnalyticsReturn from "./analytics.interface";
import { addHours, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { DesignTemplate } from "../design-template/design-template.model";
import { Icons } from "../icon/icon.model";
import { StockPhotos } from "../stockPhotos/stockPhotos.model";

// ! Section 0
// ? Main Service for analytics
/**
 * * A Service to get all needed data for admin dashboard
 * @returns {Object} a object contained all analytics data
 */
const GetAnalyticIntoDB = async (): Promise<IAnalyticsReturn> => {
  // date related needed variables
  const today = new Date();
  const endDate = subMonths(endOfMonth(today), 1);
  const startDate = startOfMonth(endDate);
  const twentyFourHoursAgo = addHours(today, -24);
  const threeMonthsAgo = subMonths(today, 3);
  /*
   * get total assets, total icons, total design templates,
   * total stock photos, total software and tools
   */
  const getDocumentsCount = await countResources();

  // * Find User count and new user joined last month
  const getUsersCount = await countUsers(startDate, endDate);

  // * Trending datas for each category
  // courses and learnings
  const trendingCoursesAndLearning = await findCoursesAndLearningTrendingData(
    threeMonthsAgo,
    today
  );
  // design templates
  const trendingDesignTemplates = await findDesignTemplatesTrendingData(
    threeMonthsAgo,
    today
  );
  // icons
  const trendingIcons = await findIconsTrendingData(threeMonthsAgo, today);

  // stock photos
  const trendingStockPhotos = await findStockPhotosTrendingData(
    threeMonthsAgo,
    today
  );

  // trending tools and software ---- Most Popular of all time
  const trendingToolsAndSoftware = await findSoftwareAndToolsTrendingData();

  // * last month uploaded assets (each category) and tools & softwares
  // last month upload software and tools
  const lastMonthToolsAndSoftware = await countLastMonthToolsAndSoftwares(
    startDate,
    endDate
  );

  // last month uploaded design templates
  const lastMonthDesignTemplates = await countLastMonthDesignTemplates(
    startDate,
    endDate
  );

  // last months icons
  const lastMontsIcons = await countLastMonthsIcons(startDate, endDate);

  /// last month stock photos
  const lastMonthStockPhotos = await countLastMontsStockPhotos(
    startDate,
    endDate
  );

  // last month courses and learnings
  const lastMonthCoursesAndLearnings = await countLastMonthCoursesAndLearning(
    startDate,
    endDate
  );

  // last month upload asset

  const lastMonthUploadAsset =
    lastMonthDesignTemplates +
    lastMontsIcons +
    lastMonthStockPhotos +
    lastMonthCoursesAndLearnings;

  // * Donation
  // calculate total donation amount -------------
  const totalDonation = await totalDonationCount();

  // calculate last 24 hours donation amount-----------------
  // last 24 hours donation calculate------------------------
  const last24HoursDonationAmount =
    await findLast24HoursDonation(twentyFourHoursAgo);

  // all 24 hours donation list------------
  const last24HoursDonationList =
    await findLast24HoursDonationList(twentyFourHoursAgo);
  // calculate last month donation data -----------------------
  const lastMonthDonationAmount = await calculateLastMonthDonationData(
    startDate,
    endDate
  );

  // * Download - Regular Download
  // count total downloads of assets
  const getDownloadsData = await countDownloadsData(startDate, endDate);

  // * Unique Download
  const uniqueDownloadAsset = await getUniqueDownloadAsset(startDate, endDate);
  // calculate unique download --------------------------
  // const result = await getUniqueDownloadAsset(startDate, endDate);
  return {
    users: {
      total: getUsersCount.totalUsers,
      lastMonth: getUsersCount.lastMonthCreateUsers
    },
    assets: {
      total: getDocumentsCount.totalAssets,
      lastMonth: lastMonthUploadAsset
    },
    icons: {
      total: getDocumentsCount.totalIcons,
      lastMonth: lastMontsIcons,
      trending: trendingIcons
    },
    stockPhotos: {
      total: getDocumentsCount.totalStockPhotos,
      lastMonth: lastMonthStockPhotos,
      trending: trendingStockPhotos
    },
    designTemplates: {
      total: getDocumentsCount.totalDesignTemplates,
      lastMonth: lastMonthDesignTemplates,
      trending: trendingDesignTemplates
    },
    coursesAndLearnings: {
      total: getDocumentsCount.totalCoursesAndLearning,
      lastMonth: lastMonthCoursesAndLearnings,
      trending: trendingCoursesAndLearning
    },
    toolsAndSoftwares: {
      total: getDocumentsCount.totalToolsAndSoftware,
      lastMonth: lastMonthToolsAndSoftware,
      trending: trendingToolsAndSoftware
    },
    donations: {
      total: totalDonation,
      lastMonth: lastMonthDonationAmount,
      last24Hours: last24HoursDonationAmount,
      recentDonations: last24HoursDonationList
    },
    downloads: {
      total: getDownloadsData.totalDownloads,
      lastMonth: getDownloadsData.lastMonthDownloadAsset
    },
    uniqueDownloads: {
      total: uniqueDownloadAsset.totalFinalDownloads,
      lastMonth: uniqueDownloadAsset.totalMonthlyDownloads
    }
  };
};

// ! Section 6
// ? function to count total users and new users
const countUsers = async (startDate: Date, endDate: Date) => {
  // count the number of users
  const totalUsers = await User.estimatedDocumentCount().lean().exec();

  // Query database to count last monts users
  const userList = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalUser: { $sum: 1 }
      }
    }
  ]).exec();

  const lastMonthCreateUsers = userList.length > 0 ? userList[0].totalUser : 0;

  const result = {
    totalUsers,
    lastMonthCreateUsers
  };

  return result;
};

// ! Section 5
// ? find number of documents across 5 different category of assets
/**
 * * A function to calculate total softwares and tools, total assets,
 * * and total assets of each category of design templates, icons,
 * * stock photos and courses & learnings
 * @returns {Object} a object that contained desired data
 */
const countResources = async () => {
  // Query the database
  const totalIcons = await Icons.estimatedDocumentCount().lean().exec();
  const totalCoursesAndLearning =
    await CourseAndLearning.estimatedDocumentCount().lean().exec();

  const totalDesignTemplates = await DesignTemplate.estimatedDocumentCount()
    .lean()
    .exec();

  const totalStockPhotos = await StockPhotos.estimatedDocumentCount()
    .lean()
    .exec();

  const totalToolsAndSoftware = await SoftwareAndTools.estimatedDocumentCount()
    .lean()
    .exec();

  // sum the assets
  const totalAssets =
    totalCoursesAndLearning +
    totalDesignTemplates +
    totalIcons +
    totalStockPhotos;

  const result = {
    totalAssets,
    totalIcons,
    totalStockPhotos,
    totalDesignTemplates,
    totalCoursesAndLearning,
    totalToolsAndSoftware
  };
  return result;
};

// ! Section 4
// ? a service to find 5 categorys trending(last 3 months) list
/**
 * * Find the top 10 most popular courses and learning based on last 3 months
 * @param startDate date exactly three months ago
 * @param endDate todays date
 * @returns {Array} a array of objects containing 10 most trending courses and learning
 */
const findCoursesAndLearningTrendingData = async (
  startDate: Date,
  endDate: Date
) => {
  const projection = {
    _id: 0,
    title: 1,
    type: 1,
    click: 1,
    download: 1,
    finalDownload: 1
  };

  const trendingCoursesAndLearnings = await CourseAndLearning.aggregate([
    // stage - 1 - find document created last month
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage - 2 - sort by descending order
    {
      $sort: {
        download: -1
      }
    },
    {
      $limit: 10
    },
    {
      $project: projection
    }
  ]).exec();

  return trendingCoursesAndLearnings;
};

/**
 * * Find the top 10 most popular design templates based on last 3 months
 * @param startDate date exactly three months ago
 * @param endDate todays date
 * @returns {Array} a array of objects containing 10 most trending design templates
 */
const findDesignTemplatesTrendingData = async (
  startDate: Date,
  endDate: Date
) => {
  const projection = {
    _id: 0,
    title: 1,
    type: 1,
    click: 1,
    download: 1,
    finalDownload: 1
  };

  return await DesignTemplate.aggregate([
    // stage - 1 - find document created last month
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage - 2 - sort by descending order
    {
      $sort: {
        download: -1
      }
    },
    {
      $limit: 10
    },
    {
      $project: projection
    }
  ]).exec();
};

/**
 * * Find the top 10 most popular icons based on last 3 months
 * @param startDate date exactly three months ago
 * @param endDate todays date
 * @returns {Array} a array of objects containing 10 most trending icons
 */
const findIconsTrendingData = async (startDate: Date, endDate: Date) => {
  const projection = {
    _id: 0,
    title: 1,
    type: 1,
    click: 1,
    download: 1,
    finalDownload: 1
  };

  return await Icons.aggregate([
    // stage - 1 - find document created last month
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage - 2 - sort by descending order
    {
      $sort: {
        download: -1
      }
    },
    {
      $limit: 10
    },
    {
      $project: projection
    }
  ]).exec();
};

/**
 * * Find the top 10 most popular stock photos based on last 3 months
 * @param startDate date exactly three months ago
 * @param endDate todays date
 * @returns {Array} a array of objects containing 10 most trending stock photos
 */
const findStockPhotosTrendingData = async (startDate: Date, endDate: Date) => {
  const projection = {
    _id: 0,
    title: 1,
    type: 1,
    click: 1,
    download: 1,
    finalDownload: 1
  };

  return await StockPhotos.aggregate([
    // stage - 1 - find document created last month
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage - 2 - sort by descending order
    {
      $sort: {
        download: -1
      }
    },
    {
      $limit: 10
    },
    {
      $project: projection
    }
  ]).exec();
};

/**
 * * A function to find the Top 10 Most popular Tools and Softwares
 * @returns {Array} an array containing 10 most popular software and tools
 */
const findSoftwareAndToolsTrendingData = async () => {
  const projection = {
    _id: 0,
    title: 1,
    type: 1,
    click: 1,
    visited: 1,
    pricing: 1,
    subCategories: 1
  };

  return await SoftwareAndTools.aggregate([
    // stage 1 - sort by descending order
    {
      $sort: {
        visited: -1
      }
    },
    // stage 2 - limit to 10 document
    {
      $limit: 10
    },
    // stage 3 - project necessary data
    {
      $project: projection
    }
  ]).exec();
};

/**
 * * A function to calculate total donation of all times
 * @returns {Number} total donation
 */
const totalDonationCount = async () => {
  const totalMoneyDoc = await Donation.aggregate([
    {
      $group: {
        _id: 0,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]).exec();

  const totalDonation =
    totalMoneyDoc.length > 0 ? totalMoneyDoc[0].totalAmount : 0;

  return totalDonation;
};

/**
 * * A function to find the most recent donations data list
 * @param {Date} twentyFourHoursAgo indicating date and time 24 hours ago
 * @returns {Array} a array containing information about donation made in last 24 hours
 */
const findLast24HoursDonationList = async (twentyFourHoursAgo: Date) => {
  const projection = {
    _id: 0,
    userEmail: 1,
    transactionId: 1,
    paymentMethod: 1,
    amount: 1
  };
  // find last 24 hours donation list
  const result = await Donation.find(
    {
      createdAt: { $gte: twentyFourHoursAgo }
    },
    projection
  )
    .limit(10)
    .sort({ createdAt: "desc" })
    .lean()
    .populate("user", {
      _id: 0,
      username: 1
    })
    .exec();
  return result;
};

// last 24 hours donation calculate------------------------
/**
 * * Calculate last 24 hours donation amount
 * @param {Date} twentyFourHoursAgo indicating date and time 24 hours ago
 * @returns {Number} total donation in last 24 hours
 */
const findLast24HoursDonation = async (twentyFourHoursAgo: Date) => {
  const last24HoursDonation = await Donation.aggregate([
    {
      $match: {
        createdAt: { $gte: twentyFourHoursAgo }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]).exec();

  return last24HoursDonation.length > 0
    ? last24HoursDonation[0].totalAmount
    : 0;
};

// ! Section 3
// ? Last monts uploaded assets
/**
 * * A function to calculate how many softwares and tools last month
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total count of uploaded softwares and tools
 */
const countLastMonthToolsAndSoftwares = async (
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const toolsAndSoftwareList = await SoftwareAndTools.aggregate([
    // stage 1 - matching last months document
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage 2 - count total document
    {
      $count: "total_uploaded"
    }
  ]).exec();

  return toolsAndSoftwareList.length > 0
    ? toolsAndSoftwareList[0]?.total_uploaded
    : 0;
};

/**
 * * A function to calculate how many design templates uploaded last month
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total count of uploaded design templates
 */
const countLastMonthDesignTemplates = async (
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const designTemplateList = await DesignTemplate.aggregate([
    // stage - 1
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage 2 - count total document
    {
      $count: "total_uploaded"
    }
  ]).exec();

  return designTemplateList.length > 0
    ? designTemplateList[0]?.total_uploaded
    : 0;
};

/**
 * * A function to calculate how many icons uploaded last month
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total count of uploaded icons
 */
const countLastMonthsIcons = async (
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const iconsList = await Icons.aggregate([
    // stage - 1
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    // stage - 2
    {
      $count: "total_uploaded"
    }
  ]).exec();

  return iconsList.length > 0 ? iconsList[0].total_uploaded : 0;
};

/**
 * * A function to calculate how many stock photos uploaded last month
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total count of uploaded stock photos
 */
const countLastMontsStockPhotos = async (
  startDate: Date,
  endDate: Date
): Promise<number> => {
  const stockPhotosList = await StockPhotos.aggregate([
    // stage - 1
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    // stage - 2
    {
      $count: "total_uploaded"
    }
  ]).exec();

  return stockPhotosList.length > 0 ? stockPhotosList[0].total_uploaded : 0;
};

/**
 * * A function to calculate how many courses uploaded last month
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total count of uploaded courses and learnings
 */
const countLastMonthCoursesAndLearning = async (
  startDate: Date,
  endDate: Date
) => {
  const coursesAndLearningsList = await CourseAndLearning.aggregate([
    // stage - 1
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    // stage - 2
    {
      $count: "total_uploaded"
    }
  ]).exec();
  return coursesAndLearningsList.length > 0
    ? coursesAndLearningsList[0].total_uploaded
    : 0;
};

/**
 * * A function to calculate last months donation amount
 * @param startDate a date indicating first day of last month
 * @param endDate a date indicating last day of last mont
 * @returns {Number} total donation last month
 */
const calculateLastMonthDonationData = async (
  startDate: Date,
  endDate: Date
) => {
  const donationList = await Donation.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]).exec();
  //
  return donationList.length > 0 ? donationList[0].totalAmount : 0;
};

// ! Section 2
// ? Downloads
/**
 * * A function to calculate total downloads(not-unique)
 * * and last months total download
 * @param {Date} startDate Last Months beginning
 * @param {Date} endDate Last monts ending
 * @returns {Object} a object containing total downloads and last months download
 */
const countDownloadsData = async (startDate: Date, endDate: Date) => {
  const totalDownloads = await Download.estimatedDocumentCount().lean().exec();

  // last month download ---------
  const downloadCalculateList = await Download.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalDownload: { $sum: 1 }
      }
    }
  ]).exec();

  const lastMonthDownloadAsset =
    downloadCalculateList.length > 0
      ? downloadCalculateList[0].totalDownload
      : 0;

  return {
    totalDownloads,
    lastMonthDownloadAsset
  };
};

// ! Section 1
// ? Unique Downloads
const getUniqueDownloadAsset = async (startDate: Date, endDate: Date) => {
  const downloads = await Download.find({})
    .populate("assets", "finalDownload")
    .exec();
  const monthlyDownloads = await Download.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  })
    .populate("assets", "finalDownload")
    .lean()
    .exec();
  // (downloads);
  // calculate total dowloads
  let totalFinalDownloads = 0;
  for (const download of downloads) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    totalFinalDownloads += download?.assets?.finalDownload;
  }

  // calculate monthly downloads
  let totalMonthlyDownloads = 0;
  for (const download of monthlyDownloads) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    totalMonthlyDownloads += download?.assets?.finalDownload;
  }

  return {
    totalFinalDownloads,
    totalMonthlyDownloads
  };
};

export const AnalyticService = {
  GetAnalyticIntoDB
};
