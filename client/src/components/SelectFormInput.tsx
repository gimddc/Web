import { useAppSelector } from "@/utils/hooks";

import { Form, Select, Tag } from "antd";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "antd";

type TagRender = SelectProps["tagRender"];

const SelectFormInput = () => {
  const { t } = useTranslation();
  const { tagsList } = useAppSelector((state) => state.tags);
  const options = tagsList;
  //将便签id渲染为标签
  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = tagsList.find((item) => {
      return item.id === value;
    })?.color;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color || "blue"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <Form.Item label={t("Form.Tags")} name="tags">
      <Select
        mode="multiple"
        options={options.map((item) => ({
          label: item.name,
          value: item.id
        }))}
        tagRender={tagRender}
        style={{ minWidth: "200px", textAlign: "left" }}
        placeholder={t("Placehold.Tags")}
      ></Select>
    </Form.Item>
  );
};

export default SelectFormInput;
