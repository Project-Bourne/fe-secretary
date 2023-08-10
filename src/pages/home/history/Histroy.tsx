import React, { useState } from 'react';
import HistroyContent from './HistroyContent';
import dummy from '../../../utils/dummy.json';

function Histroy() {
  const [data, setData] = useState(dummy);

  return (
    <div className="bg-sirp-listBg border h-[100%] w-[100vw] my-4 md:mx-10 mx-2 pt-5 rounded-[1rem]">
      <HistroyContent data={data} />
    </div>
  );
}

export default Histroy;
