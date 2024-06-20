import type { MenuProps } from "antd";
import { Menu } from "antd";

import { BarChartOutlined, HomeFilled, TagsOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const clickMenu: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const items: MenuItem[] = [
    {
      label: t("Side.StudyNote"),
      key: "/",
      icon: <HomeFilled />
    },
    {
      label: t("Side.DataManage"),
      key: "/data",
      icon: <BarChartOutlined />
    },

    {
      label: t("Side.TagManage"),
      key: "/tags",
      icon: <TagsOutlined />
    }
  ];
  return (
    <Menu
      mode="inline"
      items={items}
      theme="dark"
      onClick={clickMenu}
      defaultSelectedKeys={[location.pathname]}
    ></Menu>
  );
};

export default Sidebar;
