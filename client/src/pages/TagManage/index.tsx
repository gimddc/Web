import { delTagsAPI } from "@/apis/tagsApi";
import TagsModel from "@/components/TagsModel";

import { setTagModelOpen } from "@/store/modules/openStore";
import { getTagsListAsync, setCurTag } from "@/store/modules/tagsStore";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TagType {
  id: string;
  name: string;
  color?: string;
}

const TagManage = () => {
  const { t } = useTranslation();

  const { tagsList, update } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTagsListAsync());
  }, [dispatch, update]);

  const showTagModal = () => {
    dispatch(setTagModelOpen(true));
  };
  //点击添加按钮，传入数据显示model
  const addTag = () => {
    dispatch(setCurTag({ id: "", color: "blue", name: "" }));
    showTagModal();
  };
  //点击编辑按钮，传入数据显示model
  const editTag = (record: TagType) => {
    if (record.color) {
      dispatch(setCurTag(record));
    } else {
      dispatch(setCurTag({ ...record, color: "blue" }));
    }

    showTagModal();
  };

  //批量选中标签
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //选中标签后触发函数
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //点击删除按钮并确认后触发，调用API,失败后提示，成功则更新数据
  const deleteTags = async (ids: string[]) => {
    await delTagsAPI({ ids }).catch((error) => {
      message.error(error.response.data.msg);
    });

    dispatch(getTagsListAsync());
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const columns: TableProps<TagType>["columns"] = [
    {
      title: t("Form.Tags"),
      key: "id",
      dataIndex: "id",
      render: (_, { name, color, id }) => (
        <>
          <Tag color={color || "blue"} key={id}>
            {name}
          </Tag>
        </>
      )
    },
    {
      title: t("Table.Action"),
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              editTag(record);
            }}
          >
            {t("Table.Edit")}
          </a>
          <Popconfirm
            title={t("Table.DeleteConfirm")}
            onConfirm={() => {
              deleteTags([record.id]);
              setSelectedRowKeys(
                selectedRowKeys.filter((key) => String(key) !== record.id)
              );
            }}
          >
            <a style={{ color: "red" }}>{t("Table.Delete")}</a>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return (
    <div className="tagManage">
      <div className="tagBtnBox">
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={addTag}>
            {t("TagManage.AddTag")}
          </Button>
          <TagsModel></TagsModel>

          <Popconfirm
            title={t("Table.DeleteConfirm")}
            onConfirm={() => {
              deleteTags(selectedRowKeys.map((key) => String(key)));
              setSelectedRowKeys([]);
            }}
            placement="bottom"
          >
            <Button
              type="primary"
              danger
              icon={<MinusOutlined />}
              disabled={selectedRowKeys.length === 0}
            >
              {t("TagManage.DelTag")}
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <Table
        size="small"
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        bordered
        columns={columns}
        dataSource={tagsList}
        style={{ margin: 10 }}
      />
    </div>
  );
};

export default TagManage;
