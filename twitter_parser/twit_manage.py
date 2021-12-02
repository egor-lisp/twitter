import random

headers = {
    'authority': 'twitter.com',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'x-twitter-client-language': 'en',
    'x-csrf-token': 'fb2e731a51b275a801045ee3eb7fd1ce2098930b3dff0dee044933cc7e29bb93f48ea8ea9665ccada7929b86a7d3fffa0305f5a9c8ab0d55b92f5225f925207948fcc878a569fce8ecf4555d4447f995',
    'sec-ch-ua-mobile': '?0',
    'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
    'content-type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-twitter-active-user': 'yes',
    'sec-ch-ua-platform': '"Windows"',
    'accept': '*/*',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'cookie': 'dnt=1; _ga=GA1.2.1722587588.1635589408; eu_cn=1; lang=en; kdt=t5j8Fx18a03BnfFGyxZoz9BEEq00xIkdEdqyIGyq; at_check=true; mbox=session#75f0572ba3754e0cb0ed57adeb04de58#1635601385|PC#75f0572ba3754e0cb0ed57adeb04de58.34_0#1698844326; guest_id_marketing=v1%3A163559789608820199; guest_id_ads=v1%3A163559789608820199; _gid=GA1.2.302288954.1637674218; _sl=1; gt=1465182958663438342; personalization_id="v1_gyns80gDuSFSd7v9DIrIIQ=="; guest_id=v1%3A163816328786703468; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCHEfJGp9AToMY3NyZl9p%250AZCIlMTczNTYxYzExMjZlZDRlOWUzYjI0YWQ3NGMyNDY0MzY6B2lkIiU0NmFj%250AZDYxMmE3ZTUxMjljMjI1MmRhODY2MjUzZWE3Ng%253D%253D--b7ece7bab1673d3a0a00b3ca91a84aaf95739c1c; g_state={"i_l":0}; auth_token=25a686a0985f1648f6165acc11112da873a95726; ct0=fb2e731a51b275a801045ee3eb7fd1ce2098930b3dff0dee044933cc7e29bb93f48ea8ea9665ccada7929b86a7d3fffa0305f5a9c8ab0d55b92f5225f925207948fcc878a569fce8ecf4555d4447f995; twid=u%3D1461980982861570049; att=1-pp84QqGkdRr9J652sO7iQJrmcEfKqfo9YoWXP9jR',
}

class Twitter_acc():

    def __init__(self):
        self.headers = {}
        # Тут может быть больше значений...


class Accounts():

    def __init__(self):
        self.working_accs = []
        self.banned_accs = []
        self.add_acc(headers)
        self.add_acc('')

    def add_acc(self, headers):
        acc = Twitter_acc()
        acc.headers = headers
        self.working_accs.append(acc)

    def mark_acc(self, acc):
        self.working_accs.remove(acc)
        self.banned_accs.append(acc)
        if len(self.working_accs) == 0:
            exit('No accs')

    def get_random_acc(self):
        acc = random.choice(self.working_accs)
        return acc

