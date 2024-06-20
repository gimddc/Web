    import { request } from "@/utils/request";

    export const dataResExample = {
    code: 200,
    msg: "查询成功",
    data: {
        pageInfo: {
        pageNo: 1,
        pageSize: 10,
        total: 3
        },
        dataInfo: [
        {
            id: "9f6e8bde-d492-4844-878e-1aba3d78a42d",
            name: "title2",
            description: " zhgiaoshu 3434",
            time: 1714458786724,
            tags: [
            "3a423d3b-1ba8-4fbf-b8a4-c542b262a2b7",
            "411012ad-9999-415c-bac7-699b6fe8ad2b"
            ]
        },
        {
            id: "468c1787-c568-4cd3-b6f7-dc1d5c207844",
            name: "title1",
            description: " zhge shi miaoshu",
            time: 1714386375644,
            tags: ["3a423d3b-1ba8-4fbf-b8a4-c542b262a2b7"]
        },
        {
            id: "c8828074-a951-47a5-9ed9-c4b964781744",
            name: "title1",
            description: " zhge shi miaoshu",
            time: 1714386288151,
            tags: []
        }
        ]
    }
    };

    export const dataListExample = [
    {
        id: "c8828074-a951-47a5-9ed9-c4b964781744",
        name: "title1",
        description: " zhge shi miaoshu",
        time: 1714386288151,
        tags: []
    },
    {
        id: "468c1787-c568-4cd3-b6f7-dc1d5c207844",
        name: "title1",
        description: " zhge shi miaoshu",
        time: 1714386375644,
        tags: ["3a423d3b-1ba8-4fbf-b8a4-c542b262a2b7"]
    },
    {
        id: "9f6e8bde-d492-4844-878e-1aba3d78a42d",
        name: "title2",
        description: " zhgiaoshu 3434",
        time: 1714458786724,
        tags: [
        "3a423d3b-1ba8-4fbf-b8a4-c542b262a2b7",
        "411012ad-9999-415c-bac7-699b6fe8ad2b"
        ]
    }
    ];

    export type dataListType = typeof dataListExample;
    type dataResType = typeof dataResExample;

    /**
     * @description: 获取数据
     * @params {
     * pageSize?: number;//页面容量
     * pageNo?: number;//第几页
     * name?: string;//名称
     * tags?: string[];//标签
     * time?: number[];//时间数组
     * }
     * @return {*}
     */
    export const getDataAPI = ({
    pageSize,
    pageNo,
    name,
    tags,
    time
    }: {
    pageSize?: number;
    pageNo?: number;
    name?: string;
    tags?: string[];
    time?: number[];
    }): Promise<dataResType> => {
    const startTime = time ? time[0] : 0;
    const endTime = time ? time[1] : new Date("2038-01-19 11:14:07").getTime();
    return request({
        url: "/api/data",
        method: "GET",
        params: {
        pageSize,
        pageNo,
        name,
        tags,
        startTime,
        endTime
        }
    });
    };

    /**
     * @description: 添加数据
     * @params {
     * name: string;//名称
     description?: string;//描述
    tags?: string[];//标签数组
    * }
    * @return {*}
    */
    export const postDataAPI = ({
    name,
    description,
    tags
    }: {
    name: string;
    description?: string;
    tags?: string[];
    }): Promise<dataResType> => {
    return request({
        url: "/api/data",
        method: "POST",
        data: {
        name,
        description,
        tags
        }
    });
    };

    /**
     * @description: 编辑数据
     * @params {
     * id: string;//数据id
     * name: string;//名称
     * description?: string;//描述
     * tags?: string[];//标签数组
     * }
     * @return {*}
     */
    export const editDataAPI = ({
    id,
    name,
    description,
    tags
    }: {
    id: string;
    name: string;
    description?: string;
    tags?: string[];
    }): Promise<dataResType> => {
    return request({
        url: "/api/data",
        method: "PUT",
        data: {
        id,
        name,
        description,
        tags
        }
    });
    };
    /**
     * @description: 删除数据
     * @params {
     * id: string;//数据id
     * }
     * @return {*}
     */
    export const delDataAPI = ({ id }: { id: string }): Promise<dataResType> => {
    return request({
        url: "/api/data",
        method: "DELETE",
        params: {
        id
        }
    });
    };
