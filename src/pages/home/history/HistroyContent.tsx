import React from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistroy';

function HistoryContent({ data }) {
  

  return (
    <>
      {data.length > 0 ? (
        <>
          {data?.map(item => {
            return (
              <div key={item.uuid}>
                <ListItem
                  uuid={item.uuid}
                  summaryUuid={item.summaryUuid}
                  title={item.summary.title} // Pass the title
                  summary={item.summary.summaryArray} // Pass the summary
                  time={item.createdAt}
                  isBookmarked={item.bookmark} // Pass the isArchived value
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item.title} />}
                />
              </div>
            );
          })}
        </>
      ) : (
       <NoHistory />
      )}
    </>
  );
}

export default HistoryContent;
