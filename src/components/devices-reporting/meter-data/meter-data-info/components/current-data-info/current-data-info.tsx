import React from 'react';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import './current-data-info.scss';

const CurrentDataInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'mEng',
        tableHeader: 'Показания энергии',
      }}
    />
  );
};

export default CurrentDataInfo;
