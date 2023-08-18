import React, { useEffect, useState } from 'react';
import HomeService from '@/services/home.service';
import { useDispatch } from 'react-redux';
import { setHistory } from '@/redux/reducer/summarySlice';
import HistoryContent from './HistroyContent';

function Histroy() {
  const [historyData, setHistoryData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const homeService = new HomeService();

    async function fetchData() {
      try {
        const Data = await homeService.getSummaryHistory();
        if (Data.status) {
          setHistoryData(Data.data);
          dispatch(setHistory(Data.data)); // Dispatch the data to Redux store if needed
        } else {
          // Handle the case where Data.status is falsy
          console.log('No data available.');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  },);

  return (
    <div className="bg-sirp-listBg border h-[100%] w-100full my-2 md:mx-5 mx-2 pt-5 pb-5 rounded-[1rem]">
      <HistoryContent data={historyData} />
    </div>
  );
}

export default Histroy;
