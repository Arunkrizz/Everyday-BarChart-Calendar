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
    setLoading: (state, action) => { state.loading = action.payload; }
  }
});

export const { setSelectedDate, setShowModal, setView, setLoading } = calendarSlice.actions;
export default calendarSlice.reducer;
