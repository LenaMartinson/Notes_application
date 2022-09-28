# Notes_application

This is exctension for Google Chrome, that gives the opportunity to make notes for every user in LinkedIn.

The main idea is to write a small piece of information (something, that won't be written as official information) about person on his profile. For instance, leadership qualities.

For which users is this the most useful? People, who works with a lot of different specialists, for example HR.
* 

Расширение для Google Chrome, позволяющее создавать заметки на любого пользователя в LinkedIn.

**Запуск**

1. Скачать репозиторий, создать виртуальное окружение и установить в нем все из requirements.txt
2. Для установки расширения надо в Google Chrome Extensions перейти в режим разработчика и загрузить все папку extension_files. После этого расширение будет установлено
3. Запустить файл launch_db.sh в отдельном терминале и оставить так работать
4. Из терминала запустить бэкенд сервер командой python3 manage.py runserver
5. Все, расширение будет работать, можно заходить на LinkedIn и запускать

Все последющие запуски надо выполнять пункты 3-5.
