const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Express funziona!');
});

app.listen(3000, () => {
    console.log("server avviato sulla porta 3000");
    
})