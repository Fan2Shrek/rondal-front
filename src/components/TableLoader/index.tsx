import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = (props) => {
  const { rows = 10 } = props;
  const rowHeight = 50;

  return (
    <ContentLoader
      width="100%"
      height="520"
      {...props}
      backgroundColor="#F2F2F2"
      foregroundColor="#F8F8F8"
    >
      {new Array(rows).fill(" ").map((el, index) => {
        const contentVerticalPosition = (contentHeight) => rows > 1 ? contentHeight + rowHeight * index : contentHeight;

        return (
          <Fragment key={index}>
            <rect
              x="20"
              y={`${contentVerticalPosition(20)}`}
              rx="4"
              ry="4"
              width="calc(100% - 40px)"
              height="40"
            />
          </Fragment>
        );
      })}
    </ContentLoader>
  );
};

export default TableLoader;
