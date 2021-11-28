# Мини-документация по использованию парсера в коде

# Объекты:


# Profile
Параметры:
  1) user_id (int) - айди пользователя
  2) is_ava (bool) - есть ли аватарка у пользователя
  3) created_time (str) - время и дата создания аккаунта
  4) description (str) - описание аккаунта
  5) followers_count (int) - число подписчиков
  6) following_count (int) - число подписок
  
# Post
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


# Функции


# account_from_username(username, dict_view=False)
Аргументы:
   1) username - имя пользователя
   2) dict_view - если указано True, возвращает информацию в виде словаря

Возвращает:
  1) Объект Profile (см. выше) или словарь, если указано dict_view=True

# get_posts(user_id, max_count=100, dict_view=False)
Аргументы:
  1) user_id - айди пользователя
  2) max_count - максимальное кол-во постов
  3) dict_view - если указано True, возвращает информацию в виде словаря

Возвращает:
  1) Список с объектами Post (см. выше) или словарь, если указано dict_view=True

# retrieve_by_username(username, max_count=100)
Аргументы:
  1) username - имя пользователя
  2) max_count - максимальное кол-во постов

Возвращает:
  1) Словарь с информацией о пользователе и постами
