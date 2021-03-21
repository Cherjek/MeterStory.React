function get_settings(uri, parser) {
    var request = new XMLHttpRequest();
    request.open('GET', uri);
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                parser(response);
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(null);
}

function set_settings(uri, settings, method) {
	var request = new XMLHttpRequest();
	request.open(method, uri);
	request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
				window.location.reload();
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
	request.send(JSON.stringify(settings));
};

function del_settings(uri) {
	var request = new XMLHttpRequest();
	request.open('DELETE', uri);
	request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
	request.send(null);
};

function add_input(row, id)
{
	var td = document.createElement("TD");
	td.setAttribute("id", id);
	var input = document.createElement("input")	;
	td.appendChild(input);
	row.appendChild(td);
}

function add_checkbox(row, id)
{
	var td = document.createElement("TD");
	td.setAttribute("id", id);
	var input = document.createElement("input");
	input.setAttribute("type","checkbox");
	td.appendChild(input);
	row.appendChild(td);
}

function add_textarea(row, id, rows, cols)
{
	var td = document.createElement("TD");
	td.setAttribute("id", id);
	var input = document.createElement("textarea");
	input.rows = rows;
	input.cols = cols;
	td.appendChild(input);
	row.appendChild(td);
}

function add_select(row, id, params)
{
	var td = document.createElement("TD");
	td.setAttribute("id", id);
	var select = document.createElement("select");
	var i;
	for (i = 0; i < params.length; ++i) {
		option = document.createElement('option');
		option.innerText = params[i];
		option.setAttribute("value", i);
		select.appendChild(option);
	}
	td.appendChild(select);
	row.appendChild(td);
}

function add_custom_select(row, id, params)
{
	var td = document.createElement("TD");
	td.setAttribute("id", id);
	var select = document.createElement("select");
	var i;
	for (i = 0; i < params.length; ++i) {
		option = document.createElement('option');
		option.innerText = (params[i])[0];
		option.setAttribute("value", params[i][1]);
		select.appendChild(option);
	}
	td.appendChild(select);
	row.appendChild(td);
}

function add_meter_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");
	add_select(row,"pollType",["Срезы энергии","Срезы показателей качества сети","Показания за сутки","Показания за месяц","Показания на начало суток","Показания на начало месяца","Профили мощности","Показания на начало часа","Журналы","Синхронизация времени","Срезы аппаратной конфигурации"]);
	tbody.appendChild(row);	
}

function add_smtp_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");
	add_select(row,"msgType",["Сообщение оператора","Данные прибора учета","Журналы устройства","Диагностическая информация устройства","Состояние дискретных входов"]);
	add_input(row,"msgId");
	add_input(row,"srvId");
	add_input(row,"addrId");
	tbody.appendChild(row);	
}

function add_mqtt_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");
	add_select(row,"msgType",["Сообщение оператора","Данные прибора учета","Журналы устройства","Диагностическая информация устройства","Состояние дискретных входов"]);
	add_input(row,"msgId");
	add_input(row,"srvId");
	add_input(row,"topic");
	tbody.appendChild(row);	
}

function add_sms_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");
	add_select(row,"msgType",["Сообщение оператора"]);
	add_input(row,"msgId");
	add_input(row,"addrId");
	tbody.appendChild(row);	
}

function add_meter_row()
{
	var tbody = document.getElementById('Meters');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"pId");
	add_input(row,"archId");
	add_custom_select(row,"type",[["Меркурий200",1],["Меркурий203",31],["Меркурий206",32],["Меркурий230",3],["Меркурий234 СПОДЭС",36],["Меркурий225.2",91],["СЕ102",8],["СЕ102М",11],["СЕ301",6],["СЕ303",5],["СЭБ2А",2],["ПСЧ3ТА",17],["СЭТ4ТМ",4],["ПСЧхТМ",10],["Альфа1140",25],["ТОПАЗ",33],["НЕВА1xx",26],["НЕВА3xx",27],["Милур10x",28],["Милур30x",29],["СОЭ55/215",24],["СОЭ55/217",22],["СОЭ55/415",30],["СТЭ561",23],["ИНТЕГРА10х",35],["УМТВ10",9],["Пульсар",93],["FX868",92]]);
	add_input(row,"addr");
	add_input(row,"passRd");
	add_input(row,"passWr");
	add_select(row,"line",["Автоматически","Линия питания 1","Линия питания 2","Линия питания 3","Линия питания 4","Линия питания 5"]);	
	add_custom_select(row,"iface",[["Интерфейс 1",0],["Интерфейс 2",1],["Интерфейс 3",2],["Интерфейс 4",3],["Интерфейс 5",4], ["Интерфейс концентратора",6]]);
	add_custom_select(row,"br",[["Автоматически",0],["300",300],["600",600],["1200",1200],["2400",2400],["4800",4800],["9600",9600],["19200",19200],["38400",38400],["57600",57600],["115200",115200]]);	
	add_custom_select(row,"size",[["7",7],["8",8]]);	
	add_select(row,"parity",["Отсутствует","Контроль четности","Контроль нечетности"]);	
	add_custom_select(row,"stop",[["1",1],["2",2]]);	
	add_input(row,"rtuObjType");
	add_input(row,"rtuObjNum");
	add_input(row,"rtuFider");
	tbody.appendChild(row);	
}

function add_uart_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_custom_select(row,"iface",[["Интерфейс 1",0],["Интерфейс 2",1],["Интерфейс 3",2],["Интерфейс 4",3],["Интерфейс 5",4], ["Интерфейс модема",5]]);
	add_custom_select(row,"br",[["Автоматически",0],["300",300],["600",600],["1200",1200],["2400",2400],["4800",4800],["9600",9600],["19200",19200],["38400",38400],["57600",57600],["115200",115200]]);	
	add_custom_select(row,"size",[["7",7],["8",8]]);	
	add_select(row,"parity",["Отсутствует","Контроль четности","Контроль нечетности"]);	
	add_custom_select(row,"stop",[["1",1],["2",2]]);	
	add_select(row,"line",["Автоматически","Линия питания 1","Линия питания 2","Линия питания 3","Линия питания 4","Линия питания 5"]);	
	tbody.appendChild(row);	
}

function add_din_event_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_custom_select(row,"type",[["События отключены",0],["События по замыканию",1],["События по размыканию",2],["События по изменению состояния",3]]);
	add_custom_select(row,"addr",[["Дискретный вход 1",0],["Дискретный вход 2",1],["Дискретный вход 3",2],["Дискретный вход 4",3],["Перегрузка линий питания интерфейсов",4],["Наличие основного питания(220В)",5],["Наличие резервного питания(12В)",6],["Наличие питания от аккумуляторной батареи(3.8В)",7], ["Заряд аккумуляторной батареи",8], ["Датчик вскрытия корпуса",10]]);
	tbody.appendChild(row);	
}

function add_schdl_event_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR");
	add_input(row,"id");
	add_select(row,"type",['Отключено','Каждые','Ежедневно','Ежемесячно']);		
	add_input(row,"day");
	add_input(row,"hour");
	add_input(row,"min");
	add_input(row,"delay");
	add_input(row,"time");	
	tbody.appendChild(row);	
}

function add_sntp_srv_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR");
	add_input(row,"id");
	add_input(row,"addr");
	add_input(row,"port");
	tbody.appendChild(row);	
}

function add_sntp_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");	
	tbody.appendChild(row);	
}

function add_reset_action_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"eventType",["Расписание","Изменение дискретного входа"]);
	add_input(row,"eventId");	
	tbody.appendChild(row);	
}

function add_meter_arch_device_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"deviceType",["Концентратор электросчетчиков","Электросчетчик","Концентратор импульсных счетчиков"]);
	add_input(row,"size");
	add_input(row,"free");
	tbody.appendChild(row);	
}

function add_meter_arch_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_custom_select(row,"type",[["",255],["Срезы мгновенных показаний",0],["Срезы информации о окружащей среде",7],["Показания на начало суток",3],["Показания на начало месяца",4],["Потребление за сутки",1],["Потребление за месяц",2],["Профили мощности",5],["Показания на начало часа",6],["Аппаратная конфигурация",8],["управление питанием",9],["коррекция времени",10],["сброс показаний",11],["инициализация первого массива профилей",12],["инициализация второго массива профилей",13],["коррекция тарификатора",14],["открытие крышки",15],["неавторизованный доступ",16],["управление фазой А",17],["управление фазой В",18],["управление фазой С",19],["программирование",20],["управление реле",21],["лимит суммарной энергии",22],["потарифиный лимит энергии",23],["лимит энергии тарифа 1",24],["лимит энергии тарифа 2",25],["лимит энергии тарифа 3",26],["лимит энергии тарифа 4",27],["ограничение максимального напряжения фазы А",28],["ограничение минимального напряжения фазы А",29],["ограничение максимального напряжения фазы В",30],["ограничение минимального напряжения фазы В",31],["ограничение максимального напряжения фазы С",32],["ограничение минимального напряжения фазы С",33],["ограничение максимального расхождения напряжения фаз А и В",34],["ограничение минимального расхождения напряжения фаз А и В",35],["ограничение максимального расхождения напряжения фаз В и С",36],["ограничение минимального расхождения напряжения фаз В и С",37],["ограничение максимального расхождения напряжения фаз С и А",38],["ограничение минимального расхождения напряжения фаз С и А",39],["ограничение максимального тока фазы А",40],["ограничение максимального тока фазы В",41],["ограничение максимального тока фазы С",42],["ограничение максимальной частоты сети",43],["ограничение минимальной частоты сети",44],["ограничение мощности",45],["ограничение прямой активной мощности",46],["ограничение прямой реактивной мощности",47],["ограничение обратной активной мощности",48],["ограничение обратной реактивной мощности",49],["реверс",50]]);
	add_input(row,"depth");
	tbody.appendChild(row);	
}

function add_file_system_diagn_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_input(row,"num");
	add_input(row,"info");
	add_input(row,"size");
	add_input(row,"free");
	tbody.appendChild(row);	
}

function add_disk_access_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_checkbox(row,"read");
	add_checkbox(row,"write");
	tbody.appendChild(row);	
}

function add_process_info_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"name");
	add_select(row,"state",["Running","Ready","Blocked","Suspended","Deleted","Invalid"]);
	add_input(row,"priority");
	add_input(row,"stacksize");
	add_input(row,"stackfree");
	add_input(row,"stackmin");
	add_input(row,"runtime");
	tbody.appendChild(row);	
}

function add_json_auth_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"login");
	add_input(row,"password");
	add_select(row,"lvl",["Нет доступа","Пользователь","Администратор"]);
	tbody.appendChild(row);	
}

function add_rtu_proto_auth_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"password");
	tbody.appendChild(row);	
}

function add_text_proto_auth_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"password");
	add_select(row,"lvl",["Нет доступа","Пользователь","Конфигуратор","Завод"]);
	tbody.appendChild(row);	
}

function add_text_proto_mail_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");	
	add_select(row,"type",["Потребление на начало часа","Срезы показаний энергии","Потребление за сутки","Показания на начало суток","Показания на начало месяца","Профили мощности","Срезы показателей качества сети","Журналы","Конфигурация"]);
	add_input(row,"depth");
	tbody.appendChild(row);	
}

function add_meter_message_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"proto",["Протокол не указан","JSON протокол","Текстовый протокол UM-RTU","Протокол RTU-327"]);
	add_input(row,"MeterId");
	add_input(row,"depth");
	add_custom_select(row,"Measure",[["текущие состояния реле","mRelay"],["текущие ПКЭ","mQual"],["текущие показания энергии","mEng"],["конфигурация","aCfg"],["срезы показаний энергии","aEng"],["срезы ПКЭ","aQual"],["показания на начало суток","aDay"],["потребление за сутки","aDayCons"],["показания на начало месяца","aMonth"],["потребление за месяц","aMonthCons"],["профили мощности","aCons"],["показания на начало часа","aHour"],["управление питанием","jrnlPwr"],["коррекция времени","jrnlTimeCorr"],["сброс показаний","jrnlReset"],["инициализация первого массива профилей","jrnlC1Init"],["инициализация второго массива профилей","jrnlC2Init"],["коррекция тарификатора","jrnlTrfCorr"],["открытие крышки","jrnlOpen"],["неавторизованный доступ","jrnlUnAyth"],["управление фазой А","jrnlPwrA"],["управление фазой В","jrnlPwrB"],["управление фазой С","jrnlPwrC"],["программирование","jrnlProg"],["управление реле","jrnlRelay"],["лимит суммарной энергии","jrnlLimESumm"],["потарифиный лимит энергии","jrnlLimETrf"],["лимит энергии тарифа 1","jrnlLimETrf1"],["лимит энергии тарифа 2","jrnlLimETrf2"],["лимит энергии тарифа 3","jrnlLimETrf3"],["лимит энергии тарифа 4","jrnlLimETrf4"],["ограничение максимального напряжения фазы А","jrnlLimUAMax"],["ограничение минимального напряжения фазы А","jrnlLimUAMin"],["ограничение максимального напряжения фазы В","jrnlLimUBMax"],["ограничение минимального напряжения фазы В","jrnlLimUBMin"],["ограничение максимального напряжения фазы С","jrnlLimUCMax"],["ограничение минимального напряжения фазы С","jrnlLimUCMin"],["ограничение максимального расхождения напряжения фаз А и В","jrnlLimUABMax"],["ограничение минимального расхождения напряжения фаз А и В","jrnlLimUABMin"],["ограничение максимального расхождения напряжения фаз В и С","jrnlLimUBCMax"],["ограничение минимального расхождения напряжения фаз В и С","jrnlLimUBCMin"],["ограничение максимального расхождения напряжения фаз С и А","jrnlLimUCAMax"],["ограничение минимального расхождения напряжения фаз С и А","jrnlLimUCAMin"],["ограничение максимального тока фазы А","jrnlLimIAMax"],["ограничение максимального тока фазы В","jrnlLimIBMax"],["ограничение максимального тока фазы С","jrnlLimICMax"],["ограничение максимальной частоты сети","jrnlLimFreqMax"],["ограничение минимальной частоты сети","jrnlLimFreqMin"],["ограничение мощности","jrnlLimPwr"],["ограничение прямой активной мощности","jrnlLimPwrPP"],["ограничение прямой реактивной мощности","jrnlLimPwrPM"],["ограничение обратной активной мощности","jrnlLimPwrQP"],["ограничение обратной реактивной мощности","jrnlLimPwrQP"],["реверс","jrnlRvr"]]);
	tbody.appendChild(row);	
}

function add_meter_data_eng_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"Ap0");
	add_input(row,"Ap1");
	add_input(row,"Ap2");
	add_input(row,"Ap3");
	add_input(row,"Ap4");
	add_input(row,"Am0");
	add_input(row,"Am1");
	add_input(row,"Am2");
	add_input(row,"Am3");
	add_input(row,"Am4");
	add_input(row,"Rp0");
	add_input(row,"Rp1");
	add_input(row,"Rp2");
	add_input(row,"Rp3");
	add_input(row,"Rp4");
	add_input(row,"Rm0");
	add_input(row,"Rm1");
	add_input(row,"Rm2");
	add_input(row,"Rm3");
	add_input(row,"Rm4");
	tbody.appendChild(row);	
}

function add_meter_data_qual_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"UA");
	add_input(row,"UB");
	add_input(row,"UC");
	add_input(row,"IA");
	add_input(row,"IB");
	add_input(row,"IC");
	add_input(row,"PS");
	add_input(row,"PA");
	add_input(row,"PB");
	add_input(row,"PC");
	add_input(row,"QS");
	add_input(row,"QA");
	add_input(row,"QB");
	add_input(row,"QC");
	add_input(row,"SS");
	add_input(row,"SA");
	add_input(row,"SB");
	add_input(row,"SC");
	add_input(row,"AngAB");
	add_input(row,"AngBC");
	add_input(row,"AngAC");
	add_input(row,"kPS");
	add_input(row,"kPA");
	add_input(row,"kPB");
	add_input(row,"kPC");
	add_input(row,"Freq");
	tbody.appendChild(row);	
}

function add_meter_data_config_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"kU");
	add_input(row,"kI");
	add_input(row,"Const");
	add_checkbox(row,"isClock");
	add_checkbox(row,"isTrf");
	add_checkbox(row,"isDst");
	add_checkbox(row,"isRp");
	add_checkbox(row,"isAm");
	add_checkbox(row,"isRm");
	add_checkbox(row,"isCons");
	add_input(row,"cTime");
	tbody.appendChild(row);	
}

function add_meter_data_cons_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"Pp");
	add_input(row,"Pm");
	add_input(row,"Qp");
	add_input(row,"Qm");
	add_checkbox(row,"isMeas");
	add_checkbox(row,"isSummer");
	add_checkbox(row,"isOvfl");
	add_checkbox(row,"isPart");
	tbody.appendChild(row);	
}

function add_meter_data_time_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	tbody.appendChild(row);	
}

function add_meter_data_relay_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"rId");
	add_input(row,"state");
	tbody.appendChild(row);	
}

function add_meter_data_journal_row()
{
	var tbody = document.getElementById('MeterData');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"serial");	
	add_custom_select(row,"type",[["обмен данными","jrnlAnsw"],["управление питанием","jrnlPwr"],["коррекция времени","jrnlTimeCorr"],["сброс показаний","jrnlReset"],["инициализация первого массива профилей","jrnlC1Init"],["инициализация второго массива профилей","jrnlC2Init"],["коррекция тарификатора","jrnlTrfCorr"],["открытие крышки","jrnlOpen"],["неавторизованный доступ","jrnlUnAyth"],["управление фазой А","jrnlPwrA"],["управление фазой В","jrnlPwrB"],["управление фазой С","jrnlPwrC"],["программирование","jrnlProg"],["управление реле","jrnlRelay"],["лимит суммарной энергии","jrnlLimESumm"],["потарифиный лимит энергии","jrnlLimETrf"],["лимит энергии тарифа 1","jrnlLimETrf1"],["лимит энергии тарифа 2","jrnlLimETrf2"],["лимит энергии тарифа 3","jrnlLimETrf3"],["лимит энергии тарифа 4","jrnlLimETrf4"],["ограничение максимального напряжения фазы А","jrnlLimUAMax"],["ограничение минимального напряжения фазы А","jrnlLimUAMin"],["ограничение максимального напряжения фазы В","jrnlLimUBMax"],["ограничение минимального напряжения фазы В","jrnlLimUBMin"],["ограничение максимального напряжения фазы С","jrnlLimUCMax"],["ограничение минимального напряжения фазы С","jrnlLimUCMin"],["ограничение максимального расхождения напряжения фаз А и В","jrnlLimUABMax"],["ограничение минимального расхождения напряжения фаз А и В","jrnlLimUABMin"],["ограничение максимального расхождения напряжения фаз В и С","jrnlLimUBCMax"],["ограничение минимального расхождения напряжения фаз В и С","jrnlLimUBCMin"],["ограничение максимального расхождения напряжения фаз С и А","jrnlLimUCAMax"],["ограничение минимального расхождения напряжения фаз С и А","jrnlLimUCAMin"],["ограничение максимального тока фазы А","jrnlLimIAMax"],["ограничение максимального тока фазы В","jrnlLimIBMax"],["ограничение максимального тока фазы С","jrnlLimICMax"],["ограничение максимальной частоты сети","jrnlLimFreqMax"],["ограничение минимальной частоты сети","jrnlLimFreqMin"],["ограничение мощности","jrnlLimPwr"],["ограничение прямой активной мощности","jrnlLimPwrPP"],["ограничение прямой реактивной мощности","jrnlLimPwrPM"],["ограничение обратной активной мощности","jrnlLimPwrQP"],["ограничение обратной реактивной мощности","jrnlLimPwrQP"],["реверс","jrnlRvr"]]);
	add_input(row,"time");
	add_input(row,"timediff");
	add_input(row,"eId");
	add_input(row,"etype");
	tbody.appendChild(row);	
}

function add_din_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"addr",["Дискретный вход 1","Дискретный вход 2","Дискретный вход 3","Дискретный вход 4","Перегрузка линий питания интерфейсов", "Наличие основного питания(220В)", "Наличие резервного питания(12В)","Наличие питания от аккумуляторной батареи(3.8В)", "Заряд аккумуляторной батареи","Кнопка К1","Датчик вскрытия корпуса"]);
	add_input(row,"filter");
	add_select(row,"dstate",["Замкнут","Разомкнут"]);
	tbody.appendChild(row);	
}

function add_dout_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"addr",["PWR1","PWR2","PWR3","PWR4","PWR5"]);
	add_select(row,"state",["Автоматически","Включено","Выключено"]);
	tbody.appendChild(row);	
}

function add_din_state_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_select(row,"addr",["Дискретный вход 1","Дискретный вход 2","Дискретный вход 3","Дискретный вход 4","Перегрузка линий питания интерфейсов", "Наличие основного питания(220В)", "Наличие резервного питания(12В)","Наличие питания от аккумуляторной батареи(3.8В)", "Заряд аккумуляторной батареи", "Кнопка К1","Датчик вскрытия корпуса"]);
	add_select(row,"state",["Замкнут","Разомкнут"]);
	tbody.appendChild(row);	
}

function add_ain_state_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_select(row,"addr",["Напряжение батареи ЧРВ, В","Резервное напряжение, В","Температура SIM карты, С","Напряжение аккумуляторной батареи, В"]);
	add_input(row,"state");
	tbody.appendChild(row);	
}


function add_dout_state_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_select(row,"addr",["PWR1","PWR2","PWR3","PWR4","PWR5"]);
	add_select(row,"state",["Выключено","Включено"]);
	tbody.appendChild(row);	
}

function add_dout_set_state_row()
{
	var tbody = document.getElementById('DOutSetState');
	var row = document.createElement("TR")
	add_select(row,"addr",["PWR1","PWR2","PWR3","PWR4","PWR5"]);
	add_select(row,"state",["Вкл","Выкл"]);
	tbody.appendChild(row);	
}

function add_custom_message_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"type",["ASCII","Unicode","HEX"]);
	add_input(row,"msg");
	tbody.appendChild(row);	
}

function add_address_book_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"email1");
	add_input(row,"email2");
	add_input(row,"tel1");
	add_input(row,"tel2");
	tbody.appendChild(row);	
}

function add_smtp_srv_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"addr");
	add_input(row,"port");
	add_input(row,"login");
	add_input(row,"password");
	add_select(row,"authopt",["По умолчанию","Без авторизации","Метод авторизации: Login","Метод авторизации: Plain"]);
	add_select(row,"cropt",["По умолчанию","Без шифрования","Шифрование соединения","STARTTSL"]);
	add_checkbox(row,"crcheck");
	add_textarea(row,"cert", 16, 80);
	add_input(row,"from");
	tbody.appendChild(row);	
}

function add_mqtt_srv_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_select(row,"type",["MQTT 3.1.1","MQTT SN"]);
	add_input(row,"addr");
	add_input(row,"port");
	add_input(row,"login");
	add_input(row,"password");
	add_input(row,"prefix");
	add_input(row,"deviceID");
	add_select(row,"cropt",["По умолчанию","Без шифрования","Шифрование соединения","STARTTSL"]);
	add_checkbox(row,"crcheck");
	add_textarea(row,"cert", 16, 80);
	tbody.appendChild(row);	
}

function add_http_srv_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"port");
	add_select(row,"type",["Отсутствует","HTTP сервер","Сервер текстового протокола","Сервер RTU327","Сервер транзита интерфейса 1","Сервер транзита интерфейса 2","Сервер транзита интерфейса 3","Сервер транзита интерфейса 4","Сервер транзита интерфейса 5","Сервер транзита интерфейса модема"]);
	add_checkbox(row,"state");
	add_textarea(row,"cert", 16, 80);
	add_textarea(row,"key", 16, 80);
	tbody.appendChild(row);	
}

function add_apn_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"addr");
	add_checkbox(row,"auth");
	add_input(row,"login");
	add_input(row,"password");
	add_checkbox(row,"enable");
	tbody.appendChild(row);	
}

function add_csd_settings_row()
{
	var tbody = document.getElementById('Settings');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"server");
	add_input(row,"peer");
	add_input(row,"login");
	add_input(row,"password");
	add_checkbox(row,"enable");
	tbody.appendChild(row);	
}

function add_socket_info_row()
{
	var tbody = document.getElementById('Socket');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"sock");
	add_input(row,"peer");
	tbody.appendChild(row);	
}

function add_netif_info_row()
{
	var tbody = document.getElementById('NetIf');
	var row = document.createElement("TR")
	add_input(row,"name");
	add_input(row,"ipaddr");
	add_input(row,"netmask");
	add_input(row,"gateway");
	add_input(row,"hostname");
	add_checkbox(row,"link");
	tbody.appendChild(row);	
}

function add_time_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"oldTime");
	add_input(row,"newTime");
	add_select(row,"source",["Синхронизация(SNTP)","Установка(RTU-327)","Установка(HTTP)","Установка(Текстовый протокол)"]);
	tbody.appendChild(row);	
}

function add_srv_conn_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_select(row,"iface",["Отсутствует","Ethernet","Modem"]);
	add_input(row,"server");
	add_input(row,"client");
	tbody.appendChild(row);	
}

function add_ppp_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_select(row,"res",["ГНеизвестно","Соединение открыто","Соединение закрыто", "Ошибка инициализации соединения", "Ошибка установки соединения", "Ошибка ожидания соединения"]);
	tbody.appendChild(row);	
}

function add_call_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"number");
	tbody.appendChild(row);	
}

function add_sms_get_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"number");
	tbody.appendChild(row);	
}

function add_din_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_select(row,"sens",["Дискретный вход 1","Дискретный вход 2","Дискретный вход 3","Дискретный вход 4","Перегрузка линий питания интерфейсов", "Наличие основного питания(220В)", "Наличие резервного питания(12В)", "Наличие питания от аккумуляторной батареи(3.8В)", "Заряд аккумуляторной батареи", "Кнопка К1", "Датчик вскрытия корпуса"]);
	add_select(row,"state",["Замкнут","Разомкнут"]);
	tbody.appendChild(row);	
}

function add_json_auth_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"login");
	add_select(row,"lvl",["Нет доступа","Пользователь","Администратор"]);
	tbody.appendChild(row);	
}

function add_uart_state_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_custom_select(row,"iface",[["Интерфейс 1",0],["Интерфейс 2",1],["Интерфейс 3",2],["Интерфейс 4",3],["Интерфейс 5",4], ["Интерфейс модема",5]]);
	add_checkbox(row,"lock");
	add_input(row,"task");
	tbody.appendChild(row);	
}

function add_reset_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_select(row,"reason",["Неизвестно","Включение питания","Аппаратная перезагрузка"]);
	tbody.appendChild(row);	
}

function add_smtp_message_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"idMsg");
	add_input(row,"idSrv");
	add_input(row,"idTo");
	add_select(row,"action",["Очистка хранилища","Добавление сообщения","Удаление сообщения"]);
	add_select(row,"res",["Успешно","Ошибка ввода/вывода","Внутренняя ошибка","Ошибка физического диска","Не найден файл","Не найден путь к файлу","Некорректный путь к файлу","Диск переполнен","Файл уже открыт","Ошибка файла","Защита от записи","Ошибка логического диска","Диск не доступен","Файловая система не найдена","Файловая система не форматирована","Таймаут","Файл заблокирован","Не хватает памяти ОС","Слишком много открытых файлов","Некорректный параметр"]);
	tbody.appendChild(row);	
}

function add_sms_message_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"idMsg");
	add_input(row,"idTo");
	add_select(row,"action",["Очистка хранилища","Добавление сообщения","Удаление сообщения"]);
	add_select(row,"res",["Успешно","Ошибка ввода/вывода","Внутренняя ошибка","Ошибка физического диска","Не найден файл","Не найден путь к файлу","Некорректный путь к файлу","Диск переполнен","Файл уже открыт","Ошибка файла","Защита от записи","Ошибка логического диска","Диск не доступен","Файловая система не найдена","Файловая система не форматирована","Таймаут","Файл заблокирован","Не хватает памяти ОС","Слишком много открытых файлов","Некорректный параметр"]);
	tbody.appendChild(row);	
}

function add_smtp_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"idMsg");
	add_input(row,"idSrv");
	add_input(row,"idTo");
	add_select(row,"res",["Успешно отправлено","Неизвестная ошибка","Ошибка соединения с сервером","Неверное имя сервера","Сервер сбросил соединение","Таймаут","Неизвестный ответ сервера","Ошибка файла сообщения","Ошибка SSL инициализации","Ошибка SSL handshake","Ошибка авторизации","Неизвестные параметры сервера","Ошибка отправки тела сообщения"]);
	tbody.appendChild(row);	
}

function add_mqtt_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"connect");
	add_input(row,"disconnect");
	add_input(row,"address");
	add_input(row,"port");
	add_select(row,"res",["Подключение завершено штатно","Отсутствуют активные сетевые интерфейсы","Ошибка установки соединения с брокером","Ошибка установки защищенного соединения с брокером","Неверный тип протокола","Неверный идентификатор устройства","Сервер недоступен","Неверный логин/пароль","Ошибка авторизации","Неожиданный тип пакета","Неожиданное завершение соединения","Неверная длина пакета","Неизвестные данные пакета","Ошибка чтения сообщения с диска","Ошибка подписки на топик"]);
	tbody.appendChild(row);	
}

function add_mqtt_message_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");	
	add_select(row,"status",["Публикация","Чтение"]);
	add_input(row,"topicH");
	add_input(row,"topicL");
	add_input(row,"file");
	tbody.appendChild(row);	
}

function add_sms_send_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"idMsg");
	add_input(row,"idTo");
	add_select(row,"res",["Успешно отправлено","Непредусмотренное соединение модема","Входящий вызов","Отсутствие несущей","CME ошибка","CMS ошибка","Отсутствие гудка","Модем занят","Модем не отвечает","Неизвестная ошибка"]);
	add_input(row,"err");
	tbody.appendChild(row);	
}
	
function add_version_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"version");
	tbody.appendChild(row);	
}

function add_loader_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_select(row,"status",["Начало обновления","Ошибка обновления","Обновление успешно завершено"]);
	tbody.appendChild(row);	
}

function add_meter_answ_jrnl_row()
{
	var tbody = document.getElementById('Jrnl');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"time");
	add_input(row,"idMeter");
	add_custom_select(row,"type",[["Меркурий200",1],["Меркурий203",31],["Меркурий206",32],["Меркурий230",3],["Меркурий225.2",91],["СЕ102",8],["СЕ102М",11],["СЕ301",6],["СЕ303",5],["СЭБ2А",2],["ПСЧ3ТА",17],["СЭТ4ТМ",4],["ПСЧхТМ",10],["Альфа1140",25],["ТОПАЗ",33],["НЕВА1xx",26],["НЕВА3xx",27],["Милур10x",28],["Милур30x",29],["СОЭ55/215",24],["СОЭ55/217",22],["СОЭ55/415",30],["СТЭ561",23],["УМТВ10",9],["Пульсар",93],["FX868",92]]);
	add_input(row,"addr");
	add_custom_select(row,"iface",[["Интерфейс 1",0],["Интерфейс 2",1],["Интерфейс 3",2],["Интерфейс 4",3],["Интерфейс 5",4], ["Интерфейс концентратора",6]]);
	add_checkbox(row,"answer");
	tbody.appendChild(row);	
}

function add_dataflash_info_row()
{
	var tbody = document.getElementById('State');
	var row = document.createElement("TR")
	add_input(row,"id");
	add_input(row,"sectors");
	add_input(row,"size");
	add_input(row,"type");
	tbody.appendChild(row);	
}

function handleLogin(form) {
	var logindata = {
		password: password.value,
		login: username.value
	};
	var request = new XMLHttpRequest();
	request.open('POST', 'auth');
	request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
            if (this.status == 200) {
				document.location.href = '/main.html';
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
	request.send(JSON.stringify(logindata));
};

function get_main() {                
    var request = new XMLHttpRequest();
    request.open('GET', 'main.cgi');
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                document.getElementById('tm').innerText = response.time;
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(null);
}

function sync_time() {
	set_settings('/action/time/sync',null,'POST');
};

function disk_clearing() {
	var settings = {
		  name: document.getElementById('clearname').value,
	};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/action/disk/clear');
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
	xhr.send(JSON.stringify(settings));
};

function parse_time(response) {                
	document.getElementById('time').value = response.time;
	document.getElementById('settime').value = response.time;
	document.getElementById('sync').checked = response.sync;
	document.getElementById('inttime').value = response.intRTC.time;
	document.getElementById('exttype').value = response.extRTC.type;
	document.getElementById('exttime').value = response.extRTC.time;
	document.getElementById('exttemperature').value = response.extRTC.temperature;
	document.getElementById('extstate').checked = response.extRTC.osc;
	document.getElementById('extverify').checked = response.extRTC.verify;	
}

function get_time() {
	get_settings('/state/time', parse_time);
}

function set_time() {                
    var settings = {
		  time: document.getElementById('settime').value,
	};
	set_settings('/action/time/set',settings,'PUT');
}

function parse_dout_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_dout_state_row();
		document.getElementById('State').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.State[i].addr;
		document.getElementById('State').rows[i+1].cells.namedItem("state").childNodes[0].value = response.State[i].state;
	}
}

function get_dout_state() {
	get_settings('/state/dout', parse_dout_state);
}

function meter_data_table_clear() {
	for (j = document.getElementById('MeterData').rows.length - 1; j > 0 ; j--)
	{
		document.getElementById('MeterData').deleteRow(j);
	}
}

function ID_search(params) {
	if (document.getElementById('id').value != "")
	{
		var id = parseInt(document.getElementById('id').value);
		params.ids.push(id);
	}
}

function time_search(params) {
	if ( (document.getElementById("STime").value != "") && (document.getElementById("ETime").value != "") )
	{
		var Time = {
			start: parseInt(document.getElementById("STime").value),
			end: parseInt(document.getElementById("ETime").value)
		}
		params.time.push(Time);
	}
	else if (document.getElementById("STime").value != "")
	{
		var Time = {
			start: parseInt(document.getElementById("STime").value)
		}			
		params.time.push(Time);
	}
	else if (document.getElementById("ETime").value != "")
	{
		var Time = {
			end: parseInt(document.getElementById("ETime").value)
		}
		params.time.push(Time);
	}
}

function energy_tag_search(params) {
	if ((document.getElementById("TagAp")) && (document.getElementById("TagAp").checked))
	{
		for (var i = 0; i <= 4; i++) 
		{
			var Tag = "A+" + i;
			params.tags.push(Tag);
		}
	}
	if ((document.getElementById("TagAm")) && (document.getElementById("TagAm").checked))
	{
		for (var i = 0; i <= 4; i++) 
		{
			var Tag = "A-" + i;
			params.tags.push(Tag);
		}
	}
	if ((document.getElementById("TagRp")) && (document.getElementById("TagRp").checked))
	{
		for (var i = 0; i <= 4; i++) 
		{
			var Tag = "R+" + i;
			params.tags.push(Tag);
		}
	}
	if ((document.getElementById("TagRm")) && (document.getElementById("TagRm").checked))
	{
		for (var i = 0; i <= 4; i++) 
		{
			var Tag = "R-" + i;
			params.tags.push(Tag);
		}
	}
}

function pulse_tag_search(params) {
	if ((document.getElementById("TagPls")) && (document.getElementById("TagPls").checked))
	{
		for (var i = 1; i <= 32; i++) 
		{
			var Tag = "Pls" + i;
			params.tags.push(Tag);
		}
	}
}

function quality_tag_search(params) {
	if ((document.getElementById("TagU")) && (document.getElementById("TagU").checked))
	{
		var Tag = "UA";
		params.tags.push(Tag);
		var Tag = "UB";
		params.tags.push(Tag);
		var Tag = "UC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagI")) && (document.getElementById("TagI").checked))
	{
		var Tag = "IA";
		params.tags.push(Tag);
		var Tag = "IB";
		params.tags.push(Tag);
		var Tag = "IC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagP")) && (document.getElementById("TagP").checked))
	{
		var Tag = "PS";
		params.tags.push(Tag);
		var Tag = "PA";
		params.tags.push(Tag);
		var Tag = "PB";
		params.tags.push(Tag);
		var Tag = "PC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagQ")) && (document.getElementById("TagQ").checked))
	{
		var Tag = "QS";
		params.tags.push(Tag);
		var Tag = "QA";
		params.tags.push(Tag);
		var Tag = "QB";
		params.tags.push(Tag);
		var Tag = "QC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagS")) && (document.getElementById("TagS").checked))
	{
		var Tag = "SS";
		params.tags.push(Tag);
		var Tag = "SA";
		params.tags.push(Tag);
		var Tag = "SB";
		params.tags.push(Tag);
		var Tag = "SC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagAng")) && (document.getElementById("TagAng").checked))
	{
		var Tag = "AngAB";
		params.tags.push(Tag);
		var Tag = "AngBC";
		params.tags.push(Tag);
		var Tag = "AngAC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagkP")) && (document.getElementById("TagkP").checked))
	{
		var Tag = "kPS";
		params.tags.push(Tag);
		var Tag = "kPA";
		params.tags.push(Tag);
		var Tag = "kPB";
		params.tags.push(Tag);
		var Tag = "kPC";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagFreq")) && (document.getElementById("TagFreq").checked))
	{
		var Tag = "Freq";
		params.tags.push(Tag);
	}
}

function config_tag_search(params) {
	var Tag = "kU";
	params.tags.push(Tag);
	var Tag = "kI";
	params.tags.push(Tag);
	var Tag = "Const";
	params.tags.push(Tag);
	var Tag = "cTime";
	params.tags.push(Tag);
	var Tag = "isDst";
	params.tags.push(Tag);
	var Tag = "isCons";
	params.tags.push(Tag);
	var Tag = "isClock";
	params.tags.push(Tag);
	var Tag = "isTrf";
	params.tags.push(Tag);
	var Tag = "isAm";
	params.tags.push(Tag);
	var Tag = "isRm";
	params.tags.push(Tag);
	var Tag = "isRp";
	params.tags.push(Tag);
}


function cons_tag_search(params) {
	if ((document.getElementById("TagPp")) && (document.getElementById("TagPp").checked))
	{
		var Tag = "P+";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagPm")) && (document.getElementById("TagPm").checked))
	{
		var Tag = "P-";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagQp")) && (document.getElementById("TagQp").checked))
	{
		var Tag = "Q+";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagQm")) && (document.getElementById("TagQm").checked))
	{
		var Tag = "Q-";
		params.tags.push(Tag);
	}
	if ((document.getElementById("TagFlags")) && (document.getElementById("TagFlags").checked))
	{
		var Tag = "isMeas";
		params.tags.push(Tag);
		var Tag = "isSummer";
		params.tags.push(Tag);
		var Tag = "isOvfl";
		params.tags.push(Tag);
		var Tag = "isPart";
		params.tags.push(Tag);
	}
}

function journal_search(params) {
	var Jrnl = document.getElementById("Jrnl").options[document.getElementById("Jrnl").options.selectedIndex].value;
	params.measures.push(Jrnl);
}

function energy_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			add_meter_data_eng_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A+0" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A+1" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A+2" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A+3" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A+4" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A-0" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A-1" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A-2" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A-3" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "A-4" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R+0" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R+1" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R+2" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R+3" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R+4" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R-0" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R-1" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R-2" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R-3" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "R-4" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
					
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls1" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls2" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls3" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls4" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls5" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Ap4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls6" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls7" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls8" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls9" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls10" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Am4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls11" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls12" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls13" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls14" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls15" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rp4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls16" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm0").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls17" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm1").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls18" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm2").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls19" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm3").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Pls20" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Rm4").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function quality_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {			
			add_meter_data_qual_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "UA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("UA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "UB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("UB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "UC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("UC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "IA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("IA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "IB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("IB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "IC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("IC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "PS" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("PS").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "PA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("PA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "PB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("PB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "PC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("PC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "QS" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("QS").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "QA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("QA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "QB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("QB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "QC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("QC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "SS" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("SS").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "SA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("SA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "SB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("SB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "SC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("SC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "AngAB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("AngAB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "AngBC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("AngBC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "AngAC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("AngAC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kPS" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kPS").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kPA" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kPA").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kPB" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kPB").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kPC" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kPC").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Freq" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Freq").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function config_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {			
			add_meter_data_config_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kU" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kU").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "kI" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("kI").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Const" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Const").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "cTime" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("cTime").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isDst" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isDst").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isCons" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isCons").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isClock" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isClock").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isTrf" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isTrf").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isAm" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isAm").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isRm" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isRm").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isRp" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isRp").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function cons_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {			
			add_meter_data_cons_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "P+" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Pp").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Q+" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Qp").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "P-" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Pm").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "Q-" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("Qm").childNodes[0].value = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isMeas" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isMeas").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isSummer" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isSummer").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isOvfl" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isOvfl").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "isPart" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("isPart").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function journal_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			add_meter_data_journal_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("type").childNodes[0].value = response.measures[0].measure;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "eventId" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("eId").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "event" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("etype").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function relay_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			add_meter_data_relay_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			for ( var k = 0; k < response.measures[0].devices[i].vals[j].tags.length; k++)
			{
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "relayId" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("rId").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
				if ( response.measures[0].devices[i].vals[j].tags[k].tag == "relayState" )
					document.getElementById('MeterData').rows[idx].cells.namedItem("state").childNodes[0].checked = response.measures[0].devices[i].vals[j].tags[k].val;
			}
			idx++;
		}
	}
}

function time_response_parse(response) {
	var idx = 1;
	for (var i = 0; i < response.measures[0].devices.length; i++) {
		for (var j = 0; j < response.measures[0].devices[i].vals.length; j++) {
			add_meter_data_time_row();
			document.getElementById('MeterData').rows[idx].cells.namedItem("id").childNodes[0].value = response.measures[0].devices[i].id;
			document.getElementById('MeterData').rows[idx].cells.namedItem("serial").childNodes[0].value = response.measures[0].devices[i].serial;
			document.getElementById('MeterData').rows[idx].cells.namedItem("time").childNodes[0].value = response.measures[0].devices[i].vals[j].ts;
			document.getElementById('MeterData').rows[idx].cells.namedItem("timediff").childNodes[0].value = response.measures[0].devices[i].vals[j].diff;
			idx++;
		}
	}
}

function get_meter_moment_energy() {  
	var params = {
		ids:[],
		tags:[],
		measures:[]
	};
	params.measures.push("mEng");
	ID_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));				
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_moment_quality() {  
	var params = {
		ids:[],
		tags:[],
		measures:[]
	};
	params.measures.push("mQual");
	ID_search(params);
	quality_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				quality_response_parse(JSON.parse(this.responseText));				
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_energy() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aEng");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_quality() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aQual");
	ID_search(params);
	time_search(params);
	quality_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				quality_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_day() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aDay");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_day_cons() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aDayCons");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_month() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aMonth");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_month_cons() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aMonthCons");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_config() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aCfg");
	ID_search(params);
	time_search(params);
	config_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				config_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_cons() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aCons");
	ID_search(params);
	time_search(params);
	cons_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				cons_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_arch_hour() {  
	var params = {
		ids:[],
		time:[],
		tags:[],
		measures:[]
	};
	params.measures.push("aHour");
	ID_search(params);
	time_search(params);
	energy_tag_search(params);
	pulse_tag_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				energy_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_jrnl() {  
	var params = {
		ids:[],
		time:[],
		measures:[]
	};
	ID_search(params);
	time_search(params);
	journal_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				journal_response_parse(JSON.parse(this.responseText));
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_moment_time() {  
	var params = {
		ids:[],
		measures:[]
	};
	params.measures.push("mTime");
	ID_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				time_response_parse(JSON.parse(this.responseText));				
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function get_meter_moment_relay() {  
	var params = {
		ids:[],
		measures:[]
	};
	params.measures.push("mRelay");
	ID_search(params);
    var request = new XMLHttpRequest();
    request.open('POST', 'meter/data');
	meter_data_table_clear();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
				relay_response_parse(JSON.parse(this.responseText));				
            }
			if (this.status == 403)
			{
				document.location.href = '/';
			}
        }
    }
    request.send(JSON.stringify(params));
}

function parse_time_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_time_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("oldTime").childNodes[0].value = response.Jrnl[i].oldTime;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("newTime").childNodes[0].value = response.Jrnl[i].newTime;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("source").childNodes[0].value = response.Jrnl[i].source;
	}
}

function get_time_jrnl() {
	get_settings('/jrnl/time', parse_time_jrnl);
}

function parse_srv_conn_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_srv_conn_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("server").childNodes[0].value = response.Jrnl[i].server;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("client").childNodes[0].value = response.Jrnl[i].client;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("iface").childNodes[0].value = response.Jrnl[i].iface;
	}
}

function get_srv_conn_jrnl() {
	get_settings('/jrnl/srvconn', parse_srv_conn_jrnl);
}

function parse_ppp_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_ppp_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
	}
}

function get_ppp_srv_conn_jrnl() {
	get_settings('/jrnl/ppp/srvconn', parse_ppp_jrnl);
}

function get_ppp_cl_conn_jrnl() {
	get_settings('/jrnl/ppp/clconn', parse_ppp_jrnl);
}

function parse_modem_diagn(response) {                
	document.getElementById('info').value = response.info;
	document.getElementById('imei').value = response.imei;
	document.getElementById('ccid').value = response.ccid;
	document.getElementById('ops').value = response.ops;
	document.getElementById('creg').value = response.creg;
	document.getElementById('cgreg').value = response.cgreg;
	document.getElementById('csq').value = response.csq;
	document.getElementById('cpin').value = response.cpin;
	document.getElementById('pinRes').checked = response.pinRes;
}

function get_modem_diagn() { 
	get_settings('/state/modem', parse_modem_diagn);    
}

function parse_call_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_call_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("number").childNodes[0].value = response.Jrnl[i].number;
	}
}

function get_call_jrnl() {
	get_settings('/jrnl/call', parse_call_jrnl);
}

function parse_din_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_din_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("sens").childNodes[0].value = response.Jrnl[i].sens;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("state").childNodes[0].value = response.Jrnl[i].state;
	}
}

function get_din_sens_jrnl() {
	get_settings('/jrnl/din/sens', parse_din_jrnl);
}

function get_din_pwrline_jrnl() {
	get_settings('/jrnl/din/pwrline', parse_din_jrnl);
}

function get_din_power_jrnl() {
	get_settings('/jrnl/din/power', parse_din_jrnl);
}

function get_din_charge_jrnl() {
	get_settings('/jrnl/din/charge', parse_din_jrnl);
}

function get_din_open_jrnl() {
	get_settings('/jrnl/din/open', parse_din_jrnl);
}

function parse_json_auth_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_json_auth_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Jrnl[i].login;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("lvl").childNodes[0].value = response.Jrnl[i].lvl;
	}
}

function get_json_auth_jrnl() {
	get_settings('/jrnl/auth/json', parse_json_auth_jrnl);
}

function parse_uart_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_uart_state_row();
		document.getElementById('State').rows[i+1].cells.namedItem("iface").childNodes[0].value = response.State[i].iface;
		document.getElementById('State').rows[i+1].cells.namedItem("lock").childNodes[0].checked = response.State[i].lock;
		document.getElementById('State').rows[i+1].cells.namedItem("task").childNodes[0].value = response.State[i].task;
	}
}

function get_uart_diagn() {
	get_settings('/state/uart', parse_uart_state);
}

function parse_reset_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_reset_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("reason").childNodes[0].value = response.Jrnl[i].reason;
	}
}

function get_reset_jrnl() {
	get_settings('/jrnl/reset', parse_reset_jrnl);
}

function parse_smtp_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_smtp_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idMsg").childNodes[0].value = response.Jrnl[i].idMsg;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idSrv").childNodes[0].value = response.Jrnl[i].idSrv;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idTo").childNodes[0].value = response.Jrnl[i].idTo;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
	}
}

function get_smtp_jrnl() {
	get_settings('/jrnl/mail/send', parse_smtp_jrnl);
}

function parse_mqtt_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_mqtt_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("connect").childNodes[0].value = response.Jrnl[i].connect;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("disconnect").childNodes[0].value = response.Jrnl[i].disconnect;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("address").childNodes[0].value = response.Jrnl[i].address;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("port").childNodes[0].value = response.Jrnl[i].port;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
	}
}

function get_mqtt_jrnl() {
	get_settings('/jrnl/mqtt/connect', parse_mqtt_jrnl);
}
	
	function parse_mqtt_message_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_mqtt_message_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("file").childNodes[0].value = response.Jrnl[i].file;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("topicH").childNodes[0].value = response.Jrnl[i].topicH;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("topicL").childNodes[0].value = response.Jrnl[i].topicL;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("status").childNodes[0].value = response.Jrnl[i].status;
	}
}

function get_mqtt_message_jrnl() {
	get_settings('/jrnl/mqtt/message', parse_mqtt_message_jrnl);
}

function parse_sms_send_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_sms_send_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idMsg").childNodes[0].value = response.Jrnl[i].idMsg;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idTo").childNodes[0].value = response.Jrnl[i].idTo;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("err").childNodes[0].value = response.Jrnl[i].err;
	}
}

function get_sms_send_jrnl() {
	get_settings('/jrnl/sms/send', parse_sms_send_jrnl);
}

function parse_smtp_message_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_smtp_message_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idMsg").childNodes[0].value = response.Jrnl[i].idMsg;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idSrv").childNodes[0].value = response.Jrnl[i].idSrv;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idTo").childNodes[0].value = response.Jrnl[i].idTo;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("action").childNodes[0].value = response.Jrnl[i].action;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
	}
}

function get_smtp_message_jrnl() {
	get_settings('/jrnl/mail/msg', parse_smtp_message_jrnl);
}

function parse_sms_message_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_sms_message_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idMsg").childNodes[0].value = response.Jrnl[i].idMsg;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idTo").childNodes[0].value = response.Jrnl[i].idTo;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("action").childNodes[0].value = response.Jrnl[i].action;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("res").childNodes[0].value = response.Jrnl[i].res;
	}
}

function get_sms_message_jrnl() {
	get_settings('/jrnl/sms/msg', parse_sms_message_jrnl);
}

function parse_version_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_version_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("version").childNodes[0].value = response.Jrnl[i].version;
	}
}

function get_version_jrnl() {
	get_settings('/jrnl/update/version', parse_version_jrnl);
}

function parse_loader_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_loader_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("status").childNodes[0].value = response.Jrnl[i].status;
	}
}

function get_loader_jrnl() {
	get_settings('/jrnl/update/loader', parse_loader_jrnl);
}

function parse_meter_answ_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_meter_answ_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("idMeter").childNodes[0].value = response.Jrnl[i].idMeter;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Jrnl[i].type;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Jrnl[i].addr;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("iface").childNodes[0].value = response.Jrnl[i].iface;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("answer").childNodes[0].checked = response.Jrnl[i].answer;
	}
}

function get_meter_answ_jrnl() {
	get_settings('/jrnl/meter/answ', parse_meter_answ_jrnl);
}

function parse_schdl_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		var j;
		for (j = 1; j < document.getElementById('Settings').rows.length; j++) {
			if ( document.getElementById('Settings').rows[j].cells.namedItem("id").childNodes[0].value == response.State[i].id )
			{
				document.getElementById('Settings').rows[j].cells.namedItem("time").childNodes[0].value = response.State[i].time;
				break;
			}
		}
		if ( j == document.getElementById('Settings').rows.length )
		{					
			add_schdl_event_row();
			document.getElementById('Settings').rows[j].cells.namedItem("id").childNodes[0].value = response.State[i].id;
			document.getElementById('Settings').rows[j].cells.namedItem("time").childNodes[0].value = response.State[i].time;
		}
	}
}

function get_schdl_state() {
	get_settings('/state/schdl', parse_schdl_state);
}

function parse_socket_state(response) {
	document.getElementById('num').value = response.num;         
	for (var i = 0; i < response.State.length; i++) {
		{
			add_socket_info_row();
			document.getElementById('Socket').rows[i+1].cells.namedItem('id').childNodes[0].value = response.State[i].id;
			if ( response.State[i].sock )
				document.getElementById('Socket').rows[i+1].cells.namedItem('sock').childNodes[0].value = response.State[i].sock;
			if ( response.State[i].peer )							
				document.getElementById('Socket').rows[i+1].cells.namedItem('peer').childNodes[0].value = response.State[i].peer;
		}
	}
}

function get_socket_state() {
	get_settings('/state/socket', parse_socket_state);
}

function parse_network_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_netif_info_row();
		document.getElementById('NetIf').rows[i+1].cells.namedItem('name').childNodes[0].value = response.State[i].name;
		document.getElementById('NetIf').rows[i+1].cells.namedItem('ipaddr').childNodes[0].value = response.State[i].ipaddr;
		document.getElementById('NetIf').rows[i+1].cells.namedItem('netmask').childNodes[0].value = response.State[i].netmask;
		document.getElementById('NetIf').rows[i+1].cells.namedItem('gateway').childNodes[0].value = response.State[i].gateway;
		document.getElementById('NetIf').rows[i+1].cells.namedItem('hostname').childNodes[0].value = response.State[i].hostname;
		document.getElementById('NetIf').rows[i+1].cells.namedItem('link').childNodes[0].checked = response.State[i].link;
	}
}

function get_network_state() {
	get_settings('/state/network', parse_network_state);
}

function parse_dataflash_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_dataflash_info_row();
		document.getElementById('State').rows[i+1].cells.namedItem('id').childNodes[0].value = response.State[i].id;
		document.getElementById('State').rows[i+1].cells.namedItem('sectors').childNodes[0].value = response.State[i].sectors;
		document.getElementById('State').rows[i+1].cells.namedItem('size').childNodes[0].value = response.State[i].size;
		document.getElementById('State').rows[i+1].cells.namedItem('type').childNodes[0].value = response.State[i].type;
	}
}

function get_dataflash_state() {
	get_settings('/state/dataflash', parse_dataflash_state);
}

function parse_file_system_state(response) {
	document.getElementById('ssize').value = response.ssize;      
	for (var i = 0; i < response.State.length; i++) {
		add_file_system_diagn_row();
		document.getElementById('State').rows[i+1].cells.namedItem('num').childNodes[0].value = response.State[i].num;
		document.getElementById('State').rows[i+1].cells.namedItem('info').childNodes[0].value = response.State[i].info;			
		document.getElementById('State').rows[i+1].cells.namedItem('size').childNodes[0].value = response.State[i].size;
		document.getElementById('State').rows[i+1].cells.namedItem('free').childNodes[0].value = response.State[i].free;
	}
}

function get_file_system_state() {
	get_settings('/state/file_system', parse_file_system_state);
}

function parse_os_state(response) {
	document.getElementById('osname').value = response.osname;				
	document.getElementById('heapmin').value = response.heapmin;
	document.getElementById('heapfree').value = response.heapfree;
	document.getElementById('osruntime').value = response.osruntime;
	for (var i = 0; i < response.State.length; i++) {
		add_process_info_row();
		document.getElementById('State').rows[i+1].cells.namedItem('id').childNodes[0].value = response.State[i].id;
		document.getElementById('State').rows[i+1].cells.namedItem('name').childNodes[0].value = response.State[i].name;			
		document.getElementById('State').rows[i+1].cells.namedItem('state').childNodes[0].value = response.State[i].state;
		document.getElementById('State').rows[i+1].cells.namedItem('priority').childNodes[0].value = response.State[i].priority;
		document.getElementById('State').rows[i+1].cells.namedItem('stacksize').childNodes[0].value = response.State[i].stacksize;
		document.getElementById('State').rows[i+1].cells.namedItem('stackfree').childNodes[0].value = response.State[i].stackfree;
		document.getElementById('State').rows[i+1].cells.namedItem('stackmin').childNodes[0].value = response.State[i].stackmin;
		document.getElementById('State').rows[i+1].cells.namedItem('runtime').childNodes[0].value = response.State[i].runtime;
	}
}

function get_os_state() {
	get_settings('/state/os', parse_os_state);
}

function parse_system_state(response) {
	document.getElementById('fwver').value = response.fw;				
	document.getElementById('blver').value = response.bl;
	document.getElementById('rev').value = response.SystemInfo.REV;				
	document.getElementById('modem').value = response.SystemInfo.MODEM;
	document.getElementById('bat').value = response.SystemInfo.BAT;				
	document.getElementById('mac').value = response.SystemInfo.MAC;
	document.getElementById('serial').value = response.SystemInfo.SN;				
	document.getElementById('power').value = response.SystemInfo.MAIN_PWR;
	document.getElementById('df').value = response.SystemInfo.DF;
	document.getElementById('if').value = response.SystemInfo.IF;
	document.getElementById('date').value = response.SystemInfo.DATE;				
}

function get_system_state() {
	get_settings('/state/system', parse_system_state);
}

function parse_meter_table(response) {
	document.getElementById('curSize').value = response.curSize;
	document.getElementById('electricSize').value = response.maxSize.electric;
	document.getElementById('pulseSize').value = response.maxSize.pulse;
}

function get_meter_table_state() {
	get_settings('/state/meter_table', parse_meter_table);
}

function parse_json_auth_settings(response) {
	for (var i = 0; i < response.Settings.length; i++) {
		add_json_auth_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Settings[i].login;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("lvl").childNodes[0].value = response.Settings[i].lvl;
	}
}

function get_json_auth_settings() {
	get_settings('/settings/proto/json/auth', parse_json_auth_settings);
}

function set_json_auth_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					login: document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value,
					password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,
					lvl: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("lvl").childNodes[0].value), 					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/proto/json/auth',settings,'PUT');
};

function del_json_auth_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 				
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/proto/json/auth',settings,'DELETE');
};

function parse_text_proto_auth_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_text_proto_auth_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("lvl").childNodes[0].value = response.Settings[i].lvl;
	}
}

function get_text_proto_auth_settings() {
	get_settings('/settings/proto/text/auth', parse_text_proto_auth_settings);
}

function set_text_proto_auth_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,
					lvl: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("lvl").childNodes[0].value), 					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/proto/text/auth',settings,'PUT');
};

function del_text_proto_auth_settings() {
	del_settings('/settings/proto/text/auth');
};

function parse_rtu_proto_auth_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_rtu_proto_auth_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
	}
}

function get_rtu_proto_auth_settings() {
	get_settings('/settings/proto/rtu/auth', parse_rtu_proto_auth_settings);
}

function set_rtu_proto_auth_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/proto/rtu/auth',settings,'PUT');
};

function del_rtu_proto_auth_settings() {
	del_settings('/settings/proto/rtu/auth');
};

function parse_text_proto_mail_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_text_proto_mail_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;
		document.getElementById('Settings').rows[i+1].cells.namedItem("depth").childNodes[0].value = response.Settings[i].depth;
	}
}

function get_text_proto_mail_settings() {
	get_settings('/settings/proto/text/mail', parse_text_proto_mail_settings);
}

function set_text_proto_mail_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					type: document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value,
					depth: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("depth").childNodes[0].value), 					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/proto/text/mail',settings,'PUT');
};

function del_text_proto_mail_settings() {
	del_settings('/settings/proto/text/mail');
};

function parse_text_proto_data_settings(response) {
	document.getElementById('tariff').value = response.tariff;
	document.getElementById('ap').checked = response.ap;
	document.getElementById('am').checked = response.am;
	document.getElementById('rp').checked = response.rp;
	document.getElementById('rm').checked = response.rm;
	document.getElementById('qual').checked = response.qual;
}

function get_text_proto_data_settings() {
	get_settings('/settings/proto/text/data', parse_text_proto_data_settings);
}

function set_text_proto_data_settings() {
	var settings = { 					
		tariff: parseInt(document.getElementById('tariff').value),
		ap: document.getElementById('ap').checked,
		am: document.getElementById('am').checked,
		rp: document.getElementById('rp').checked,
		rm: document.getElementById('rm').checked,
		qual: document.getElementById('qual').checked
	}
	set_settings('/settings/proto/text/data',settings,'PUT');
};

function del_text_proto_data_settings() {
	del_settings('/settings/proto/text/data');
};

function parse_ip_settings(response) {
	document.getElementById('ipaddr').value = response.ip;
	document.getElementById('netmask').value = response.netmask;
	document.getElementById('gateway').value = response.gw;
	document.getElementById('dns1').value = response.dns1;
	document.getElementById('dns2').value = response.dns2;
	document.getElementById('dhcp').checked = response.dhcp;
	document.getElementById('hostname').value = response.hostname;
}

function get_ip_settings() {
	get_settings('/settings/ip', parse_ip_settings);
}

function set_ip_settings() {
	var settings = {
		  ip: document.getElementById('ipaddr').value,
		  netmask: document.getElementById('netmask').value,
		  gw: document.getElementById('gateway').value,
		  dns1: document.getElementById('dns1').value,
		  dns2: document.getElementById('dns2').value,
		  dhcp: document.getElementById('dhcp').checked,
		  hostname: document.getElementById('hostname').value
	};
	set_settings('/settings/ip',settings,'PUT');
};

function parse_uart_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_uart_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("iface").childNodes[0].value = response.Settings[i].iface;
		document.getElementById('Settings').rows[i+1].cells.namedItem("line").childNodes[0].value = response.Settings[i].line;
		document.getElementById('Settings').rows[i+1].cells.namedItem("br").childNodes[0].value = response.Settings[i].br;
		document.getElementById('Settings').rows[i+1].cells.namedItem("size").childNodes[0].value = response.Settings[i].size;
		document.getElementById('Settings').rows[i+1].cells.namedItem("parity").childNodes[0].value = response.Settings[i].parity;
		document.getElementById('Settings').rows[i+1].cells.namedItem("stop").childNodes[0].value = response.Settings[i].stop;
	}
}

function get_uart_settings() {
	get_settings('/settings/uart', parse_uart_settings);
}

function set_uart_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{
			var setting = { 
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					iface: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("iface").childNodes[0].value),					
					br: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("br").childNodes[0].value),
					size: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("size").childNodes[0].value),
					parity: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("parity").childNodes[0].value),
					stop: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("stop").childNodes[0].value),
					line: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("line").childNodes[0].value)
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/uart',settings,'PUT');
};

function del_uart_settings() {
	del_settings('/settings/uart');
};

function parse_din_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_din_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("filter").childNodes[0].value = response.Settings[i].filter;
		document.getElementById('Settings').rows[i+1].cells.namedItem("dstate").childNodes[0].value = response.Settings[i].state;
	} 
}

function get_din_settings() {
	get_settings('/settings/din', parse_din_settings);
}

function set_din_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value,
					filter: document.getElementById('Settings').rows[i+1].cells.namedItem("filter").childNodes[0].value,
					state: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("dstate").childNodes[0].value), 					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/din',settings,'PUT');
};

function del_din_settings() {
	del_settings('/settings/din');
};

function parse_din_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_din_state_row();
		document.getElementById('State').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.State[i].addr;
		document.getElementById('State').rows[i+1].cells.namedItem("state").childNodes[0].value = response.State[i].state;
	} 
}

function get_din_state() {
	get_settings('/state/din', parse_din_state);
}

function parse_ain_state(response) {                
	for (var i = 0; i < response.State.length; i++) {
		add_ain_state_row();
		document.getElementById('State').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.State[i].addr;
		document.getElementById('State').rows[i+1].cells.namedItem("state").childNodes[0].value = response.State[i].state;
	} 
}

function get_ain_state() {
	get_settings('/state/ain', parse_ain_state);
}

function parse_dout_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_dout_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("state").childNodes[0].value = response.Settings[i].state;
	}
}

function get_dout_settings() {
	get_settings('/settings/dout', parse_dout_settings);
}

function set_dout_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value,
					state: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("state").childNodes[0].value),					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/dout',settings,'PUT');
};

function del_dout_settings() {
	del_settings('/settings/dout');
};

function parse_local_time_settings(response) {                
	document.getElementById('tz').value = response.tz;
	document.getElementById('dst').checked = response.dst;
}

function get_local_time_settings() {
	get_settings('/settings/time/local', parse_local_time_settings);
}

function set_local_time_settings() {
	var settings = {
		  tz: Number(document.getElementById('tz').value),
		  dst: document.getElementById('dst').checked
	};
	set_settings('/settings/time/local',settings,'PUT');
};

function parse_disk_access_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_disk_access_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("read").childNodes[0].checked = response.Settings[i].read;		
		document.getElementById('Settings').rows[i+1].cells.namedItem("write").childNodes[0].checked = response.Settings[i].write;					
	}
}

function get_disk_access_settings() {
	get_settings('/settings/file_system/access', parse_disk_access_settings);
}

function set_disk_access_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					read: document.getElementById('Settings').rows[i+1].cells.namedItem("read").childNodes[0].checked,
					write: document.getElementById('Settings').rows[i+1].cells.namedItem("write").childNodes[0].checked,					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/file_system/access',settings,'PUT');
};

function del_disk_access_settings() {
	del_settings('/settings/file_system/access');
};

function parse_modem_settings(response) {                
	document.getElementById('access').value = response.access;
	document.getElementById('pin').value = response.pin;
}

function get_modem_settings() {
	get_settings('/settings/modem', parse_modem_settings);
}

function set_modem_settings() {
	var settings = {
		  access: document.getElementById('access').value,
		  pin: document.getElementById('pin').value,
	};
	set_settings('/settings/modem',settings,'PUT');
};

function parse_apn_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_apn_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("auth").childNodes[0].checked = response.Settings[i].auth;
		document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Settings[i].login;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("enable").childNodes[0].checked = response.Settings[i].enable;
	}
}

function get_apn_settings() {
	get_settings('/settings/modem/apn', parse_apn_settings);
}

function set_apn_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value,
					auth: document.getElementById('Settings').rows[i+1].cells.namedItem("auth").childNodes[0].checked,			
					login: document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value,					
					password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,			
					enable: document.getElementById('Settings').rows[i+1].cells.namedItem("enable").childNodes[0].checked,			
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/modem/apn',settings,'PUT');
};

function del_apn_settings() {
	del_settings('/settings/modem/apn');
};

function parse_csd_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_csd_settings_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("server").childNodes[0].value = response.Settings[i].server;
		document.getElementById('Settings').rows[i+1].cells.namedItem("peer").childNodes[0].value = response.Settings[i].peer;
		document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Settings[i].login;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("enable").childNodes[0].checked = response.Settings[i].enable;
	}
}

function get_csd_settings() {
	get_settings('/settings/modem/csd', parse_csd_settings);
}

function set_csd_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					server: document.getElementById('Settings').rows[i+1].cells.namedItem("server").childNodes[0].value,
					peer: document.getElementById('Settings').rows[i+1].cells.namedItem("peer").childNodes[0].value,
					login: document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value,					
					password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,			
					enable: document.getElementById('Settings').rows[i+1].cells.namedItem("enable").childNodes[0].checked,			
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/modem/csd',settings,'PUT');
};

function del_csd_settings() {
	del_settings('/settings/modem/csd');
};

function parse_smtp_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_smtp_srv_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value = response.Settings[i].port;
		document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Settings[i].login;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("authopt").childNodes[0].value = response.Settings[i].authopt;
		document.getElementById('Settings').rows[i+1].cells.namedItem("cropt").childNodes[0].value = response.Settings[i].cropt;
		document.getElementById('Settings').rows[i+1].cells.namedItem("crcheck").childNodes[0].checked = response.Settings[i].crcheck;
		document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value = response.Settings[i].cert;
		document.getElementById('Settings').rows[i+1].cells.namedItem("from").childNodes[0].value = response.Settings[i].from;
	}
}

function get_smtp_settings() {
	get_settings('/settings/servers/smtp', parse_smtp_settings);
}

function set_smtp_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = {	  
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value, 
				port: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value), 
				login: document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value, 
				password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value, 
				authopt: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("authopt").childNodes[0].value), 
				cropt: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("cropt").childNodes[0].value), 
				crcheck: document.getElementById('Settings').rows[i+1].cells.namedItem("crcheck").childNodes[0].checked, 
				cert: document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value,
				from: document.getElementById('Settings').rows[i+1].cells.namedItem("from").childNodes[0].value, 
			}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/servers/smtp',settings,'PUT');
};

function del_smtp_settings() {
	del_settings('/settings/servers/smtp');
};

function parse_sntp_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_sntp_srv_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value = response.Settings[i].port;
	}
}

function get_sntp_settings() {
	get_settings('/settings/servers/sntp', parse_sntp_settings);
}

function set_sntp_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{	
			var setting = { 
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value),
				addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value,
				port: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value), 
			}
		}
		settings.Settings.push(setting);
	}
	set_settings('/settings/servers/sntp',settings,'PUT');
};

function del_sntp_settings() {
	del_settings('/settings/servers/sntp');
};

function parse_tcp_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_http_srv_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;				
		document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value = response.Settings[i].port;
		document.getElementById('Settings').rows[i+1].cells.namedItem("state").childNodes[0].checked = response.Settings[i].state;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;
		document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value = response.Settings[i].cert;
		document.getElementById('Settings').rows[i+1].cells.namedItem("key").childNodes[0].value = response.Settings[i].key;
	}
}

function get_tcp_settings() {
	get_settings('/settings/servers/tcp', parse_tcp_settings);
}

function set_tcp_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = {	  
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				port: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value), 
				state: document.getElementById('Settings').rows[i+1].cells.namedItem("state").childNodes[0].checked, 
				type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value), 
				cert: document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value,
				key: document.getElementById('Settings').rows[i+1].cells.namedItem("key").childNodes[0].value, 
			}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/servers/tcp',settings,'PUT');
};

function del_tcp_settings() {
	del_settings('/settings/servers/tcp');
};

function parse_mqtt_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_mqtt_srv_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
		document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value = response.Settings[i].port;
		document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value = response.Settings[i].login;
		document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value = response.Settings[i].password;
		document.getElementById('Settings').rows[i+1].cells.namedItem("prefix").childNodes[0].value = response.Settings[i].prefix;
		document.getElementById('Settings').rows[i+1].cells.namedItem("deviceID").childNodes[0].value = response.Settings[i].deviceID;
		document.getElementById('Settings').rows[i+1].cells.namedItem("cropt").childNodes[0].value = response.Settings[i].cropt;
		document.getElementById('Settings').rows[i+1].cells.namedItem("crcheck").childNodes[0].checked = response.Settings[i].crcheck;
		document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value = response.Settings[i].cert;
	}
}

function get_mqtt_settings() {
	get_settings('/settings/servers/mqtt', parse_mqtt_settings);
}

function set_mqtt_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = {	  
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				type: document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value,
				addr: document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value, 
				port: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("port").childNodes[0].value), 
				login: document.getElementById('Settings').rows[i+1].cells.namedItem("login").childNodes[0].value, 
				password: document.getElementById('Settings').rows[i+1].cells.namedItem("password").childNodes[0].value,
				prefix: document.getElementById('Settings').rows[i+1].cells.namedItem("prefix").childNodes[0].value,
				deviceID: document.getElementById('Settings').rows[i+1].cells.namedItem("deviceID").childNodes[0].value,
				cropt: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("cropt").childNodes[0].value), 
				crcheck: document.getElementById('Settings').rows[i+1].cells.namedItem("crcheck").childNodes[0].checked, 
				cert: document.getElementById('Settings').rows[i+1].cells.namedItem("cert").childNodes[0].value,
			}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/servers/mqtt',settings,'PUT');
};


function del_tcp_settings() {
	del_settings('/settings/servers/mqtt');
};

function parse_address_book(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_address_book_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		if ( response.Settings[i].Email[0] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("email1").childNodes[0].value = response.Settings[i].Email[0];
		if ( response.Settings[i].Email[1] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("email2").childNodes[0].value = response.Settings[i].Email[1];
		if ( response.Settings[i].Tel[0] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("tel1").childNodes[0].value = response.Settings[i].Tel[0];
		if ( response.Settings[i].Tel[1] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("tel2").childNodes[0].value = response.Settings[i].Tel[1];
	}
}

function get_address_book() {
	get_settings('/settings/address', parse_address_book);
}

function set_address_book() {
	var settings = {
		Settings:[]		
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value),
				Email:[],
				Tel:[]									
			}			
			var mail = document.getElementById('Settings').rows[i+1].cells.namedItem("email1").childNodes[0].value;
			setting.Email.push(mail);
			var mail = document.getElementById('Settings').rows[i+1].cells.namedItem("email2").childNodes[0].value;
			setting.Email.push(mail);
			var tel = document.getElementById('Settings').rows[i+1].cells.namedItem("tel1").childNodes[0].value;
			setting.Tel.push(tel);
			var tel = document.getElementById('Settings').rows[i+1].cells.namedItem("tel2").childNodes[0].value;
			setting.Tel.push(tel);
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/address',settings,'PUT');
};

function del_address_book() {
	del_settings('/settings/address');
};

function parse_custom_messages(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_custom_message_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msg").childNodes[0].value = response.Settings[i].msg;
	}
}

function get_custom_messages() {
	get_settings('/settings/messages/custom', parse_custom_messages);
}

function set_custom_messages() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value), 
					msg: document.getElementById('Settings').rows[i+1].cells.namedItem("msg").childNodes[0].value, 					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/messages/custom',settings,'PUT');
};

function del_custom_messages() {
	del_settings('/settings/messages/custom');
};

function parse_meter_messages(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_meter_message_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("depth").childNodes[0].value = response.Settings[i].depth;
		document.getElementById('Settings').rows[i+1].cells.namedItem("proto").childNodes[0].value = response.Settings[i].proto;
		if ( response.Settings[i].MeterId[0] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("MeterId").childNodes[0].value = response.Settings[i].MeterId[0];
		if ( response.Settings[i].Measure[0] )
			document.getElementById('Settings').rows[i+1].cells.namedItem("Measure").childNodes[0].value = response.Settings[i].Measure[0];
	}
}

function get_meter_messages() {
	get_settings('/settings/messages/meter', parse_meter_messages);
}

function set_meter_messages() {
	var settings = {
		Settings:[]
	};
	for ( idx = 0; idx < document.getElementById("Settings").rows.length - 1; idx++ )
	{
		if (document.getElementById('Settings').rows[idx+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[idx+1].cells.namedItem("id").childNodes[0].value), 
					depth: parseInt(document.getElementById('Settings').rows[idx+1].cells.namedItem("depth").childNodes[0].value),
					proto: parseInt(document.getElementById('Settings').rows[idx+1].cells.namedItem("proto").childNodes[0].value),
					MeterId:[],
					Measure:[],
					Tag:[]
			}
			if ( document.getElementById('Settings').rows[idx+1].cells.namedItem("MeterId").childNodes[0] != "" )
			{
				var id = document.getElementById('Settings').rows[idx+1].cells.namedItem("MeterId").childNodes[0].value;
				setting.MeterId.push(id);
			}
			var Measure = document.getElementById('Settings').rows[idx+1].cells.namedItem("Measure").childNodes[0].value;
			setting.Measure.push(Measure);
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/messages/meter',settings,'PUT');
};

function del_meter_messages() {
	del_settings('/settings/messages/meter');
};

function parse_meter_arch_messages(response) { 
	var outCnt = 0;
	for (var i = 0; i < response.Settings.length; i++) {
		add_meter_arch_device_row();
		outCnt++;
		document.getElementById('Settings').rows[outCnt].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[outCnt].cells.namedItem("deviceType").childNodes[0].value = response.Settings[i].type;
		document.getElementById('Settings').rows[outCnt].cells.namedItem("size").childNodes[0].value = response.Settings[i].size;
		document.getElementById('Settings').rows[outCnt].cells.namedItem("free").childNodes[0].value = response.Settings[i].free;
		for ( var j = 0; j < response.Settings[i].Storages.length; j++)
		{
			add_meter_arch_settings_row();
			outCnt++;
			document.getElementById('Settings').rows[outCnt].cells.namedItem("type").childNodes[0].value = response.Settings[i].Storages[j].type;
			document.getElementById('Settings').rows[outCnt].cells.namedItem("depth").childNodes[0].value = response.Settings[i].Storages[j].depth;
		}
	}
}

function get_meter_arch_settings() {
	get_settings('/settings/meter/arch', parse_meter_arch_messages);
}

function set_meter_arch_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if ( (document.getElementById('Settings').rows[i+1].cells.namedItem("id") != null) &&
			(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "") )
		{			
			var setting = { 					
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("deviceType").childNodes[0].value),
				Storages:[]
			}
			for ( j = i + 1; j < document.getElementById("Settings").rows.length - 1; j++ )
			{
				if (document.getElementById('Settings').rows[j+1].cells.namedItem("id") != null)
					break;
				if (document.getElementById('Settings').rows[j+1].cells.namedItem("type").childNodes[0].value == 255)
					continue;
				var storage = {
					type: parseInt(document.getElementById('Settings').rows[j+1].cells.namedItem("type").childNodes[0].value),
					depth: parseInt(document.getElementById('Settings').rows[j+1].cells.namedItem("depth").childNodes[0].value),
				}
				setting.Storages.push(storage);
			}			
			settings.Settings.push(setting);
		}		
	}
	set_settings('/settings/meter/arch',settings,'PUT');
};

function del_meter_arch_settings() {
	del_settings('/settings/meter/arch');
};

function parse_meter_tables(response) {                
	for (var i = 0; i < response.Meters.length; i++) {
		add_meter_row();
		document.getElementById('Meters').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Meters[i].id;
		document.getElementById('Meters').rows[i+1].cells.namedItem("pId").childNodes[0].value = response.Meters[i].pId;
		document.getElementById('Meters').rows[i+1].cells.namedItem("archId").childNodes[0].value = response.Meters[i].archId;
		document.getElementById('Meters').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Meters[i].type;					
		document.getElementById('Meters').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Meters[i].addr;
		document.getElementById('Meters').rows[i+1].cells.namedItem("passRd").childNodes[0].value = response.Meters[i].passRd;
		document.getElementById('Meters').rows[i+1].cells.namedItem("passWr").childNodes[0].value = response.Meters[i].passWr;
		document.getElementById('Meters').rows[i+1].cells.namedItem("iface").childNodes[0].value = response.Meters[i].iface;
		document.getElementById('Meters').rows[i+1].cells.namedItem("line").childNodes[0].value = response.Meters[i].line;
		document.getElementById('Meters').rows[i+1].cells.namedItem("br").childNodes[0].value = response.Meters[i].br;
		if ( response.Meters[i].size )
			document.getElementById('Meters').rows[i+1].cells.namedItem("size").childNodes[0].value = response.Meters[i].size;
		if ( response.Meters[i].parity )
			document.getElementById('Meters').rows[i+1].cells.namedItem("parity").childNodes[0].value = response.Meters[i].parity;
		if ( response.Meters[i].stop )
			document.getElementById('Meters').rows[i+1].cells.namedItem("stop").childNodes[0].value = response.Meters[i].stop;
		if ( response.Meters[i].rtuObjType )
			document.getElementById('Meters').rows[i+1].cells.namedItem("rtuObjType").childNodes[0].value = response.Meters[i].rtuObjType;
		if ( response.Meters[i].rtuObjNum )
			document.getElementById('Meters').rows[i+1].cells.namedItem("rtuObjNum").childNodes[0].value = response.Meters[i].rtuObjNum;
		if ( response.Meters[i].rtuFider )
			document.getElementById('Meters').rows[i+1].cells.namedItem("rtuFider").childNodes[0].value = response.Meters[i].rtuFider;
	}
}

function get_meter_table() {
	get_settings('/settings/meter/table', parse_meter_tables);
}

function set_meter_table() {
	var settings = {
		Meters:[]
	};
	for ( i = 0; i < document.getElementById("Meters").rows.length - 1; i++ )
	{
		if (document.getElementById('Meters').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{
			var setting = { 
					id: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("id").childNodes[0].value),
					pId: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("pId").childNodes[0].value),
					archId: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("archId").childNodes[0].value), 
					type: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("type").childNodes[0].value),
					addr: document.getElementById('Meters').rows[i+1].cells.namedItem("addr").childNodes[0].value,
					passRd: document.getElementById('Meters').rows[i+1].cells.namedItem("passRd").childNodes[0].value,
					passWr: document.getElementById('Meters').rows[i+1].cells.namedItem("passWr").childNodes[0].value,
					iface: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("iface").childNodes[0].value),
					line: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("line").childNodes[0].value),
					br: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("br").childNodes[0].value),
					size: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("size").childNodes[0].value),
					parity: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("parity").childNodes[0].value),
					stop: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("stop").childNodes[0].value),
					rtuObjType: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("rtuObjType").childNodes[0].value),
					rtuObjNum: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("rtuObjNum").childNodes[0].value),
					rtuFider: parseInt(document.getElementById('Meters').rows[i+1].cells.namedItem("rtuFider").childNodes[0].value)
				}
			settings.Meters.push(setting);
		}
	}
	set_settings('/settings/meter/table',settings,'PUT');
};

function del_meter_table() {
	del_settings('/settings/meter/table');
};

function parse_din_event_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_din_event_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;					
		document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value = response.Settings[i].addr;
	}
}

function get_din_event_settings() {
	get_settings('/settings/events/din', parse_din_event_settings);
}

function set_din_event_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value),
				addr: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("addr").childNodes[0].value),
			}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/events/din',settings,'PUT');
};

function del_din_event_settings() {
	del_settings('/settings/events/din');
};

function parse_schdl_event_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_schdl_event_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("min").childNodes[0].value = response.Settings[i].min;					
		document.getElementById('Settings').rows[i+1].cells.namedItem("hour").childNodes[0].value = response.Settings[i].hour;					
		document.getElementById('Settings').rows[i+1].cells.namedItem("day").childNodes[0].value = response.Settings[i].day;
		document.getElementById('Settings').rows[i+1].cells.namedItem("delay").childNodes[0].value = response.Settings[i].delay;
		document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value = response.Settings[i].type;
	}
}

function get_schdl_event_settings() {
	get_settings('/settings/events/schdl', parse_schdl_event_settings);
}

function set_schdl_event_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
				id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
				min: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("min").childNodes[0].value),
				hour: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("hour").childNodes[0].value),					
				day: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("day").childNodes[0].value),
				delay: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("delay").childNodes[0].value),
				type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("type").childNodes[0].value),
			}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/events/schdl',settings,'PUT');
};

function del_schdl_event_settings() {
	del_settings('/settings/events/schdl');
};

function parse_meter_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_meter_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("pollType").childNodes[0].value = response.Settings[i].type;
	}
}

function get_meter_action_settings() {
	get_settings('/settings/actions/meter', parse_meter_action_settings);
}

function set_meter_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),
					type: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("pollType").childNodes[0].value),
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/meter',settings,'PUT');
};

function del_meter_action_settings() {
	del_settings('/settings/actions/meter');
};

function parse_smtp_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_smtp_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value = response.Settings[i].msgType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value = response.Settings[i].msgId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("srvId").childNodes[0].value = response.Settings[i].srvId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addrId").childNodes[0].value = response.Settings[i].addrId;
	}
}

function get_smtp_action_settings() {
	get_settings('/settings/actions/smtp', parse_smtp_action_settings);
}

function set_smtp_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),
					msgType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value),		
					msgId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value),			
					srvId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("srvId").childNodes[0].value),
					addrId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("addrId").childNodes[0].value),
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/smtp',settings,'PUT');
};

function del_smtp_action_settings() {
	del_settings('/settings/actions/smtp');
};

function parse_mqtt_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_mqtt_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value = response.Settings[i].msgType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value = response.Settings[i].msgId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("srvId").childNodes[0].value = response.Settings[i].srvId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("topic").childNodes[0].value = response.Settings[i].topic;
	}
}

function get_mqtt_action_settings() {
	get_settings('/settings/actions/mqtt', parse_mqtt_action_settings);
}

function set_mqtt_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),
					msgType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value),		
					msgId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value),			
					srvId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("srvId").childNodes[0].value),
					topic: document.getElementById('Settings').rows[i+1].cells.namedItem("topic").childNodes[0].value,
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/mqtt',settings,'PUT');
};

function del_mqtt_action_settings() {
	del_settings('/settings/actions/mqtt');
};

function parse_sntp_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_sntp_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;	
	}
}

function get_sntp_action_settings() {
	get_settings('/settings/actions/sntp', parse_sntp_action_settings);
}

function set_sntp_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/sntp',settings,'PUT');
};

function del_sntp_action_settings() {
	del_settings('/settings/actions/sntp');
};

function parse_reset_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_reset_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;	
	}
}

function get_reset_action_settings() {
	get_settings('/settings/actions/reset', parse_reset_action_settings);
}

function set_reset_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),					
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/reset',settings,'PUT');
};

function del_reset_action_settings() {
	del_settings('/settings/actions/reset');
};

function set_meter_time() {  
	var params = {
		id: parseInt(document.getElementById('Settings').rows[0].cells[1].childNodes[0].value)
	};
	set_settings('/meter/settings/time',params,'PUT');
}

function set_meter_relay_state() {  
	var params = {
		id: parseInt(document.getElementById('Settings').rows[0].cells[1].childNodes[0].value),
		relayId: parseInt(document.getElementById('Settings').rows[1].cells[1].childNodes[0].value),
		relayState: parseInt(document.getElementById('Settings').rows[2].cells[1].childNodes[0].value),
	};
	set_settings('/meter/settings/relay',params,'PUT');
}

function parse_sms_action_settings(response) {                
	for (var i = 0; i < response.Settings.length; i++) {
		add_sms_action_row();
		document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Settings[i].id;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value = response.Settings[i].eventType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value = response.Settings[i].eventId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value = response.Settings[i].msgType;
		document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value = response.Settings[i].msgId;
		document.getElementById('Settings').rows[i+1].cells.namedItem("addrId").childNodes[0].value = response.Settings[i].addrId;
	}
}

function get_sms_action_settings() {
	get_settings('/settings/actions/sms', parse_sms_action_settings);
}

function set_sms_action_settings() {
	var settings = {
		Settings:[]
	};
	for ( i = 0; i < document.getElementById("Settings").rows.length - 1; i++ )
	{
		if (document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value != "")
		{			
			var setting = { 					
					id: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("id").childNodes[0].value), 
					eventType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventType").childNodes[0].value),
					eventId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("eventId").childNodes[0].value),
					msgType: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgType").childNodes[0].value),			
					msgId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("msgId").childNodes[0].value),			
					addrId: parseInt(document.getElementById('Settings').rows[i+1].cells.namedItem("addrId").childNodes[0].value),
				}
			settings.Settings.push(setting);
		}
	}
	set_settings('/settings/actions/sms',settings,'PUT');
};

function del_sms_action_settings() {
	del_settings('/settings/actions/sms');
};

function parse_sms_get_jrnl(response) {                
	for (var i = 0; i < response.Jrnl.length; i++) {
		add_sms_get_jrnl_row();
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("id").childNodes[0].value = response.Jrnl[i].id;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("time").childNodes[0].value = response.Jrnl[i].time;
		document.getElementById('Jrnl').rows[i+1].cells.namedItem("number").childNodes[0].value = response.Jrnl[i].number;
	}
}

function get_sms_get_jrnl() {
	get_settings('/jrnl/sms/get', parse_sms_get_jrnl);
}

function parse_device_name(response) {
	document.getElementById('name').value = response.name;
}

function get_device_name() {
	get_settings('/settings/name', parse_device_name);
}

function set_device_name() {
	var settings = {
		  name: document.getElementById('name').value,
	};
	set_settings('/settings/name',settings,'PUT');
};

function verify_on() {
	var settings = {
		  state: 'true',
	};
	set_settings('/action/time/check',settings,'POST');
};

function verify_off() {
	var settings = {
		  state: 'false',
	};
	set_settings('/action/time/check',settings,'POST');
};

