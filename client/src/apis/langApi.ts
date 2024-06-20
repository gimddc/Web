import { request } from "@/utils/request";
const langResExample = {
  code: 200,
  msg: "success",
  data: "en"
};
type langResType = typeof langResExample;

/**
 * @description: 发送变更的语言
 * @params {
 * lang: string;
 * }
 * @return {*}
 */
export const postLangAPI = ({
  lang
}: {
  lang: string;
}): Promise<langResType> => {
  return request({
    url: "/api/lang",
    method: "POST",
    data: {
      lang
    }
  });
};

/**
 * @description: 获取语言
 * @return {*}
 */
export const getLangAPI = (): Promise<langResType> => {
  return request({
    url: "/api/lang",
    method: "GET"
  });
};
