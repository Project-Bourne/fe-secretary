import React, { useEffect, useState } from 'react';
import HistroyContent from './HistroyContent';
import HomeService from '@/services/home.service';
import { useDispatch } from 'react-redux';
import { setHistory } from '@/redux/reducer/summarySlice';

interface SummaryData {
  createdAt: any; // Assuming createdAt is of type string
  // Add other properties if necessary
}

function Histroy() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const homeService = new HomeService();
    homeService.getSummaryHistory()
    .then((res) => {
      const sortedData = res.data.sort((a: SummaryData, b: SummaryData) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
     
      });
      setData(sortedData);
      dispatch(setHistory(sortedData));
    })
    .catch((err) => {
      console.log(err);
    });
  },);

  // console.log(data, 'data');

  return (
    <div className="bg-sirp-listBg border h-[100%] w-[100vw] my-4 md:mx-10 mx-2 pt-5 rounded-[1rem]">
      <HistroyContent data={data} />
    </div>
  );
}

export default Histroy;
