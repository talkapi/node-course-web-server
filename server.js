const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req, resp, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} ${resp.statusCode}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req,resp, next) => {
//     resp.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, resp) => {
    resp.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: 'Hello Tal'
    });
});


app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, resp) => {
    resp.send({
        errorMessage: "Bad Request"
    });
});
app.listen(port, () => {
    console.log('Server is up on port 3000');
});