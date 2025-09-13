import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, BarChart3, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { setShowModal } from '../redux/calendarSlice';
import moment from 'moment';

const DataModal = () => {
  const dispatch = useDispatch();
  const { selectedDate, showModal } = useSelector(state => state.calendar);

  if (!showModal) return null;

  const getChartData = (data) => {
    if (!data) return [];
    return data.map(item => {
      const [user, value] = Object.entries(item)[0];
      return { user: user.replace('_', ' ').toUpperCase(), value };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Data Analytics
            </h3>
            <p className="text-gray-600 mt-1">
              {moment(selectedDate?.dateStr, 'DD-MM-YYYY').format('MMMM DD, YYYY')}
            </p>
          </div>
          <button
            onClick={() => dispatch(setShowModal(false))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {selectedDate?.data ? (
            <div>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-blue-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-blue-800">{selectedDate.data.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-purple-600 font-medium">Total Activity</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {selectedDate.data.reduce((sum, item) => sum + Object.values(item)[0], 0)}
                  </p>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData(selectedDate.data)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="user" stroke="#6b7280" fontSize={12} fontWeight={500}/>
                    <YAxis stroke="#6b7280" fontSize={12}/>
                    <Tooltip contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}/>
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]}/>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4"/>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">No Data Found</h4>
              <p className="text-gray-600">
                No data found for the selected date: {moment(selectedDate?.dateStr, 'DD-MM-YYYY').format('MMMM DD, YYYY')}
              </p>
              <button 
                onClick={() => dispatch(setShowModal(false))}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataModal;
