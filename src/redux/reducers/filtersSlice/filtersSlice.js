import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [
        { label: 'Today', period: 'day' },
        { label: 'Week', period: 'week' },
    ],
    activeFilter: 'day',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { filterChanged } = actions;
