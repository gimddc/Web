import { setDataModelOpen } from "@/store/modules/openStore";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Form, FormProps, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

import SelectFormInput from "./SelectFormInput";
import { useTranslation } from "react-i18next";
import { editDataAPI, postDataAPI } from "@/apis/dataApi";
import { changeUpdate, getDataListAsync } from "@/store/modules/dataStore";

type dataFieldType = {
  name: string;
  description?: string;
  tags?: string[];
};
const DataModel = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { dataModelOpen } = useAppSelector((state) => state.open);
  const { curData, update, searchFormData, pageInfo } = useAppSelector(
    (state) => state.dataList
  );
  const { tagsList } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish: FormProps<dataFieldType>["onFinish"] = async (
    dataFieldsValue
  ) => {
    //判断当前传入model的data数据是否有id，有则为修改数据，否则为添加数据
    if (curData.id) {
      const editDataValue = { ...dataFieldsValue, id: curData.id };
      //发送修改后的数据，成功则更新数据列表、关闭model以及重置model里的表单，否则提示错误信息
      await editDataAPI(editDataValue)
        .then(async () => {
          await dispatch(
            getDataListAsync({ ...searchFormData, ...pageInfo })
          ).then(() => {
            form.resetFields();
          });
          dispatch(setDataModelOpen(false));
          dispatch(changeUpdate(!update));
        })
        .catch((error) => {
          message.error(error.response.data.msg);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      //发送要添加的数据，成功则更新数据列表、关闭model以及重置model里的表单，否则提示错误信息
      await postDataAPI(dataFieldsValue)
        .then(async () => {
          await dispatch(
            getDataListAsync({ ...searchFormData, ...pageInfo })
          ).then(() => {
            form.resetFields();
          });
          dispatch(setDataModelOpen(false));
          dispatch(changeUpdate(!update));
        })
        .catch((error) => {
          message.error(error.response.data.msg);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };

  const onFinishFailed: FormProps<dataFieldType>["onFinishFailed"] = () => {
    setConfirmLoading(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    //提交表单
    form.submit();
  };

  const handleCancel = () => {
    dispatch(setDataModelOpen(false));
    form.resetFields();
  };
  useEffect(() => {
    form?.setFieldsValue(curData);
  }, [curData, form, tagsList]);
  return (
    <Modal
      title={t("Form.AddDataRecord")}
      open={dataModelOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      forceRender
    >
      <Form
        name="dataForm"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        style={{ marginRight: "60px", marginLeft: 0 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t("Form.Name")}
          name="name"
          rules={[{ required: true, message: t("Form.Rule.Name") }]}
        >
          <Input maxLength={20} showCount placeholder={t("Placehold.Name")} />
        </Form.Item>
        <Form.Item
          label={t("Form.Description")}
          name="description"
          rules={[{ required: true, message: t("Form.Rule.Description") }]}
        >
          <TextArea
            maxLength={50}
            showCount
            placeholder={t("Placehold.Description")}
          />
        </Form.Item>
        <SelectFormInput></SelectFormInput>
      </Form>
    </Modal>
  );
};

export default DataModel;
