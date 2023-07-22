import HomeLayout from '@/layout/HomeLayout';
import SettingsLayout from '@/layout/SettingsLayout';
import { HomeSubData } from '@/utils/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';
import History from './Histroy';

function HomeHistory() {

  const route = useRouter().pathname;
  const showTitle = false;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='mt-[8rem] h-[100%] rounded-[1rem] bg-[#F9F9F9] mx-5'>
      <HomeLayout>
        <h1 className='text-2xl pl-10 pt-5 font-bold'>Add Content</h1>
        <FileUpload />
      </HomeLayout>

      <SettingsLayout showTitle={showTitle} data={HomeSubData}>
          <History />
      
      </SettingsLayout>
    </div>
  );
}

export default HomeHistory;
