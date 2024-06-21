/* eslint-disable react-hooks/exhaustive-deps */
import {
    getDataListAsync,
    setCurData,
    setPageInfo
  } from "@/store/modules/dataStore";
  import { useAppSelector, useAppDispatch } from "@/utils/hooks";
  import { PlusOutlined } from "@ant-design/icons";
  import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
  import type { TableProps } from "antd";
  import { useEffect } from "react";
  import dayjs from "dayjs";
  import DataModel from "./DataModel";
  import { setDataModelOpen } from "@/store/modules/openStore";
  import { getTagsListAsync } from "@/store/modules/tagsStore";
  import { useTranslation } from "react-i18next";
  import { delDataAPI } from "@/apis/dataApi";
  
  export interface DataType {
    id: string;
    name: string;
    description?: string;
    time: number;
    tags?: string[];
  }
  
  const DataTable = () => {
    const { t } = useTranslation();
  
    const { dataList, update, pageInfo, searchFormData } = useAppSelector(
      (state) => state.dataList
    );
    const { tagsList } = useAppSelector((state) => state.tags);
    const dispatch = useAppDispatch();
    //检测变更后更新数据
    useEffect(() => {
      dispatch(getDataListAsync({ ...searchFormData, ...pageInfo }));
      dispatch(getTagsListAsync());
    }, [dispatch, update]);
    //分页器的文字，用于统计总数
    const tableFooter = () => {
      return (
        <div style={{ textAlign: "right" }}>
          {t("Table.Total")}: {pageInfo.total} {"  " + t("Table.Items")}
        </div>
      );
    };
  
    const showModal = () => {
      dispatch(setDataModelOpen(true));
    };
    //点击添加按钮，传入数据显示model
    const addData = () => {
      dispatch(setCurData({ name: "", description: "", tags: [], id: "" }));
      showModal();
    };
    //点击编辑按钮，传入数据显示model
    const editData = (record: DataType) => {
      dispatch(setCurData(record));
      showModal();
    };
    //点击删除按钮并确认，调用API，更新数据
    const deleteData = async (id: string) => {
      await delDataAPI({ id });
      dispatch(getDataListAsync(searchFormData));
      dispatch(getTagsListAsync());
    };
    //变更页面容量的函数，会触发变更页面的函数
    const changePageSize = (pageSize: number, current: number) => {
      dispatch(setPageInfo({ ...pageInfo, pageSize, pageNo: current }));
      dispatch(
        getDataListAsync({ ...searchFormData, pageSize, pageNo: current })
      );
    };
    //变更页面的函数
    const changePage = (current: number, pageSize: number) => {
      dispatch(setPageInfo({ ...pageInfo, pageNo: current }));
      dispatch(
        getDataListAsync({ ...searchFormData, pageNo: current, pageSize })
      );
    };
    //编辑表格
    const columns: TableProps<DataType>["columns"] = [
      {
        title: t("Table.No"),
        width: "50px",
        render: (_text, _record, index) => {
          return `${(pageInfo.pageNo - 1) * pageInfo.pageSize + index + 1}`; //当前页数减1乘以每一页页数再加当前页序号+1
        }
      },
      {
        title: t("Form.Name"),
        dataIndex: "name",
        key: "id"
      },
      {
        title: t("Form.Description"),
        dataIndex: "description",
        key: "id",
        width: "32em",
        render: (text) => (
          <Tooltip
            title={text.length > 30 ? text : ""}
            overlayStyle={{ minWidth: "30em", whiteSpace: "pre-line" }}
            placement="topLeft"
          >
            <span>{text.length > 30 ? text.substring(0, 30) + "..." : text}</span>
          </Tooltip>
        )
      },
      {
        title: t("Form.Time"),
        dataIndex: "time",
        key: "id",
        width: "150px",
        render: (text) => {
          return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      {
        title: t("Form.Tags"),
        key: "id",
        dataIndex: "tags",
        render: (_, { tags }) => (
          <>
            {tags?.map((tag) => {
              const curTag = tagsList.filter((items) => {
                return items.id === tag;
              });
              let color;
              const name = curTag[0]?.name || "un";
              if (curTag[0]) {
                color = curTag[0].color;
              } else {
                color = null;
              }
              return (
                <Tag color={color || "blue"} key={tag}>
                  {name}
                </Tag>
              );
            })}
          </>
        )
      },
      {
        title: t("Table.Action"),
        key: "id",
        width: "150px",
        render: (_text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                editData(record);
              }}
            >
              {t("Table.Edit")}
            </a>
            <Popconfirm
              title={t("Table.DeleteConfirm")}
              onConfirm={() => {
                deleteData(record.id);
              }}
            >
              <a style={{ color: "red" }}>{t("Table.Delete")}</a>
            </Popconfirm>
          </Space>
        )
      }
    ];
    return (
      <div className="dataTable">
        <div className="addDataBtn">
          <Button
            type="primary"
            icon={<PlusOutlined></PlusOutlined>}
            onClick={addData}
            style={{ margin: "0px 20px" }}
          >
            {t("Table.AddData")}
          </Button>
          <DataModel></DataModel>
        </div>
        <Table
          rowKey={(record) => record.id}
          size="small"
          bordered
          style={{ margin: 10 }}
          columns={columns}
          dataSource={dataList}
          pagination={{
            showTotal: tableFooter,
            defaultPageSize: 8, //默认每页显示条数
            defaultCurrent: 1, //默认当前页数
            showQuickJumper: true, //显示快速跳转到指定页的输入框
            pageSizeOptions: [2, 5, 8, 10], //指定每页显示条数的选项
            showSizeChanger: true, // 显示改变每页显示条数的下拉菜单
            pageSize: pageInfo.pageSize,
            current: pageInfo.pageNo,
            total: pageInfo.total,
            onShowSizeChange: (current, pageSize) =>
              changePageSize(pageSize, current),
            onChange: (current, pageSize) => changePage(current, pageSize),
  
            locale: {
              items_per_page: "/" + t("Table.Page"), //每页显示条数文案
              jump_to: t("Table.Jump"), //跳转到指定页文案
              page: t("Table.Page") //页文案
            }
          }}
        />
      </div>
    );
  };
  
  export default DataTable;
  