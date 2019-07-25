const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const itineraries = {}

let i = 0

app.post('/itinerary', (req, res) => {
    // const q = req.query.q;
    // const dest = req.query.dest;
    // const activities = q.split(";").slice(1);

    const data = req.body;

    const id = ++i;

    const it = {
        id,
        data,
        url: `http://localhost:3000/details?it=${id}`
    }

    itineraries[it.id] = it;

    res.json(it);
})


app.get('/details', (req, res) => {
    const it = req.query.it;
    const detail = itineraries[it];
    res.json(detail);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))