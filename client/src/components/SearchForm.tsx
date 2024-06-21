/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Form, Input, Space, message } from "antd";
import type { FormProps } from "antd";

import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getDataListAsync, setSearchFromData } from "@/store/modules/dataStore";
import SelectFormInput from "./SelectFormInput";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

type FieldType = {
  name?: string;
  tags?: string[];
  time?: any;
};

const formStyle: React.CSSProperties = {
  maxWidth: "none",
  padding: 12
};

const rangeConfig = {
  rules: [{ type: "array" as const }]
};
const SearchForm = () => {
  const { t } = useTranslation();
  const [searchForm] = Form.useForm();
  const [messageApi] = message.useMessage();

  const { pageInfo } = useAppSelector((state) => state.dataList);
  const dispatch = useAppDispatch();

  //点击搜索按钮提交表单
  const onSearchFinish: FormProps<FieldType>["onFinish"] = (fieldsValue) => {
    const rangeTimeValue = fieldsValue["time"];
    const values = {
      ...fieldsValue,
      time: [
        rangeTimeValue
          ? rangeTimeValue[0]
            ? new Date(
                rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss")
              ).getTime()
            : 0
          : 0,

        rangeTimeValue
          ? rangeTimeValue[1]
            ? new Date(
                rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")
              ).getTime()
            : new Date("2038-01-19 11:14:07").getTime()
          : new Date("2038-01-19 11:14:07").getTime()
      ]
    };

    dispatch(setSearchFromData(values));
    dispatch(getDataListAsync({ ...values, ...pageInfo, pageNo: 1 })).catch(
      () => {
        messageApi.open({
          type: "error",
          content: "This is an error message"
        });
      }
    );
  };

  const onSearchFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="searchForm">
      <Form
        form={searchForm}
        style={formStyle}
        onFinish={onSearchFinish}
        onFinishFailed={onSearchFinishFailed}
      >
        <Flex gap="middle" align="start" justify="space-between">
          <Form.Item label={t("Form.Name")} name="name">
            <Input
              maxLength={20}
              showCount
              placeholder={t("Placehold.Search")}
            />
          </Form.Item>
          <SelectFormInput></SelectFormInput>
          <Form.Item label={t("Form.Time")} name="time" {...rangeConfig}>
            <RangePicker
              showTime
              allowEmpty={[true, true]}
              format="YYYY-MM-DD HH:mm:ss"
              onCalendarChange={(date) => {
                searchForm.setFieldValue("time", date);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Space size={"large"}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
              >
                {t("Search")}
              </Button>
              <Button
                type="primary"
                icon={<RedoOutlined />}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black"
                }}
                onClick={() => {
                  searchForm.resetFields();
                }}
              >
                {t("Form.Reset")}
              </Button>
            </Space>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default SearchForm;
