import React from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './BookMarkListItem';
import NoBookMark from './NoBookMark';

function HistoryContent({ data }) {
  const bookmarkedItems = data.filter(item => item.bookmark);

  return (
    <>
      {bookmarkedItems.length > 0 ? (
        <>
          {bookmarkedItems.map(item => (
            <div key={item.uuid}>
              <ListItem
                uuid={item.uuid}
                summaryUuid={item.summaryUuid}
                title={item.summary.title}
                summary={item.summary.summaryArray}
                time={item.createdAt}
                isBookmarked={item.bookmark}
                buttonType="action"
                actionButtons={<DeleteIcon doc={item.title} />}
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
