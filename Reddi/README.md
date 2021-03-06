Your task is to create a feed displaying the entries from a sub reddit JSON feed. There should be
10 entries per page (limit) and there should also be paging functionality showing ‘Next’ and
‘Previous’ links in the interface to navigate between pages.
Each entry should contain the following:

    thumbnail
    created (as readable date)
    num_comments
    author
    score
    permalink (as a link)
    title

The user should be able to click on an entry to see only that entry, and be able to read the
entries text (selftext).
Bonus:

    Allow user to change what sub reddit the items are fetched from
    Allow user to toggle between 5, 10 or 25 entries. When changing this, the data will be
    refetched from reddit.
    Allow users to read the comments on an entry. To find the comments for an entry, enter an
    entry and add ".json" to the url.
    (e.g. https://www.reddit.com/r/space/comments/4ck9oe/launch_of_sts129_atlantis_circa_2009
    .json)

Super bonus:

    Present the comments in threaded structure like it is done on the reddit page. See an example
    here:
    https://www.reddit.com/r/sweden/comments/756nsu/matlagningsm%C3%A5ndag_cooking_mo
    nday_09_october_2017/

Tech info
Use any javascript framework.
You can fetch entry JSON feed from any sub reddit using this url:
https://www.reddit.com/r/{ SUBREDDIT_NAME }.json
ex. https://www.reddit.com/r/sweden.json

Parameters this url supports are:

limit = (number) Number of entries to fetch (default: 25)
before = (entry id) Show entries before an entry id. (ex before: ”t3_758x8e”)
after = (entry id) Show entries after an entry id. (ex after: ”t3_758x8e”)
ex. https://www.reddit.com/r/sweden.json?limit=25&after=t3_758x8e

There are properties, (after and before) in the JSON response containing entry ids which can be
used for pagination. How you do this is part of the test.
All words marked in bold above are fields that exists in the JSON feed.