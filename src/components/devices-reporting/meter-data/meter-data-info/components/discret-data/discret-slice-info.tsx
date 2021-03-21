import React from 'react';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { DiscretDataInfoService } from './services/discret-data-info-service';

const DiscretSliceInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aDIn',
        tableHeader: 'Срезы показаний',
        service: DiscretDataInfoService,
        groupsPu: [_groupsTypeMeterDictionary[3]]
      }}
    />
  );
};

export default DiscretSliceInfo;
