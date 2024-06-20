/* eslint-disable react-hooks/exhaustive-deps */
import { SettingOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";

import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getLangAsync, setLang } from "@/store/modules/langStore";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { postLangAPI } from "@/apis/langApi";
import classNames from "classnames";
const SettingBox = () => {
  const { t } = useTranslation(); //使用i18n

  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const [hide, setHide] = useState(true);

  //初始化语言
  const initLocale = async () => {
    await dispatch(getLangAsync());
  };
  //改变switch状态改变语言
  const changeLocale = async (chcekedValue: boolean) => {
    const checkedLanguage = chcekedValue ? "zh" : "en";
    await postLangAPI({ lang: checkedLanguage }).catch(() => {
      dispatch(setLang(checkedLanguage));
    });
    dispatch(getLangAsync());
  };

  useEffect(() => {
    initLocale();
  }, [dispatch]);

  return (
    <div className="settingBox">
      <Button
        type="text"
        icon={<SettingOutlined />}
        style={{
          background: "#001628",
          color: "white",
          display: "inline-block",
          alignSelf: "center"
        }}
        onClick={() => {
          setHide(!hide);
        }}
      >
        {t("Header.Setting")}
      </Button>
      <div className={classNames("switchBox", { hide })}>
        <Switch
          checkedChildren={t("Language.Chinese")}
          unCheckedChildren={t("Language.English")}
          style={{ margin: "10px", verticalAlign: "top" }}
          onChange={(checked) => {
            changeLocale(checked);
          }}
          defaultChecked
          checked={lang === "zh"}
        ></Switch>
      </div>
    </div>
  );
};

export default SettingBox;
