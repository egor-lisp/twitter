

# Здесь хранятся адресса запросов
class Twitter_api():

    def __init__(self):
        self.profile_info_url = 'https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName'
        self.posts_url = 'https://twitter.com/i/api/graphql/oFye9u4wTHv8E7oec5UaLA/UserTweets'


    def get_profile_info_params(self, username):
        params = (
            ('variables', '{"screen_name":"'+username+'",\
                "withSafetyModeUserFields":true,"withSuperFollowsUserFields":true}'),
        )
        return params


    def get_posts_params(self, user_id, cursor=None):
        if cursor:
            params = (
                ('variables', '{"userId":"'+str(user_id)+'","count":100,"cursor":"'+cursor+'","withTweetQuoteCount":true,"includePromotedContent":true,"withQuickPromoteEligibilityTweetFields":true,"withSuperFollowsUserFields":true,"withUserResults":true,"withBirdwatchPivots":false,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withVoice":true,"withV2Timeline":false}'),
            )
        else:
            params = (
                ('variables', '{"userId":"'+str(user_id)+'","count":100,"withTweetQuoteCount":true,"includePromotedContent":true,"withQuickPromoteEligibilityTweetFields":true,"withSuperFollowsUserFields":true,"withUserResults":true,"withBirdwatchPivots":false,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withVoice":true,"withV2Timeline":false}'),
            )

        return params
