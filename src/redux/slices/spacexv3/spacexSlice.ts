import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import spacexv3Api from '../../../apis/spacexv3';
import { RootState } from '../../store';

export interface SpacexCard {
  mission_name: string;
  links: { mission_patch_small: string };
  rocket: { rocket_name: string };
  launch_success: boolean;
}

export interface FilterObject {
  time?: { start: string; end: string } | undefined;
  launchStatus?: boolean | undefined;
}

export interface Spacex {
  list: SpacexCard[];
  searchTerm: string | null;
  filter: FilterObject;
  status: 'failure' | 'pending' | 'success' | null;
  error: string | null;
  page: number;
}

export const fetchSpacexs = createAsyncThunk<
  SpacexCard[],
  void,
  { state: RootState }
>('spacex/fetchSpacexs', async (_, { getState }) => {
  const { searchTerm, filter } = getState().spacex;

  // check how to fetch bases on filter of spacex
  if (Object.keys(filter).length === 0) {
    if (!searchTerm) {
      const responeAllList = await spacexv3Api.get('/launches');
      return responeAllList.data as SpacexCard[];
    }
    const responeSearchList = await spacexv3Api.get('/launches', {
      params: { rocket_name: searchTerm },
    });
    return responeSearchList.data as SpacexCard[];
  } else {
    if (!searchTerm) {
      const responeFilterList = await spacexv3Api.get('/launches', {
        params: {
          start: filter.time?.start,
          end: filter.time?.end,
          launch_success: filter?.launchStatus,
        },
      });
      return responeFilterList.data as SpacexCard[];
    }
    const responeFilterList = await spacexv3Api.get('/launches', {
      params: {
        rocket_name: searchTerm,
        start: filter.time?.start,
        end: filter.time?.end,
        launch_success: filter?.launchStatus,
      },
    });
    return responeFilterList.data as SpacexCard[];
  }
});

const initialState: Spacex = {
  list: [],
  status: null,
  error: null,
  searchTerm: null,
  filter: {},
  page: 0,
};

export const spacexSlice = createSlice({
  name: 'spacex',
  initialState,
  reducers: {
    updateSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    updateFilterTime(state, action: PayloadAction<FilterObject>) {
      if (action.payload.time === undefined) {
        delete state.filter['time'];
      }
      state.filter = { ...state.filter, ...action.payload };
    },
    updateFilterLaunchStatus(state, action: PayloadAction<FilterObject>) {
      if (action.payload.launchStatus === undefined) {
        delete state.filter['launchStatus'];
      }
      state.filter = { ...state.filter, ...action.payload };
    },
    updatePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpacexs.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchSpacexs.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchSpacexs.rejected, (state) => {
      state.status = 'failure';
      state.error = 'Something went wrong...';
    });
  },
});

export const {
  updateSearchTerm,
  updateFilterTime,
  updateFilterLaunchStatus,
  updatePage,
} = spacexSlice.actions;

export default spacexSlice.reducer;
