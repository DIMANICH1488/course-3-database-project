A
id, val
a1, a
a2, a
a3, b
a4, c

AB


B
id, val
b1, a
b2, b
b3, b
b4, d

A INNER JOIN B ON A.val = B.val
(a1, a) (b1, a) +
(a1, a) (b2, b) -
(a1, a) (b3, b) -
(a1, a) (b4, d) -
(a2, a) (b1, a) +
(a2, a) (b2, b) -
(a2, a) (b3, b) -
(a2, a) (b4, d) -
(a3, b) (b1, a) -
(a3, b) (b2, b) +
(a3, b) (b3, b) +
(a3, b) (b4, d) -
(a4, c) (b1, a) -
(a4, c) (b2, b) -
(a4, c) (b3, b) -
(a4, c) (b4, d) -

(a1, a) (b1, a)
(a2, a) (b1, a)
(a3, b) (b2, b)
(a3, b) (b3, b)

A LEFT JOIN B ON A.val = B.val
(a1, a) (b1, a) +
(a1, a) (b2, b) -
(a1, a) (b3, b) -
(a1, a) (b4, d) -

(a2, a) (b1, a) +
(a2, a) (b2, b) -
(a2, a) (b3, b) -
(a2, a) (b4, d) -

(a3, b) (b1, a) -
(a3, b) (b2, b) +
(a3, b) (b3, b) +
(a3, b) (b4, d) -

(a4, c) () +
(a4, c) (b1, a) -
(a4, c) (b2, b) -
(a4, c) (b3, b) -
(a4, c) (b4, d) -