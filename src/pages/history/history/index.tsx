import HomeLayout from '@/layout/HomeLayout';
import { useRouter } from 'next/router';
import FileUpload from '../../home/components/FileUpload';
import TabLayout from './TabLayout';

function HomeHistory() {

  const route = useRouter().pathname;
  const showTitle = false;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='mt-[8rem] h-[100%] rounded-[1rem] bg-[#F9F9F9] mx-5'>
      <HomeLayout>
      </HomeLayout>

      <TabLayout/>
    </div>
  );
}

export default HomeHistory;
