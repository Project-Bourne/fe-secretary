import React from "react";
import DeleteIcon from "./deleteIcon";
import ListItem from "./BookMarkListItem";
import NoBookMark from "./NoBookMark";
import { useSelector } from "react-redux";
import HistoryTableHeader from "../history/HistoryTableHeader";

function HistoryContent() {
  const { bookMark } = useSelector((store: any) => store.summary); // Get the data from Redux store
  return (
    <>
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
    </>
  );
}

export default HistoryContent;
