import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DonutChart from '../components/Charts/DonutChart';
import LineChart from '../components/Charts/LineChart';
import StackedBarChart from '../components/Charts/StackedBarChart';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <DonutChart />
        <LineChart />
        <StackedBarChart />
      </div>
    </>
  );
};

export default Chart;
