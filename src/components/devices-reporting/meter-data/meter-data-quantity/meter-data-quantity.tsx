import React from 'react';
import { MeterDataQualityService } from './services/meter-data-quality-service';
import PeriodDataInfo from '../meter-data-info/shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const MeterDataQuantity = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'mQual',
        tableHeader: 'Показатели качества сети',
        service: MeterDataQualityService,
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default MeterDataQuantity;
