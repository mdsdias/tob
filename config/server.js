const express = require('express');
const app = express();
const path = require('path');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendfile(__dirname + '/views/' +'index.html'));

module.exports = () => {
  app.listen(3000,() => console.log('Server running on port 3000'));
};