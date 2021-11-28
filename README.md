# twitter
Мини-документация по использованию парсера в коде.

Объявление класса:
parser = Twitter_parser()

Функции класса
1) account_from_username(username, dict_view=False)
Параметры:
username - имя пользователя
dict_view - если установлено True, то информация будет в виде словаря
Возвращает:
Информацию о профиле

2) get_posts(user_id, max_count=100, dict_view=False)
Параметры:
user_id - айди пользователя
max_count - максимальное кол-во постов
dict_view - если установлено True, то информация будет в виде словаря
Возвращает:
Информацию о постах

3) retrieve_by_username(username, max_count=100)
Параметры:
username - имя пользователя
max_count - максимальное кол-во постов
Возвращает:
Всю информацию о профиле, включая посты, в виде словаря
