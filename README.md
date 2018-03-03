﻿# Описание

`megaplan_report` - это скрипт, который формирует отчёт по данным из Мегаплана за выбранный временной период.  
`megaplan_config` - это скрипт, который позволяет задать параметры доступа к Мегаплану.


# Предварительные условия

Для работы скриптов необходимо установить Node.js.  
Загрузить и установить Node.js можно c [официального сайта](https://nodejs.org/en/).  
Версия должна быть >= 8.0 (такая и предлагается на офиц.сайте).

Крайне желательно установить Node.js в такую папку, чтобы полный путь к папке не содержал пробелы. Например, `C:\nodejs`.  

После установки для удобства последующего запуска скриптов нужно добавить папку, в кот. установлена Node.js, в переменную PATH. 
Это позволит запускать скрипты с помощь команд след.вида: `node имя_скрипта.js`.  

Кроме того, можно ассоциировать все файлы с расширением `.js` с Node.js. 
Для этого в Windows можно создать пустой файл с расширением js. 
Затем 2 раза щёлкнуть на нём мышкой. Windows спросит, какой программой 
нужно открывать подобные файлы. Нужно указать файл `node.exe` из папки, где установлена Node.js.

**Как проверить, что Node.js правильно установлена?**  
Для этого нужно выполнить следующее:
* Открыть консоль (в Windows нажать Win+R, набрать `cmd` и нажать Enter).
* В консоле выполнить команду `node --version`. В рез-те должна быть напечатал версия Node.js.


# Установка скриптов

* Открыть консоль.
* В консоле выполнить команду: `npm install -g megaplan-reports`

*Проверка установки*:
* В консоле выполнить команду `megaplan_report -h`. 
Должна быть показана справочная информация по параметрам запуска скрипта.


# Генерация отчёта

Для генерации отчёта нужно запустить скрипт `megaplan_report`.  

Скрипту требуется следующая входная инф-ия:
* Сервер Мегаплана, к кот. нужно подключиться
* Имя пользователя
* Пароль
* Временной период, за кот. нужны данные, НАЧАЛО. Запрашивается при запуске. Если не вводить, то используется начало месяца.
* Временной период, за кот. нужны данные, КОНЕЦ. Запрашивается при запуске. Если не вводить, то используется дата/время запуска скрипта.
* Путь к папке, в кот. положить сгенерированный отчёт. По умолчанию, отчёт кладётся в текущую рабочую директория (директорию, из кот. вызван скрипт).

## Запуск скрипта с передачей входной инф-ии через командную строку

Справку по параметрам скрипта можно получить, выполнив в консоли команду `megaplan_report -h`  

Пример команды запуска скрипта генерации отчёта (пароль изменён):  
`megaplan_report --server=mp388616.megaplan.ru --user=theduster3@yandex.ru --password=****** --start=13.02.2018 --end=03.03.2018 --outdir=D:/Temp`


## Запуск скрипта с использованием конфигурационного файла

Скрипт можно запускать проще. Для этого нужно сохранить параметры доступа к Мегаплану в конф.файле.  
Для этого запустите в консоле команду `megaplan_config`. Сохранив параметры доступа, 
вы можете использовать их неограниченное кол-во раз.  
Если нужно будет поменять параметры доступа, запустите повторно `megaplan_config`.  

Для генерации отчёта в консоле зайдите в папку, в кот. вы хотите сохранить отчёт, и просто запустите команду `megaplan_report`  
Скрипт спросит вас о временном периоде. Вы можете не отвечать (просто Enter), тогда будут использованы параметры по умолчанию.  

 
# Обратная связь

По возникающим вопросам можно обратиться: 
* по электронной почте: zangular@yandex.ru
* по телефону: +7-920-293-36-56
  
