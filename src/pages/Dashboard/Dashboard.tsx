import React from 'react';
import LineChart from '../../components/Charts/LineChart';
import DonutChart from '../../components/Charts/DonutChart';
import StackedBarChart from '../../components/Charts/StackedBarChart';
import TableOne from '../../components/Tables/TableOne';
import TotalDisplays from './components/TotalDisplays';
import ChatCard from '../../components/Chat/ChatCard'

const Dashboard: React.FC = () => {

  return (
    <>
      <TotalDisplays />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <LineChart />
        <StackedBarChart />
        <DonutChart />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
      
    </>
  );
};

export default Dashboard;
