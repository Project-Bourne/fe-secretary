import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BreadCrum from '../../components/ui/Breadcrumbs';
import Min_and_Max_icon from './components/Min_Max_icon';
import ActionIcons from './components/actionIcons/ActionIcon';
import HomeService from '../../services/home.service';
import {
  setSummaryId,
  setSummaryContent,
  setSummaryTitle
} from '@/redux/reducer/summarySlice';
import { useDispatch, useSelector } from 'react-redux';

function HomeContent() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const { homecontent } = router.query;
  const dispatch = useDispatch();
  const { summaryContent, summaryId, summaryTitle, summaryLength } =
    useSelector(
      (state: any) => state.summary // Include summaryTitle in the state selector
    );

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  useEffect(() => {
    const homeService = new HomeService();

    homeService
      .getSummaryText(homecontent as string)
      .then(summary => {
        if (summary.data) {
          const textSummary = JSON.parse(summary.data.summaryArray);
          const textsummaryId = summary.data.uuid;
          const textsummaryTitle = summary.data.title;

          // Update the summary title in the Redux store

          if (textsummaryId === summaryId) {
            dispatch(setSummaryContent(textSummary));
            dispatch(setSummaryTitle(textsummaryTitle));
          }

          dispatch(setSummaryId(textsummaryId));
        } else {
          dispatch(setSummaryContent(''));
          dispatch(setSummaryId(''));
          dispatch(setSummaryTitle(''));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [homecontent, summaryId, dispatch]);

  const filteredSummaries =
    summaryContent &&
    summaryContent?.filter(
      item => item.numberOfSentence.toString() === summaryLength
    );
  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap px-5 py-5 ">
        <div>
          <Image
            src={require('../../assets/icons/arrow-narrow-left_1.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
            onClick={() => router.back()}
          />
          {/* User's name */}
          <h1 className="text-2xl">Peter Duru</h1>
        </div>
        {/* Action icons */}
        <ActionIcons />
      </div>
      {/* Breadcrumbs */}
      <BreadCrum />
      {/* Min and Max */}
      <div className="bg-white border my-10 mx-10 rounded-[1rem]">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta === true && (
          <div className="pl-5 my-5 ">
            <p className="text-md text-gray-500">Title</p>
            <h1 className="md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
              {summaryTitle ? summaryTitle : <h1> No available title</h1>}
            </h1>
          </div>
        )}
        {hideMeta === false && (
          <h1 className="md:text-lg font-bold pl-5 pb-2">
            {summaryTitle ? summaryTitle : <h1> No available title</h1>}
            {/* Use the extracted title value from Redux */}
          </h1>
        )}
      </div>
      <div className="my-10 mx-5">
        <div className="text-justify pr-10">
          {summaryContent ? (
            filteredSummaries.map((item, index) => (
              <p key={index} className="py-5 text-[14px]">
                <p className="text-md text-gray-500 py-5">Content</p>
                {item.summary}
              </p>
            ))
          ) : (
            <p className="py-5 text-center font-bold text-[1.5rem]">
              No available summary
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
