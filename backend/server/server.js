const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../../dist')))
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/students', require('./routes/students'));
app.use('/api/schools', require('./routes/schools'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../', 'index.html'));
});


app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
