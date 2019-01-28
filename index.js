const express = require('express');

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({
      'data': 'Welcome to POLITICO. Building trust through transparency'
    });
})

app.listen(3000)
console.log('app running on port ', 3000);

module.exports = app;