select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where lower(title) like $1 AND p.author_id != $2
order by date_created ASC;