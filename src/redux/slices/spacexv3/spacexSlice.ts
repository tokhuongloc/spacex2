import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import spacexv3Api from '../../../apis/spacexv3';
import { RootState, AppDispatch } from '../../store';

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

export interface Pagination {
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  offset: number;
  limit: number;
}

export interface Spacex {
  list: SpacexCard[];
  searchTerm: string | null;
  filter: FilterObject;
  status: 'failure' | 'pending' | 'success' | null;
  error: string | null;
  pagination: Pagination;
}

export const fetchSpacexs = createAsyncThunk<
  SpacexCard[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('spacex/fetchSpacexs', async (_, { getState, dispatch }) => {
  const { searchTerm, filter, pagination } = getState().spacex;

  // check how to fetch bases on filter of spacex
  if (Object.keys(filter).length === 0) {
    if (!searchTerm) {
      const responeAllList = await spacexv3Api.get('/launches', {
        params: {
          offset: pagination.offset,
          limit: pagination.limit,
        },
      });
      dispatch(updatePagination(responeAllList.headers['spacex-api-count']));
      return responeAllList.data as SpacexCard[];
    }
    const responeSearchList = await spacexv3Api.get('/launches', {
      params: {
        rocket_name: searchTerm,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    dispatch(updatePagination(responeSearchList.headers['spacex-api-count']));
    return responeSearchList.data as SpacexCard[];
  } else {
    if (!searchTerm) {
      const responeFilterList = await spacexv3Api.get('/launches', {
        params: {
          start: filter.time?.start,
          end: filter.time?.end,
          launch_success: filter?.launchStatus,
          offset: pagination.offset,
          limit: pagination.limit,
        },
      });
      dispatch(updatePagination(responeFilterList.headers['spacex-api-count']));
      return responeFilterList.data as SpacexCard[];
    }
    const responeFilterList = await spacexv3Api.get('/launches', {
      params: {
        rocket_name: searchTerm,
        start: filter.time?.start,
        end: filter.time?.end,
        launch_success: filter?.launchStatus,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    dispatch(updatePagination(responeFilterList.headers['spacex-api-count']));
    return responeFilterList.data as SpacexCard[];
  }
});

const initialState: Spacex = {
  list: [],
  status: null,
  error: null,
  searchTerm: null,
  filter: {},
  pagination: {
    pageIndex: 0,
    totalPages: 0,
    totalItems: 0,
    limit: 16,
    offset: 0,
  },
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

    updatePagination(state, action) {
      const totalItems = Number(action.payload);
      const totalPages = Math.ceil(totalItems / state.pagination.limit);
      state.pagination = { ...state.pagination, totalItems, totalPages };
    },
    updatePaginationOffsetAndPageIndex(state, action) {
      const { pagination } = state;
      state.pagination.offset = action.payload * pagination.limit;
      state.pagination.pageIndex = action.payload;
    },
    resetPaginationOffsetAndPageIndex(state) {
      state.pagination = { ...state.pagination, pageIndex: 0, offset: 0 };
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
  updatePagination,
  updatePaginationOffsetAndPageIndex,
  resetPaginationOffsetAndPageIndex,
} = spacexSlice.actions;

export default spacexSlice.reducer;
