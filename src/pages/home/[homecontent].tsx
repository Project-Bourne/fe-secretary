import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BreadCrum from '../../components/ui/Breadcrumbs';
import Min_and_Max_icon from './components/Min_Max_icon';
import ActionIcons from './components/actionIcons/ActionIcon';
import HomeService from '../../services/home.service';
import { setSummaryId, setSummaryContent } from "@/redux/reducer/summarySlice";
import { useDispatch, useSelector } from 'react-redux';

function HomeContent() { // Capitalized function name is recommended for components
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const { homecontent } = router.query;
  const dispatch = useDispatch();
  const { summaryContent, summaryId } = useSelector((state) => state.summary);

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  useEffect(() => {
    const homeService = new HomeService();

    homeService.getSummaryText(homecontent as string)
      .then((summary) => {
        if (summary.data) {
          const textSummary = summary.data.textSummary;
          const textsummaryId = summary.data.uuid;

          // Only dispatch if the summary IDs match
          if (textsummaryId === summaryId) {
            dispatch(setSummaryContent(textSummary));
          }

          // Always update the summary ID, regardless of matching or not
          dispatch(setSummaryId(textsummaryId));
        } else {
          dispatch(setSummaryContent(''));
          dispatch(setSummaryId(''));
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [homecontent, summaryId]);

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap px-5 py-5 ">
        <div className="">
          <Image
            src={require('../../assets/icons/arrow-narrow-left 1.svg')}
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
          <div className="pl-5 my-5">
            <p className="text-md text-gray-500">Title</p>
            <h1 className="md:text-3xl text-[14px]">
              Specific Conditions or Instruction
            </h1>
          </div>
        )}
        {hideMeta === false && (
          <h1 className="md:text-lg font-bold pl-5 pb-2">
            Specific Conditions or Instruction
          </h1>
        )}
      </div>
      <div className="my-10 mx-5">
        <div className='text-justify pr-10'>
          <p className="text-md text-gray-500 py-5">Content</p>
          {summaryContent ? (
            <p className="py-5 text-[14px]">{summaryContent}</p>
          ) : (
            <p className="py-5 text-center font-bold text-[1.5rem]">No available summary</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
