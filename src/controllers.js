const express = require('express')

const app = express()

const port = 3100

app.listen(port, () => {
    console.log(`I'am listen heare ${port}`);

}) 