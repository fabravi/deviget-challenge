import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Picture } from "../../types/types";

export interface GalleryState {
  list: Picture[];
}

const initialState: GalleryState = {
  list: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Picture>) => {
      if (!state.list.find((picture) => picture.id === action.payload.id))
        state.list.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (picture) => picture.id !== action.payload
      );
    },
  },
});

export const selectGallery = (state: { gallery: GalleryState }) => {
  return state.gallery.list;
};

export const { add, remove } = gallerySlice.actions;

export default gallerySlice.reducer;
