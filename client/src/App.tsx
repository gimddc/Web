import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

import { ConfigProvider, Layout } from "antd";

import { useState } from "react";

import SettingBox from "./components/SettingBox";
import { useAppSelector } from "./utils/hooks";
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
  color: "white",
  height: 80,
  paddingInline: 48,
  lineHeight: "80px",
  fontWeight: "400",
  fontSize: "28px",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#001628"
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#001628"
};

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
  color: "#fff"
};

const layoutStyle = {
  overflow: "hidden",
  width: "calc(100% - 8px)",
  maxWidth: "calc(100% - 8px)",
  height: "calc(100% - 8px)"
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { locale } = useAppSelector((state) => state.lang);
  const { t } = useTranslation();

  return (
    <>
      <ConfigProvider locale={locale}>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            {t("Title.System")}
            <SettingBox></SettingBox>
          </Header>
          <Layout>
            <Sider
              width="200px"
              style={siderStyle}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Sidebar></Sidebar>
            </Sider>
            <Content style={contentStyle}>
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default App;
