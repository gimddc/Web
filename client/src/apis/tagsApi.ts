import { request } from "@/utils/request";
export const tagsResExample = {
  code: 200,
  msg: "查询成功",
  data: [
    { id: "3026ab9e-282a-4ffb-b847-d63f919e433c", name: "sixue0430" },
    { color: "green", id: "411012ad-9999-415c-bac7-699b6fe8ad2b", name: "绿色" }
  ]
};

type tagsResType = typeof tagsResExample;
const tagsListExample = [
  { id: "3026ab9e-282a-4ffb-b847-d63f919e433c", name: "sixue0430" },
  { color: "green", id: "411012ad-9999-415c-bac7-699b6fe8ad2b", name: "绿色" }
];
export type tagsListType = typeof tagsListExample;

/**
 * @description: 获取标签数据
 * @return {*}
 */
export const getTagsAPI = (): Promise<tagsResType> => {
  return request({
    url: "/api/tags",
    method: "GET"
  });
};
/**
 * @description: 发送要添加的标签数据
 * @params {
 * {name: string;//标签名称
 * color: string;//标签颜色}
 * @return {*}
 */
export const postTagsAPI = ({
  name,
  color
}: {
  name: string;
  color: string;
}): Promise<tagsResType> => {
  return request({
    url: "/api/tags",
    method: "POST",
    data: { name, color }
  });
};
/**
 * @description: 发送要修改的标签数据
 * @params {
 * {id: string;//标签id
 * name: string;//标签名称
 * color: string;//标签颜色}
 * @return {*}
 */
export const editTagsAPI = ({
  id,
  name,
  color
}: {
  id: string;
  name: string;
  color: string;
}): Promise<tagsResType> => {
  return request({
    url: "/api/tags",
    method: "PUT",
    data: { id, name, color }
  });
};
/**
 * @description:删除标签
 * @return {*}
 */
export const delTagsAPI = ({
  ids
}: {
  ids: string[];
}): Promise<tagsResType> => {
  return request({
    url: "/api/tags",
    method: "DELETE",
    params: { ids }
  });
};
