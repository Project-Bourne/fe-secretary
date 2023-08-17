import React from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';

function HistoryContent({ data }) {
  // console.log(JSON.parse(data[0].summaryArray)
  //   , "item we are using now")

  return (
    <>
      {data.length > 0 ? (
        <>
          {data?.map(item => {
            const summaries: any = JSON.parse(item.summaryArray);

            // Parse the JSON string
            return (
              <div key={item.uuid}>
                <ListItem
                  uuid={item.uuid}
                  title={item.title} // Pass the title
                  summary={summaries} // Pass the summary
                  time={item.createdAt}
                  isArchived={item.isArchived} // Pass the isArchived value
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item.title} />}
                />
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default HistoryContent;
