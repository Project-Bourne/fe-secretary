import React, { useState } from "react";
import DeleteIcon from "./deleteIcon";
import ListItem from "./BookMarkListItem";
import NoBookMark from "./NoBookMark";
import { useSelector, useDispatch } from "react-redux";
import HistoryTableHeader from "../history/HistoryTableHeader";
import Table from "@/components/ui/Table";
import HomeService from "@/services/home.service";
import { setHistory } from "@/redux/reducer/summarySlice";
import { dummyBookmarkData } from "@/utils/dummyData";
import NotificationService from "@/services/notification.service";
import { fetchData } from "@/hooks/FetchData";

function BookMarkContent() {
  // Use dummy data for testing
  const { bookMark } = useSelector((state: any) => state.summary);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const homeService = new HomeService();

  /**
   * Bookmarks a summary item
   * @param {React.MouseEvent<HTMLElement>} e - React mouse event
   * @param {string} uuid - The summary item's uuid
   */
  const handleBookMark = async (e, uuid) => {
    e.stopPropagation();
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

  /**
   * Delete a bookmarked summary item
   * @param {React.MouseEvent<HTMLElement>} e - React mouse event
   * @param {string} uuid - The summary item's uuid
   */
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

  // Transform bookmark data to match Table component requirements
  const tableData = bookMark?.map(item => ({
    uuid: item.uuid,
    title: item.summary?.title || 'No title',
    summary: item.summary?.text || 'No text',
    createdAt: item.createdAt,
    isBookmarked: item.bookmark,
    onBookmark: (uuid: string) => handleBookMark(null, uuid),
    onDelete: (uuid: string) => handleDelete(null, uuid)
  })) || [];

  return (
    <>
      {bookMark?.length > 0 ? (
        <Table
          data={tableData}
          totalItems={bookMark.length}
          page={0}
          loading={loading}
          onPageChange={() => {}}
        />
      ) : (
        <NoBookMark />
      )}

      {/* Legacy implementation - commented out for reference
      {bookMark?.length > 0 ? (
        <>
          <HistoryTableHeader />
          {bookMark?.map((item) => (
            <div key={item?.uuid}>
              <ListItem
                uuid={item?.uuid}
                summaryUuid={item?.summaryUuid}
                title={item?.summary?.title}
                summary={item?.summary?.summaryArray}
                time={item?.createdAt}
                isBookmarked={item?.bookmark}
                buttonType="action"
                actionButtons={<DeleteIcon doc={item?.title} />}
              />
            </div>
          ))}
        </>
      ) : (
        <NoBookMark />
      )}
      */}
    </>
  );
}

export default BookMarkContent;
