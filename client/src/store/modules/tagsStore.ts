import { getTagsAPI, tagsListType } from "@/apis/tagsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TagType = { id: string; name: string; color: string };
const initialState: {
  tagsList: tagsListType;
  curTag: Partial<TagType>;
  update: boolean;
} = {
  tagsList: [],
  curTag: {},
  update: false
};

const getTagsListAsync = createAsyncThunk("tags/getTagsAPI", async () => {
  const res = await getTagsAPI();

  return res.data;
});
const tagsStore = createSlice({
  name: "tags",
  initialState,
  reducers: {
    getTagsList(state) {
      state.tagsList = [];
    },
    setCurTag(state, action) {
      state.curTag = action.payload;
    },
    changeTagUpdate(state, action) {
      state.update = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTagsListAsync.fulfilled, (state, action) => {
      state.tagsList = action.payload;
    });
  }
});

const { getTagsList, setCurTag, changeTagUpdate } = tagsStore.actions;
const tagsReducer = tagsStore.reducer;

export { getTagsList, setCurTag, changeTagUpdate, getTagsListAsync };
export default tagsReducer;
