import React, { useState } from "react";
import DeleteIcon from "./deleteIcon";
import ListItem from "./HistoryListItem";
import NoHistory from "./NoHistroy";
import { useSelector, useDispatch } from "react-redux";
import HistoryTableHeader from "./HistoryTableHeader";
import { Pagination } from "@mui/material";
import { setHistory, updatePagination } from "@/redux/reducer/summarySlice";
import HomeService from "@/services/home.service";
import CustomModal from "@/components/ui/CustomModal";
import Loader from "./Loader";

function HistoryContent() {
  const { history } = useSelector((store: any) => store.summary);
  const itemsPerPage = history?.itemsPerPage || 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
  const dispatch = useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = async (event, page) => {
    setLoading(true);
    setCurrentPage(page);
    const homeService = new HomeService();
    try {
      dispatch(updatePagination({ currentPage: page }));
      const data = await homeService.getSummaryHistory(page);
      dispatch(setHistory(data?.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <CustomModal
          style="md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )}

      {history?.summary?.length > 0 ? (
        <>
          <HistoryTableHeader />
          {history?.summary?.map((item) => {
            return (
              <div key={item?.uuid}>
                <ListItem
                  uuid={item?.uuid}
                  summaryUuid={item?.summaryUuid}
                  title={item.summary?.title} // Pass the title
                  summary={item.summary?.summaryArray} // Pass the summary
                  time={item?.createdAt}
                  isBookmarked={item?.bookmark} // Pass the isArchived value
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item?.title} />}
                />
              </div>
            );
          })}
          <div className="me:w-[100%] m-5 flex justify-end items-center ">
            <Pagination
              count={Math.ceil(history.totalItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </div>
        </>
      ) : (
        <NoHistory />
      )}
    </>
  );
}

export default HistoryContent;
