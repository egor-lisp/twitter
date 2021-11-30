import requests
from twit_manage import headers
from twitter_api import Twitter_api


class Profile():

    def __init__(self):
        self.user_id = None
        self.is_ava = None
        self.created_time = None
        self.description = None
        self.followers_count = None
        self.following_count = None

class Post():

    def __init__(self):
        self.url = None
        self.created_time = None
        self.likes_count = None
        self.retweet_count = None
        self.comment_count = None
        self.text = None
        self.hashtags = []
        self.is_picture = None
        self.is_retweet = None


class Twitter_parser():

    def __init__(self):
        self.update_session()
        self.api = Twitter_api()

    def update_session(self):
        # Устаанавливаем кукисы для запросов
        self.headers = headers

    def dict_from_class(self, class_):
        data = {}
        elems = class_.__dict__.keys()
        for elem in elems:
            data[elem] = class_.__dict__[elem]

        return data

    def account_from_username(self, username, dict_view=False):
        # Класс профиля (см. выше)
        profile = Profile()

        # Параметры
        params = self.api.get_profile_info_params(username)
        self.headers['referer'] = 'https://twitter.com/'+username+'/following'

        response = requests.get(
            self.api.profile_info_url,
            headers=self.headers, params=params)
        json = response.json()

        user = json['data']['user']['result']['legacy']

        profile.user_id = json['data']['user']['result']['rest_id']
        profile.is_ava = not user['default_profile_image']
        profile.created_time = user['created_at']
        profile.description = user['description']
        profile.followers_count = user['followers_count']
        profile.following_count = user['friends_count']

        if dict_view:
            profile = self.dict_from_class(profile)

        return profile

    def get_posts(self, user_id, max_count=100, dict_view=False):
        # Список постов
        posts = []
        work = True
        cursor = None
        username = None

        while work:
            # Параметры
            params = self.api.get_posts_params(user_id, cursor=cursor)

            # Делаем запрос
            response = requests.get(
                self.api.posts_url,
                headers=self.headers, params=params)
            json = response.json()

            piece_posts = json['data']['user']['result']['timeline']['timeline']['instructions'][0]['entries']
            cursor = piece_posts[-1]['content']['value']

            if len(piece_posts) <= 2:
                work = False

            for post in piece_posts:
                publication = Post()

                if 'tweet' in post['entryId']:
                    try:
                        info_block = post['content']['itemContent']['tweet_results']['result']
                        content = info_block['legacy']
                    except:
                        continue

                    if not username:
                        username = info_block['core']['user_results']['result']['legacy']['screen_name']

                    publication.url = 'https://twitter.com/' + username + '/status/' + content['id_str']
                    publication.created_time = content['created_at']
                    publication.likes_count = content['favorite_count']
                    publication.retweet_count = content['retweet_count']
                    publication.comment_count = content['reply_count']
                    publication.text = content['full_text']
                    publication.hashtags = content['entities']['hashtags']

                    # Проверяем, есть ли картника
                    publication.is_picture = False
                    if 'media' in content['entities'].keys():
                        if len(content['entities']['media']) > 0:
                            publication.is_picture = True

                    # Проверяем, ретвит или нет
                    publication.is_retweet = False
                    if 'retweeted_status_result' in content.keys():
                        publication.is_retweet = True

                    if dict_view:
                        publication = self.dict_from_class(publication)

                    posts.append(publication)

                    if len(posts) >= max_count:
                        work = False
                        break

        return posts

    def retrieve_by_username(self, username, max_count=100):
        data = {'user': None, 'posts': None}

        data['user'] = self.account_from_username(username, dict_view=True)

        data['posts'] = self.get_posts(
            data['user']['user_id'],
            max_count=max_count, dict_view=True)

        return data
