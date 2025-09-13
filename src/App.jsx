import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import StatsBar from './components/StatsBar';
import CalendarComponent from './components/CalendarComponent';
import { CalendarDays, BarChart3 } from 'lucide-react';

const CalendarDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar Dashboard
            </h1>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Interactive calendar with data visualization 
          </p>
        </div>

        {/* Stats Bar */}
        <StatsBar />

        {/* Calendar */}
        <CalendarComponent />

      </div>

      <style jsx>{`
        .custom-calendar { font-family: inherit; }
        .rbc-event { padding: 4px 8px !important; }
        .rbc-month-view { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .rbc-header { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-weight: 600; color: #374151; padding: 12px 8px; border-bottom: 2px solid #e5e7eb; }
        .rbc-today { background-color: #fef3c7 !important; }
        .rbc-off-range-bg { background-color: #f9fafb; }
        .rbc-date-cell { padding: 8px; }
        .rbc-button-link { font-weight: 500; }
      `}</style>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <CalendarDashboard />
  </Provider>
);

export default App;
