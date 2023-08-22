import HomeService from '@/services/home.service';
import { setHistory } from '@/redux/reducer/summarySlice';

export async function fetchData(dispatch) {
  const homeService = new HomeService();
  try {
    const Data = await homeService.getSummaryHistory();
    if (Data.status) {
      dispatch(setHistory(Data.data));
    } 
  } catch (error) {
    console.log(error);
  }
}
