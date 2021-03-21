import { Fetch } from '../../../../../core/service';
export const actionValues = ['Очистка хранилища','Добавление сообщения','Удаление сообщения'];
export const resValues = ['Успешно','Ошибка ввода/вывода','Внутренняя ошибка','Ошибка физического диска','Не найден файл','Не найден путь к файлу','Некорректный путь к файлу','Диск переполнен','Файл уже открыт','Ошибка файла','Защита от записи','Ошибка логического диска','Диск не доступен','Файловая система не найдена','Файловая система не форматирована','Таймаут','Файл заблокирован','Не хватает памяти ОС','Слишком много открытых файлов','Некорректный параметр'];
export class MessageExchangeStorageService extends Fetch {
  constructor() {
    super('/jrnl/mail/msg');
  }
  getData = (): Promise<any[]> => {
    return super
      .get()
      .then((res) => res.json())
      .then(({ Jrnl }) => Jrnl?.map((jrnl: any) => {
        jrnl.action = actionValues[(jrnl.action as number)];
        jrnl.res = resValues[(jrnl.res as number)];
        return jrnl;
      }));
  }
}