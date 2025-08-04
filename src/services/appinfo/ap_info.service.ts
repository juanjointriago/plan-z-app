import {
    createDocumentWithLocalId,
    getQueryDocuments
} from "@/src/helpers/firestoreHelper";

import { APPINFO_COLLECTION } from "@/src/constants/Collections";
import { IAppInfo } from "@/src/interfaces/appinfo.interface";

export class AppInfoService {
    static async getAppInfo() {
        try {
            const getAppInfo = await getQueryDocuments<IAppInfo>({
                collection: APPINFO_COLLECTION,
                condition :[{ field: "isActive", operator: "==", value: true }],
            });
            return getAppInfo[0];
        } catch (error) {
            console.error("Error getting app info:", error);
            return {} as IAppInfo;

        }
    }
    static async updateAppInfo(appInfo: IAppInfo) {
    try {
      const docRef = await createDocumentWithLocalId<IAppInfo>(
        APPINFO_COLLECTION,
        appInfo
      );
      console.debug("App Info updated with ID:", docRef.id);
    } catch (error) {
      console.error("Error updating app info:", error);
    }
  }
}