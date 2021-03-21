import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';

const MeterDataSlicesEnergy = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aEng',
        showDuration: true,
        tableHeader: 'Срезы показаний энергии',
      }}
    />
  );
};

export default MeterDataSlicesEnergy;
