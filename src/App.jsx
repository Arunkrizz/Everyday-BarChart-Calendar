import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const CalendarDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Interactive calendar with data visualization 
          </p>
        </div>


      </div>


    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <CalendarDashboard />
  </Provider>
);

export default App;
