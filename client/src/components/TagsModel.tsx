import { editTagsAPI, postTagsAPI } from "@/apis/tagsApi";
import { setTagModelOpen } from "@/store/modules/openStore";
import { changeTagUpdate, getTagsListAsync } from "@/store/modules/tagsStore";

import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import { Form, FormProps, Input, Modal, Select, message } from "antd";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
type tagFieldType = {
  name: string;
  color: string;
};
const TagsModel = () => {
  const { t } = useTranslation();
  const [tagForm] = Form.useForm();

  const { tagModelOpen } = useAppSelector((state) => state.open);
  const { curTag, update } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const colorOptinos = [
    { label: t("Color.Blue"), value: "blue", color: "blue" },
    { label: t("Color.Green"), value: "green", color: "green" },
    { label: t("Color.Red"), value: "red", color: "red" }
  ];

  const onFinish: FormProps<tagFieldType>["onFinish"] = async (
    tagFieldValues
  ) => {
    if (curTag.id) {
      const editTagValue = { ...tagFieldValues, id: curTag.id };
      await editTagsAPI(editTagValue)
        .then(async () => {
          await dispatch(getTagsListAsync()).then(() => {
            tagForm.resetFields();
          });
          dispatch(setTagModelOpen(false));
          dispatch(changeTagUpdate(!update));
        })
        .catch((error) => {
          message.error(error.response.data.msg);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      await postTagsAPI(tagFieldValues)
        .then(async () => {
          await dispatch(getTagsListAsync()).then(() => {
            tagForm.resetFields();
          });
          dispatch(setTagModelOpen(false));
          dispatch(changeTagUpdate(!update));
        })
        .catch((error) => {
          message.error(error.response.data.msg);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };
  const onFinishFailed: FormProps<tagFieldType>["onFinishFailed"] = () => {
    setConfirmLoading(false);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    tagForm.submit();
  };

  const handleCancel = () => {
    dispatch(setTagModelOpen(false));
    tagForm.resetFields();
  };

  useEffect(() => {
    tagForm.setFieldsValue(curTag);
  }, [tagForm, curTag]);
  return (
    <Modal
      title={t("Form.AddTagRecord")}
      open={tagModelOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      forceRender
    >
      <Form
        name="tagName"
        form={tagForm}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("Form.Tags")}
          name="name"
          rules={[{ required: true, message: t("Form.Rule.Tags") }]}
        >
          <Input placeholder={t("Placehold.Tags")} />
        </Form.Item>
        <Form.Item label={t("Form.Color")} name="color">
          <Select popupClassName="colorSelect" options={colorOptinos}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TagsModel;
