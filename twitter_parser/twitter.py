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

        response = requests.get(self.api.profile_info_url,
            headers=self.headers, params=params)

        user = response.json()['data']['user']['result']['legacy']

        profile.user_id = response.json()['data']['user']['result']['rest_id']
        profile.is_ava = not user['default_profile_image']
        profile.created_time = user['created_at']
        profile.description = user['description']
        profile.followers_count = user['followers_count']
        profile.following_count = user['friends_count']

        if dict_view == True:
            profile = self.dict_from_class(profile)

        return profile


    def get_posts(self, user_id, max_count=100, dict_view=False):
        # Список постов
        publics = []
        work = True
        cursor = None

        while work:
            # Параметры
            params = self.api.get_posts_params(user_id, cursor=cursor)

            # Делаем запрос
            response = requests.get(self.api.posts_url, headers=self.headers, params=params)

            posts = response.json()['data']['user']['result']['timeline']['timeline']['instructions'][0]['entries']
            cursor = posts[-1]['content']['value']

            for post in posts:
                publication = Post()

                if 'tweet' in post['entryId']:
                    content = post['content']['itemContent']['tweet_results']['result']['legacy']

                    publication.url = 'https://twitter.com/romanuhalov7400/status/'+content['id_str']
                    publication.created_time = content['created_at']
                    publication.likes_count = content['favorite_count']
                    publication.retweet_count = content['retweet_count']
                    publication.comment_count = content['reply_count']
                    publication.text = content['full_text']
                    publication.hashtags = content['entities']['hashtags']
                    # Проверяем, есть ли картника
                    if 'media' in content['entities'].keys():
                        if len(content['entities']['media']) > 0:
                            publication.is_picture = True
                    else:
                        publication.is_picture = False

                    # Проверяем, ретвит или нет
                    if 'retweeted_status_result' in content.keys():
                        publication.is_retweet = True
                    else:
                        publication.is_retweet = False

                    if dict_view == True:
                        publication = self.dict_from_class(publication)

                    publics.append(publication)
                    if len(publics) >= max_count:
                        work = False
                        break

        return publics


    def retrieve_by_username(self, username, max_count=100):
        data = {'user': None, 'posts': None}

        data['user'] = self.account_from_username(username, dict_view=True)
        data['posts'] = self.get_posts(data['user']['user_id'], max_count=max_count, dict_view=True)

        return data
