const express = require('express');
const router = express.Router();
const mongoose = require('../mk_db.js');
// const mongoose = require('mongoose');


const Region = mongoose.model('Region', new mongoose.Schema({
    id: String,
    name: String,
}));
async function createRegion(name, id) {
    const region = new Region({
        name: name,
        id: id
    });
    await region.save()
        .then( (res) => console.log(res) )
        .catch( (err) => console.log('Something went wrong:', err.errmsg) );
}
// createRegion('Wrocław', 'WRO');
// createRegion('Kraków', 'KRK');


module.exports = router;
module.exports = Region;