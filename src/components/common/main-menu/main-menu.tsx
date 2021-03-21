import React from 'react';
import './main-menu.scss';
import { NavLink } from 'react-router-dom';
import AdminServers from '../../admin/admin-servers/admin-servers';
import AdminDisks from '../../admin/admin-disks/admin-disks';
import TimeSettings from '../../uspd-settings/time/time-settings';
import DeviceSettings from '../../uspd-settings/device/device-settings';
import NetworkSettings from '../../uspd-settings/network/network-settings';
import DataExchangeMqtt from '../../data-exchange/mqtt/data-exchange-mqtt';
import DataExchangeSmtp from '../../data-exchange/smtp/data-exchange-smtp';
import MeterData from '../../devices-reporting/meter-data/meter-data';
import MeterManagement from '../../devices-reporting/meter-management/meter-management';
import MeterDataJournal from '../../devices-reporting/meter-data/meter-data-journal/meter-data-journal';
import MeterDataInfo from '../../devices-reporting/meter-data/meter-data-info/meter-data-info';
import MeterDataQuantity from '../../devices-reporting/meter-data/meter-data-quantity/meter-data-quantity';
import SmtpAddress from '../../data-exchange/smtp/smtp-address/smtp-address';
import SmtpSettings from '../../data-exchange/smtp/smtp-settings/smtp-settings';
import SmtpAction from '../../data-exchange/smtp/smtp-action/smtp-action';
import MqttSettings from '../../data-exchange/mqtt/mqtt-settings/mqtt-settings';
import MqttAction from '../../data-exchange/mqtt/mqtt-action/mqtt-action';
import UpdateVpo from '../../update-vpo/update-vpo';
import MessagesDataExchange from '../../data-exchange/shared/messages/messages';
import MeterMessagesDataExchange from '../../data-exchange/shared/meter-messages/meter-messages';
import Diagnostics from '../../diagnostics/diagnostics';
import DiagnosticState from '../../diagnostics/diagnostic-state/diagnostic-state';
import SysInfo from '../../diagnostics/diagnostic-state/system-info';
import OsState from '../../diagnostics/diagnostic-state/os-state';
import NetworkState from '../../diagnostics/diagnostic-state/network-state';
import SchdlEventTable from '../../data-exchange/shared/schdl-event-table/schdl-event-table';
import MeterSettings from '../../devices-reporting/meter-settings/meter-settings';
import MeterActionTable from '../../devices-reporting/meter-settings/meter-settings-action/meter-action-table';
import MeterSettingsTable from '../../devices-reporting/meter-settings/meter-settings-table/meter-settings-table';
import MeterArchSettings from '../../devices-reporting/meter-settings/meter-arch-settings/meter-arch-settings';
import CurrentDataInfo from '../../devices-reporting/meter-data/meter-data-info/components/current-data-info/current-data-info';
import DayDataInfo from '../../devices-reporting/meter-data/meter-data-info/components/day-data-info/day-data-info';
import MonthDataInfo from '../../devices-reporting/meter-data/meter-data-info/components/month-data-info/month-data-info';
import HourDataInfo from '../../devices-reporting/meter-data/meter-data-info/components/hour-data-info/hour-data-info';
import MeterArchCons from '../../devices-reporting/meter-data/meter-arch-cons/meter-arch-cons';
import MeterArchConsDay from '../../devices-reporting/meter-data/meter-arch-cons/components/meter-arch-cons-day/meter-arch-cons-day';
import MeterArchConsMonth from '../../devices-reporting/meter-data/meter-arch-cons/components/meter-arch-cons-month/meter-arch-cons-month';
import MeterDataSlices from '../../devices-reporting/meter-data/meter-data-slices/meter-data-slices';
import MeterDataSlicesEnergy from '../../devices-reporting/meter-data/meter-data-slices/components/meter-data-slices-energy/meter-data-slices-energy';
import MeterDataSlicesQuality from '../../devices-reporting/meter-data/meter-data-slices/components/meter-data-slices-quality/meter-data-slices-quality';
import MeterDataSlicesConfig from '../../devices-reporting/meter-data/meter-data-slices/components/meter-data-slices-config/meter-data-slices-config';
import MeterDataCardFeatures from '../../devices-reporting/meter-data/meter-data-card-features/meter-data-card-features';
import NetworkCsdSettings from '../../uspd-settings/network/network-csd-settings/network-csd-settings';
import NetworkIpSettings from '../../uspd-settings/network/network-ip-settings/network-ip-settings';
import NetworkModem from '../../uspd-settings/network/network-modem/network-modem';
import NetworkSrvSettings from '../../uspd-settings/network/network-srv-settings/network-srv-settings';
import DeviceSettingsProperty from '../../uspd-settings/device/device-settings/device-settings';
import DeviceRestartSettings from '../../uspd-settings/device/device-restart/device-restart';
import DeviceUartSettings from '../../uspd-settings/device/device-uart-settings/device-uart-settings';
import DeviceDinSettings from '../../uspd-settings/device/device-din-settings/device-din-settings';
import DeviceDoutSettings from '../../uspd-settings/device/device-dout-settings/device-dout-settings';
import SiteMap from '../../../site-map';
import MessageExchange from '../../journals/message-exchange/message-exchange';
import JournalsSharedForm from '../../journals/shared-form';
import JournalsDevice from '../../journals/device/device';
import JournalsModem from '../../journals/modem/modem';
import JournalsMeter from '../../journals/meter/meter';
export class MenuRoute {
  code?: string;
  name?: string;
  url?: string;
  component?: any;
  children?: MenuRoute[];
  submenu?: MenuRoute[];
  visible?: boolean;
}

export const menuRoutes: MenuRoute[] = [
  {
    code: 'site-map',
    name: 'Карта сайта',
    component: SiteMap,
    url: '/site-map',
    visible: false,
    children: [{
      name: 'Карта сайта',
      component: SiteMap,
      url: '/site-map'
    }]
  },  
  {
    code: 'admin',
    name: 'Администрирование',
    url: '/admin/servers',
    children: [{
      code: 'adminServers',
      name: 'Администрирование серверов',
      url: '/admin/servers',
      component: AdminServers,
      submenu: [
        { url: '#httpserver', name: 'Администрирование HTTP-сервера' },
        { url: '#rtu327', name: 'Администрирование сервера RTU327' },
        { url: '#textprotocol', name: 'Администрирование сервера текстового протокола' }
      ]
    }, {
      code: 'adminDisks',
      name: 'Администрирование дисков',
      url: '/admin/disks',
      component: AdminDisks,
      submenu: [
        { url: '#usb', name: 'Настройки видимости файловой системы по USB' },
        { url: '#diskclear', name: 'Управление файловой системой (очистка)' }
      ]
    }]
  },
  {
    code: 'settingsUSPD',
    name: 'Настройка УСПД',
    url: '/uspd-settings/time',
    children: [{
      code: 'settingsUSPDTime',
      name: 'Установка времени',
      url: '/uspd-settings/time',
      component: TimeSettings,
      submenu: [
        { url: '#settime', name: 'Установка времени' },
        { url: '#localtime', name: 'Настройка локального времени' },
        { url: '#serverssync', name: 'Сервера синхронизации времени' },
        { url: '#conditionssync', name: 'Условия синхронизации времени' }
      ]
    }, {
      code: 'settingsUSPDDevice',
      name: 'Настройка устройства',
      url: '/uspd-settings/device',
      component: DeviceSettings,
      submenu: [
        { url: '/uspd-settings/device/settings', name: 'Настройки устройства', component: DeviceSettingsProperty },
        { url: '/uspd-settings/device/uart', name: 'Настройки цифровых интерфейсов', component: DeviceUartSettings },
        { url: '/uspd-settings/device/din', name: 'Настройки дискретных входов', component: DeviceDinSettings },
        { url: '/uspd-settings/device/dout', name: 'Настройки линий питания', component: DeviceDoutSettings },
        { url: '/uspd-settings/device/restart', name: 'Перезагрузка', component: DeviceRestartSettings },
      ]
    }, {
      code: 'settingsUSPDNetwork',
      name: 'Настройка сети',
      url: '/uspd-settings/network',
      component: NetworkSettings,
      submenu: [
        { url: '/uspd-settings/network/ip-settings', name: 'Настройки IP', component: NetworkIpSettings },
        { url: '/uspd-settings/network/modem', name: 'Настройки модема', component: NetworkModem },
        { url: '/uspd-settings/network/csd-settings', name: 'PPP-сервер', component: NetworkCsdSettings },
        { url: '/uspd-settings/network/srv-settings', name: 'Настройки серверов', component: NetworkSrvSettings }
      ]
    }]
  },
  {
    code: 'devicesReporting',
    name: 'Приборы учета',
    url: '/meter/settings',
    children: [{
      code: 'meterSettings',
      name: 'Настройка приборов учета',
      url: '/meter/settings',
      component: MeterSettings,
      submenu: [
        { url: '/meter/settings/table', name: 'Таблица приборов учета', component: MeterSettingsTable },
        { url: '/meter/settings/arch', name: 'Хранение данных ПУ', component: MeterArchSettings },
        { url: '/meter/settings/action', name: 'Опрос приборов учета', component: MeterActionTable },
        { url: '/meter/settings/schdl-event-table', name: 'Расписания', component: SchdlEventTable }
      ]
    }, {
      code: 'meterData',
      name: 'Данные приборов учета',
      url: '/meter/data',
      component: MeterData,
      submenu: [
        { url: '/meter/data/info', name: 'Показания', component: MeterDataInfo },
        { url: '/meter/data/quality', name: 'Качество сети', component: MeterDataQuantity },
        { url: '/meter/data/slices', name: 'Срезы', component: MeterDataSlices },
        { url: '/meter/data/consumption', name: 'Потребление', component: MeterArchCons },
        { url: '/meter/data/card-features', name: 'Профили мощности', component: MeterDataCardFeatures },
        { url: '/meter/data/journal', name: 'Данные журналов', component: MeterDataJournal }
      ]
    }, {
      code: 'meterManagPU',
      name: 'Управление приборами учета',
      url: '/meter/management',
      component: MeterManagement,
      submenu: [
        { url: '#timestate', name: 'Текущее время' },
        { url: '#settime', name: 'Установка времени' },
        { url: '#relaystate', name: 'Состояние реле' },
        { url: '#managrele', name: 'Управление реле' }
      ]
    }]
  },
  {
    code: 'exchangingData',
    name: 'Обмен данными',
    url: '/data-exchange/mqtt',
    children: [{
      code: 'settingsMqttBroker',
      name: 'MQTT',
      url: '/data-exchange/mqtt',
      component: DataExchangeMqtt,
      submenu: [
        { url: '/data-exchange/mqtt/settings', name: 'Настройка', component: MqttSettings },
        { url: '/data-exchange/mqtt/action', name: 'Формирование публикаций', component: MqttAction },
        { url: '/data-exchange/mqtt/messages', name: 'Сообщения', component: MessagesDataExchange },
        { url: '/data-exchange/mqtt/schdl-event-table', name: 'Расписания', component: SchdlEventTable }
      ]
    }, {
      code: 'settingsSmtp',
      name: 'SMTP',
      url: '/data-exchange/smtp',
      component: DataExchangeSmtp,
      submenu: [
        { url: '/data-exchange/smtp/settings', name: 'Настройка', component: SmtpSettings },
        { url: '/data-exchange/smtp/action', name: 'Формирование писем', component: SmtpAction },
        { url: '/data-exchange/smtp/address', name: 'Адресная книга', component: SmtpAddress },
        { url: '/data-exchange/smtp/messages', name: 'Сообщения', component: MessagesDataExchange },
        { url: '/data-exchange/smtp/meter-messages', name: 'Данные ПУ', component: MeterMessagesDataExchange },
        { url: '/data-exchange/smtp/schdl-event-table', name: 'Расписания', component: SchdlEventTable }
      ]
    }]
  },
  { 
    code: 'journals', 
    name: 'Журналы',
    url: '/journals/device',
    children: [{
      code: 'journals-device',
      name: 'Устройство',
      url: '/journals/device',
      component: JournalsDevice,
      submenu: [
        { url: '/journals/device/din-jrnl-sense', name: 'Дискретные входы', component: JournalsSharedForm },
        { url: '/journals/device/din-jrnl-pwrline', name: 'Перегрузки ЛП', component: JournalsSharedForm },
        { url: '/journals/device/din-jrnl-power', name: 'Состояния питания', component: JournalsSharedForm },
        { url: '/journals/device/din-jrnl-charge', name: 'Заряд АКБ', component: JournalsSharedForm },
        { url: '/journals/device/din-jrnl-open', name: 'Вскрытие корпуса', component: JournalsSharedForm },
        { url: '/journals/device/auth-jrnl', name: 'Авторизация', component: JournalsSharedForm },
        { url: '/journals/device/time-jrnl', name: 'Установка времени', component: JournalsSharedForm }
      ]
    }, {
      code: 'journals-modem',
      name: 'Модем журналы',
      url: '/journals/modem',
      component: JournalsModem,
      submenu: [
        { url: '/journals/modem/ppp-cl-conn-jrn', name: 'Подключения PPP-клиента', component: JournalsSharedForm },
        { url: '/journals/modem/srv-conn-jrnl', name: 'Сетевые подключения', component: JournalsSharedForm }
      ]
    }, {
      code: 'journals-message-exchange',
      name: 'Обмен сообщениями',
      url: '/journals/message-exchange',
      component: MessageExchange,
      submenu: [
        { url: '/journals/message-exchange/smtp', name: 'Почтовые сообщения', component: JournalsSharedForm },
        { url: '/journals/message-exchange/smtp-storage', name: 'Хранилище почтовых сообщений', component: JournalsSharedForm },
        { url: '/journals/message-exchange/mqtt', name: 'Подключения к MQTT-брокеру', component: JournalsSharedForm },
        { url: '/journals/message-exchange/mqtt-messages', name: 'MQTT сообщения', component: JournalsSharedForm },
        // { url: '/journals/message-exchange/mqtt-storage', name: 'Хранилище MQQT сообщений', component: JournalsSharedForm }
      ]
    }/*, {
      code: 'journals-network-connection',
      name: 'Сетевые подключения',
      url: '/journals/network-connection',
      component: Diagnostics,
      submenu: [
        { url: '/journals/network-connection', name: 'Сетевые подключения', component: JournalsSharedForm },
      ]
    }*/, {
      code: 'journals-meter',
      name: 'Приборы учета',
      url: '/journals/meter',
      component: JournalsMeter,
      submenu: [
        { url: '/journals/meter/meter-answ-jrnl', name: 'Качество связи с приборами учета', component: JournalsSharedForm },
      ]
    }],
  },
  { 
    code: 'diagnostics', 
    name: 'Диагностика',
    url: '/diagnostics',
    children: [{
      code: 'diagnostics-state',
      name: 'Состояние',
      url: '/diagnostics',
      component: Diagnostics,
      submenu: [
        { url: '/diagnostics/din-state', name: 'Дискретные входы', component: DiagnosticState },
        { url: '/diagnostics/anal-state', name: 'Аналоговые входы', component: DiagnosticState },
        { url: '/diagnostics/line-state', name: 'Линии питания', component: DiagnosticState },
        { url: '/diagnostics/dataflash-state', name: 'Dataflash', component: DiagnosticState },
        { url: '/diagnostics/file-state', name: 'Файловая система', component: DiagnosticState },
        { url: '/diagnostics/system-info', name: 'Конфигурация системы', component: SysInfo },
        { url: '/diagnostics/system-state', name: 'Операционная система', component: OsState },
        { url: '/diagnostics/network-state', name: 'Сетевые подключения', component: NetworkState },
        // { url: '/diagnostics/modem-state', name: 'Модем', component: DiagnosticState },
        { url: '/diagnostics/number-state', name: 'Цифровые интерфейсы', component: DiagnosticState },
        // { url: '/diagnostics/clock-state', name: 'Часы устройства', component: DiagnosticState }
      ]
    }]
  },
  { 
    code: 'updateVPO', 
    name: 'Обновление ВПО',
    url: '/update-routing',
    children: [{
      code: 'updateVPOAttach',
      name: 'Обновление',
      url: '/update-routing',
      component: UpdateVpo
    }]
  }
];

export const meterDataTabRoutes = [
  {
    url: '/meter/data/info/current',
    name: 'Текущие показания энергии',
    component: CurrentDataInfo,
  },
  {
    url: '/meter/data/info/day',
    name: 'Показания на начало суток',
    component: DayDataInfo,
  },
  {
    url: '/meter/data/info/month',
    name: 'Показания на начало месяца',
    component: MonthDataInfo,
  },
  {
    url: '/meter/data/info/hour',
    name: 'Показания на начало часа',
    component: HourDataInfo,
  },
];

export const meterArchConsRoutes = [
  {
    url: '/meter/data/consumption/day',
    name: 'Потребление за сутки',
    component: MeterArchConsDay,
  },
  {
    url: '/meter/data/consumption/month',
    name: 'Потребление за месяц',
    component: MeterArchConsMonth,
  }
];

export const meterDataSlicesRoutes = [
  {
    url: '/meter/data/slices/config',
    name: 'Срезы аппаратной конфигурации',
    component: MeterDataSlicesConfig,
  },
  {
    url: '/meter/data/slices/energy',
    name: 'Срезы показаний энергии',
    component: MeterDataSlicesEnergy,
  },
  {
    url: '/meter/data/slices/quality',
    name: 'Срезы показателей качества сети',
    component: MeterDataSlicesQuality,
  }
];

const initialState = {
  selectMenu: menuRoutes[0]
};
const reducer = (state: any, action: any) => {
  return {
    ...state,
    selectMenu: action.selectMenu
  };
}

export const generateListRoutes = () =>  {
  const recursive = (routes: MenuRoute[], result: MenuRoute[]) => {
    routes.forEach(menu => {
      if (menu.url) {
        result.push(menu);
      }
      if (menu.children) {
        recursive(menu.children, result);
      }
    });
  }
  const result: MenuRoute[] = [];
  const list = menuRoutes
    .filter(x => x.children)
    .map(x => x.children)
    .reduce((x, y) => [...x as MenuRoute[], ...y as MenuRoute[]]);
  recursive(list as MenuRoute[], result);
  return result;
}

export const MainMenu = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const pathname = window.location.pathname;
    const menu = menuRoutes.find(m => m?.children?.some(sm => sm.url?.includes(pathname) || pathname.includes(sm.url)));
    dispatch({
      selectMenu: menu
    })
  }, []);

  const menuClicked = (event: any, menu: MenuRoute) => {
    dispatch({
      selectMenu: menu
    })
  }

  return (
    <>
      <header className="main-menu">
        <div className="row">
          {menuRoutes
          .filter(x => x.visible == null || x.visible)
          .map(menu => (
            <NavLink key={menu.code} to={`${menu.url}`}
              className={ 'col-auto ' + ((state as any).selectMenu?.code === menu.code ? 'active' : '') }
              activeClassName="active"
              onClick={(e: any) => menuClicked(e, menu)}>
              {menu.name}
            </NavLink>
          ))}
        </div>
      </header>
      <header className="sub-main-menu">
        <div className="row">
          {((state as any).selectMenu as MenuRoute).children?.map((menu, index) => (
            <div key={menu.code} className="col-auto">
              {menu.url != null ? (
                <NavLink to={`${menu.url}`} activeClassName="active">{menu.name}</NavLink>
              ) : (
                <>{menu.name}</>
              )}
            </div>
          ))}
        </div>
      </header>
      <header className="bread-crumbs">
        <div className="row">
          <div className="col-auto">
            {
              ((state as any).selectMenu as MenuRoute)
                ?.children
                ?.map(sm => sm.name).join(' > ')
            }
          </div>
        </div>
      </header>


    </>
  );
}