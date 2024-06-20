import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { ConfigProviderProps, message } from "antd";
import { getLangAPI, postLangAPI } from "@/apis/langApi";
import dayjs from "dayjs";
import i18n from "@/i18n";

type Locale = ConfigProviderProps["locale"];
const initialState: { locale: Locale; lang: string } = {
  locale: zhCN,
  lang: "zh"
};

const getLangAsync = createAsyncThunk("locale/getLangAPI", async () => {
  const res = await getLangAPI();
  return res.data;
});

const setLangListAsync = createAsyncThunk(
  "locale/postLangAPI",
  async (params: { lang: string }) => {
    const res = await postLangAPI(params);

    return res.data;
  }
);
const langStore = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLocale(state, action) {
      if (action.payload) {
        state.locale = zhCN;
      } else {
        state.locale = enUS;
      }
    },
    setLang(state, action) {
      state.lang = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLangAsync.fulfilled, (state, action) => {
      state.lang = action.payload;
      if (state.lang === "zh") {
        dayjs.locale("zh-cn");
        state.locale = zhCN;
      } else {
        dayjs.locale("en");
        state.locale = enUS;
      }
      i18n.changeLanguage(state.lang);
    });
    builder.addCase(getLangAsync.rejected, (state) => {
      message.error("获取数据失败，请连接到服务器");
      if (state.lang === "zh") {
        dayjs.locale("zh-cn");
        state.locale = zhCN;
      } else {
        dayjs.locale("en");
        state.locale = enUS;
      }
      i18n.changeLanguage(state.lang);
    });
    builder.addCase(setLangListAsync.fulfilled, (state, action) => {
      state.lang = action.payload;
    });
  }
});
const { setLocale, setLang } = langStore.actions;
const localeReducer = langStore.reducer;

export { setLocale, getLangAsync, setLangListAsync, setLang };
export default localeReducer;
