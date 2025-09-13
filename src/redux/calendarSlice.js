import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../utils/initialCalendarData';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    data: initialCalendarData,
    selectedDate: null,
    showModal: false,
    loading: false,
    view: 'month'
  },
  reducers: {
    setSelectedDate: (state, action) => { state.selectedDate = action.payload; },
    setShowModal: (state, action) => { state.showModal = action.payload; },
    setView: (state, action) => { state.view = action.payload; },
    addData: (state, action) => {
      const { date, data } = action.payload;
      state.data[date] = data;
    },
    setLoading: (state, action) => { state.loading = action.payload; }
  }
});

export const { setSelectedDate, setShowModal, setView, addData, setLoading } = calendarSlice.actions;
export default calendarSlice.reducer;
