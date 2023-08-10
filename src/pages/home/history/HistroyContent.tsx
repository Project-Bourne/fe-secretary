import React from "react";
import DeleteIcon from "./deleteIcon";
import ListItem from "./HistoryListItem";

function HistoryContent({ data }) {
 
  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              name={item.name}
              desc={item.description}
              message={item.message}
              time={item.time}
              buttonType="action"
              actionButtons={<DeleteIcon doc={item.description} />}  
            />
          </div>
        );
      })}
    </>
  );
}

export default HistoryContent;
