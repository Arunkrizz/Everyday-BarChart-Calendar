import React from 'react';
import { useSelector } from 'react-redux';
import { CalendarDays, BarChart3 } from 'lucide-react';

const StatsBar = () => {
  const { data } = useSelector(state => state.calendar);

  const totalDays = Object.keys(data).length;
  const totalUsers = Object.values(data).reduce((sum, dayData) => sum + dayData.length, 0);
  const totalActivity = Object.values(data).reduce((sum, dayData) => {
    return sum + dayData.reduce((daySum, item) => daySum + Object.values(item)[0], 0);
  }, 0);
  const avgActivity = Math.round(totalActivity / totalDays);

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-700">Active Days</h3>
        </div>
        <p className="text-2xl font-bold text-blue-600 mt-2">{totalDays}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-700">Total Users</h3>
        </div>
        <p className="text-2xl font-bold text-green-600 mt-2">{totalUsers}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-purple-600 rounded"></div>
          <h3 className="font-semibold text-gray-700">Total Activity</h3>
        </div>
        <p className="text-2xl font-bold text-purple-600 mt-2">{totalActivity}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-orange-600 rounded"></div>
          <h3 className="font-semibold text-gray-700">Avg/Day</h3>
        </div>
        <p className="text-2xl font-bold text-orange-600 mt-2">{avgActivity}</p>
      </div>
    </div>
  );
};

export default StatsBar;
