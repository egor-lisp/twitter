from twitter import Twitter_parser

parser = Twitter_parser()
data = parser.retrieve_by_username('advOrrie007', max_count=1000)
