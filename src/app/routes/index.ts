import express from "express";
import { AuthRoute } from "../module/auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { FeedbackRoute } from "../module/feedback/feedback.route";
import { DownloadRoute } from "../module/download/download.route";
import { CourseAndLearningRoute } from "../module/course-add-learing/course-add-learning.route";
import { KeywordRoute } from "../module/keyword/keyword.route";
import { AnalyticRoute } from "../module/analytics/analytics.route";
import { DonationRoute } from "../module/donation/donation.route";
import { SoftwareAndToolsRoute } from "../module/softwareAndTools/softwareAndTools.route";
import { ImportantPageRoute } from "../module/importantPage/importantPage.route";
import { IconRoute } from "../module/icon/icon.route";
import { EmailCollectRoute } from "../module/email-collect/email-collect.route";
import { StockPhotosRoute } from "../module/stockPhotos/stockPhotos.route";
import { DesignTemplateRoute } from "../module/design-template/design-template.route";
const router = express.Router();
// Application Module Route ---------
const moduleRoute = [
  {
    path: "/auth",
    route: AuthRoute
  },
  {
    //user
    path: "/04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb",
    route: UserRoute
  },
  {
    //feedback
    path: "/59bda3f8ee98128d543572e0d29f27ad5343f0c88c36e7bf4672c4c3ab6245b4",
    route: FeedbackRoute
  },
  {
    //keyword
    path: "/d6d198dd68bbff3e3fef3ae8aa7c4d9608c0b13cc99e15077b82dfa3233be364",
    route: KeywordRoute
  },
  {
    // Course And Learning
    path: "/8bf729ffe074caee622c02928173467e658e19e28233cff8a445819e3cae4d50",
    route: CourseAndLearningRoute
  },
  {
    // download
    path: "/68ff63fb82e0e5dfec2a8496bf9afef608ad639ed552e740268eb537fa52067f",
    route: DownloadRoute
  },
  {
    path: "/6710e49eebf184e7a309686224ecf6fd9a5228cee76e8e0ef4034684d683112f",
    route: AnalyticRoute
  },
  {
    // donation(donation)
    path: "/3433844a443e80708d701b27c3442d17911a71d7269f6495309237829d82fbc3",
    route: DonationRoute
  },
  {
    //softwareAndTools
    path: "/44f1f67e2c43a54f0431978da46c7c2b0e11c4e4fd13e96d7e9d9223d8f549ee",
    route: SoftwareAndToolsRoute
  },
  {
    //important-page
    path: "/e51210ce250c2139111c7f61be481cc034f2b5c0fedbe3c5d8ff69949d04a936",
    route: ImportantPageRoute
  },
  {
    //icon
    path: "/c2d4b446a44ce54fab8e01150e24dd24f3d850c7c14dcfe31f6321341dd86874",
    route: IconRoute
  },
  {
    //email
    path: "/82244417f956ac7c599f191593f7e441a4fafa20a4158fd52e154f1dc4c8ed92",
    route: EmailCollectRoute
  },
  {
    //stock-photos
    path: "/455541edaf418e1475da94ef2d65fe39becb18883f335b4abf0a12a6c79e166e",
    route: StockPhotosRoute
  },
  {
    //design-template
    path: "/134f5d095acf020b48c7b732a3dff35993059d96f9e3db4285814fe1c2d1ab0b",
    route: DesignTemplateRoute
  }
];

moduleRoute.forEach(route => router.use(route.path, route.route));

export const ApplicationRoute = router;
