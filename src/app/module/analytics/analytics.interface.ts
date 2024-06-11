import { IIcons } from "../icon/icon.interface";
import { IDonation } from "../donation/donation.interface";
import { IStockPhotos } from "../stockPhotos/stockPhotos.interface";
import { IDesignTemplate } from "../design-template/design-template.interface";
import { ISoftwareAndTools } from "../softwareAndTools/softwareAndTools.interface";
import { ICourseAndLearning } from "../course-add-learing/course-add-learning.interface";
interface IAnalyticsReturn {
  users: {
    total: number;
    lastMonth: number;
  };
  assets: {
    total: number;
    lastMonth: number;
  };
  icons: {
    total: number;
    lastMonth: number;
    trending: IIcons[];
  };
  stockPhotos: {
    total: number;
    lastMonth: number;
    trending: IStockPhotos[];
  };
  designTemplates: {
    total: number;
    lastMonth: number;
    trending: IDesignTemplate[];
  };
  coursesAndLearnings: {
    total: number;
    lastMonth: number;
    trending: ICourseAndLearning[];
  };
  toolsAndSoftwares: {
    total: number;
    lastMonth: number;
    trending: ISoftwareAndTools[];
  };
  donations: {
    total: number;
    lastMonth: number;
    last24Hours: number;
    recentDonations: IDonation[];
  };
  downloads: {
    total: number;
    lastMonth: number;
  };
  uniqueDownloads: {
    total: number;
    lastMonth: number;
  };
}

export default IAnalyticsReturn;
