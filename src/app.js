import http from 'http';

http.createServer((req, res) => {
    console.log('xxx');
    res.end('xxx2');
}).listen(4000, () => {
    console.log('server stared!');
});