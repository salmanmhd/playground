SELECT u.id, u.username, u.email, t.title, t.completed
FROM users u
JOIN todos t ON u.id=t.user_id
WHERE u.id = '3';