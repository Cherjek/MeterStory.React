import React from 'react';
import { _groupsTypeMeterDictionary } from '../../../../meter-settings/meter-settings-table/services/meter-settings-table-service';
import PeriodDataInfo from '../../shared/components/period-data-info/period-data-info';
import { DiscretDataInfoService } from './services/discret-data-info-service';

const DiscretCurrentInfo = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'mDIn',
        tableHeader: 'Текущее состояние вводов',
        service: DiscretDataInfoService,
        groupsPu: [_groupsTypeMeterDictionary[3]]
      }}
    />
  );
};

export default DiscretCurrentInfo;
