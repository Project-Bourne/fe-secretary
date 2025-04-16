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
import Table from "@/components/ui/Table";
import { dummyHistoryData } from "@/utils/dummyData";
import NotificationService from "@/services/notification.service";
import { fetchData } from "@/hooks/FetchData";

function HistoryContent() {
  // Use dummy data for testing
  const { history } = useSelector((state: any) => {
    console.log("State: ", state);
    return state?.summary
  });
  const itemsPerPage = history?.itemsPerPage || 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
  const dispatch = useDispatch();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const homeService = new HomeService();

  console.log('Histories: ', history)

  const handlePageChange = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    try {
      dispatch(updatePagination({ currentPage: page }));
      const data = await homeService.getSummaryHistory(page);
      dispatch(setHistory(data?.data));
            // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // dispatch(setHistory(dummyHistoryData));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleBookMark = async (uuid) => {
    // e.stopPropagation();
    HomeService.bookMarkSummary(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{err?.message}. Please try again</p>, // Add a closing </p> tag
          position: "top-center",
        });
      });
  };

  const handleDelete = async (e, uuid) => {
    e.stopPropagation();
    HomeService.deleteSummary(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
        NotificationService.success({
          message: "success!",
          addedText: <p>{res?.message} History deleted</p>, // Add a closing </p> tag
          position: "top-center",
        });
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{err?.message} Please try again</p>, // Add a closing </p> tag
          position: "top-center",
        });
      });
  };

  // Transform history data to match Table component requirements
  const tableData = history?.summary?.map(item => ({
    uuid: item.uuid,
    title: item.summary?.title || 'No title',
    summary: (item.summary?.text) || 'No text',
    createdAt: item.createdAt,
    isBookmarked: item.bookmark,
    onBookmark: (uuid: string) => handleBookMark(uuid),
    onDelete: (uuid: string) => handleDelete(null, uuid)
  }));

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
        // <div className="bg-sirp-listBg border h-[100%] w-100full my-2 md:mx-5 mx-2 pt-5 pb-5 rounded-[1rem]">
          <Table
            data={tableData}
            totalItems={history.totalItems}
            page={currentPage - 1} // Table component uses 0-based pagination
            loading={loading}
            onPageChange={handlePageChange}
          />
        // </div>
      ) : (
        <NoHistory />
      )}

      {/* Legacy implementation - commented out for reference
      {history?.summary?.length > 0 ? (
        <>
          <HistoryTableHeader />
          {history?.summary?.map((item) => {
            return (
              <div key={item?.uuid}>
                <ListItem
                  uuid={item?.uuid}
                  summaryUuid={item?.summaryUuid}
                  title={item.summary?.title}
                  summary={item.summary?.summaryArray}
                  time={item?.createdAt}
                  isBookmarked={item?.bookmark}
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
      */}
    </>
  );
}

export default HistoryContent;
