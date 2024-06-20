import { getDataAPI } from "@/apis/dataApi";
import type { dataListType } from "@/apis/dataApi";
import { DataType } from "@/components/DataTable";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const getDataListAsync = createAsyncThunk(
  "data/getDataAPI",
  async (params: {
    pageSize?: number;
    pageNo?: number;
    name?: string;
    tags?: string[];
    time?: number[];
  }) => {
    const res = await getDataAPI(params);

    return res.data;
  }
);
type searchFromDataType = {
  time: number[];
  name?: string | undefined;
  tags?: string[] | undefined;
};
const pageInfoExample = {
  pageNo: 1,
  pageSize: 8,
  total: 0
};
type pageInfoType = typeof pageInfoExample;
const initialState: {
  dataList: dataListType;
  curData: Partial<DataType>;
  searchFormData: searchFromDataType;
  update: boolean;
  pageInfo: pageInfoType;
} = {
  dataList: [],
  curData: {},
  searchFormData: { time: [0, new Date("2038-01-19 11:14:07").getTime()] },
  update: false,
  pageInfo: pageInfoExample
};

const dataStore = createSlice({
  name: "data",
  initialState,
  reducers: {
    getDataList(state, action) {
      state.dataList = action.payload;
    },
    setCurData(state, action) {
      state.curData = action.payload;
    },
    setSearchFromData(state, action) {
      state.searchFormData = action.payload;
    },
    changeUpdate(state, action) {
      state.update = action.payload;
    },
    setPageInfo(state, action) {
      state.pageInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDataListAsync.fulfilled, (state, action) => {
      state.dataList = action.payload.dataInfo;
      state.pageInfo = action.payload.pageInfo;
    });
    builder.addCase(getDataListAsync.rejected, (_state, action) => {
      message.error(action.error.message);
    });
  }
});
const {
  getDataList,
  setCurData,
  setSearchFromData,
  changeUpdate,
  setPageInfo
} = dataStore.actions;
const dataReducer = dataStore.reducer;

export {
  getDataList,
  getDataListAsync,
  setCurData,
  setSearchFromData,
  changeUpdate,
  setPageInfo
};
export default dataReducer;
