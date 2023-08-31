import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BreadCrum from '../../components/ui/Breadcrumbs';
import Min_and_Max_icon from './components/Min_Max_icon';
import ActionIcons from './components/actionIcons/ActionIcon';
import HomeService from '../../services/home.service';
import {
  setSummaryContent,
  setSummaryTitle,
  setShowLoader,
  setSummarizeSetting
} from '@/redux/reducer/summarySlice';
import { useDispatch, useSelector } from 'react-redux';

function HomeContent() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const { homecontent } = router.query;
  const dispatch = useDispatch();
  const { summaryContent, summaryTitle } = useSelector(
    (store:any) => store.summary
  );

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  useEffect(() => {
    dispatch(setShowLoader(false))
    dispatch(setSummarizeSetting(false)); // Open summarize setting modal
    async function fetchSummary() {
      const homeService = new HomeService();
      try {
        const response = await homeService.getSummaryText(homecontent as string);
        if (response.status) {
          const { title, summaryArray } = response.data;
          dispatch(setSummaryTitle(title));
          dispatch(setSummaryContent(summaryArray[0]?.summary));
        } else {
          dispatch(setSummaryTitle(''));
          dispatch(setSummaryContent(''));
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchSummary();
  }, [homecontent, dispatch]);

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap px-5 py-5 ">
        <div>
          <Image
            src={require('../../../public/icons/arrow-narrow-left_1.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
            onClick={() => router.back()}
          />
          <h1 className="text-2xl">Peter Duru</h1>
        </div>
        <ActionIcons />
      </div>
      <BreadCrum />
      <div className="bg-white border my-10 mx-10 rounded-[1rem]">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta ? (
          <div className="pl-5 my-5">
            <p className="text-md text-gray-500">Title</p>
            <h1 className="md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
              {summaryTitle || <h1> No available title</h1>}
            </h1>
          </div>
        ) : (
          <h1 className="md:text-lg font-bold pl-5 pb-2">
            {summaryTitle || <h1> No available title</h1>}
          </h1>
        )}
      </div>
      <div className="my-10 mx-5">
        <div className="text-justify pr-10">
          <p className="py-5 text-[14px]">
            <p className="text-md text-gray-500 py-5">Content</p>
            {summaryContent ? (
              summaryContent.split('\n').map((paragraph, index) => (
                <p key={index} className='py-1 text-[1rem] leading-8'>{paragraph}</p>
              ))
            ) : (
              <p className="py-20 text-center font-bold text-[1.5rem]">
                No available summary
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
