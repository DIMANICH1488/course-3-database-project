SELECT
    *
--     u.*,
--     d.info
FROM public.user AS u
FULL JOIN public.driver2 AS d
ON u.user_id = d.user_id AND d.status = 0
-- ON TRUE
ORDER BY u.user_id ASC
;

SELECT
    d2.user_id,
    1 AS "1"
FROM public.driver2 AS d2
;

SELECT
    d2.user_id,
    SUM(1) AS amount
FROM public.driver2 AS d2
GROUP BY d2.user_id
HAVING SUM(1) > 2
;

SELECT
    dd2.user_id,
    dd2.amount
FROM (
     SELECT
        d2.user_id,
        SUM(1) AS amount
    FROM public.driver2 AS d2
    GROUP BY d2.user_id
) AS dd2
WHERE dd2.amount > 2
;