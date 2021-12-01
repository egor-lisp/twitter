# Мини-документация по использованию парсера в коде

## Объекты:


### Profile
Параметры:
  1) user_id (int) - айди пользователя
  2) is_ava (bool) - есть ли аватарка у пользователя
  3) created_time (str) - время и дата создания аккаунта
  4) description (str) - описание аккаунта
  5) followers_count (int) - число подписчиков
  6) following_count (int) - число подписок
  
### Post
Параметры:
  1) url (str) - ссылка на пост
  2) created_time (str) - время и дата публикации поста
  3) likes_count (int) - число лайков на посте
  4) retweet_count (int) - число ретвитов на посте
  5) comment_count (int) - число комментов на посте
  6) text (str) - текст поста
  7) hashtags (list) - список хештегов поста
  8) is_picture (bool) - есть ли картинка в посте
  9) is_retweet (bool) - ретвит или нет


## Функции


### account_from_username(username, dict_view=False)
Аргументы:
   1) username - имя пользователя
   2) dict_view - если указано True, возвращает информацию в виде словаря

Возвращает:
  1) Объект Profile (см. выше) или словарь, если указано dict_view=True

### get_posts(user_id, max_count=100, dict_view=False)
Аргументы:
  1) user_id - айди пользователя
  2) max_count - максимальное кол-во постов
  3) dict_view - если указано True, возвращает информацию в виде словаря

Возвращает:
  1) Список с объектами Post (см. выше) или словарь, если указано dict_view=True

### retrieve_by_username(username, max_count=100)
Аргументы:
  1) username - имя пользователя
  2) max_count - максимальное кол-во постов

Возвращает:
  1) Словарь с информацией о пользователе и постами


## Примеры
```
from twitter_parser import Twitter_parser

parser = Twitter_parser()
data = parser.retrieve_by_username('advOrrie007', max_count=10)

print(data['user']['description'])

for post in data['posts']:
	post_text = post['text']

	if 'h' in post_text:
		print(post['url'])

```

```
from twitter_parser import Twitter_parser

parser = Twitter_parser()
user = parser.account_from_username('advOrrie007')

print(user.description)
print(user.followers_count)
print(user.following_count)

```

## Описание работы
1) Функция account_from_username()
Тут ничего сложного. Просто делает запрос в твиттер, получает json объект. Потом парсит этот объект, и нужные данные запихивает в класс Profile (см. выше)
Потом возвращает этот класс, если dict_view=False, или с помощью функции dict_from_class делает из класса питоновский словарь и возвращает его.

2) Функция get_post_info()
Возвращает информацию о посте по ссылке.

3) Функция get_posts()
Тут уже посложнее.

Нужно понимать, что выдача твиттера работает так:
1) мы делаем запрос.
>> твиттер выдаёт первые 100 постов
>> твиттер выдаёт ключ для следующего сбора
2) мы делаем запрос используя полученный ключ
>> твиттер выдаёт ещё 100 постов
>> выдаёт ещё ключ
.. И так далее...
И в один момент твиттер просто не выдаёт постов, это значит что все посты уже спарсены

4) Функция retrieve_by_username():
Возвращает словарь с данными о пользователе и постами.
