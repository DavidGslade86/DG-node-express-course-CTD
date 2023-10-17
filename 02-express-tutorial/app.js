const express = require('express')

const app = express();
const {products} = require("./data.js");
const { is } = require('express/lib/request.js');

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
    res.json({message: "It worked!"});
})

app.get('/api/v1/products', (req, res) => {
    res.json(products);
})

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p => p.id === idToFind));

    if(!product) {
        return res.status(404).json({message: "That product was not found."})
    }

    return res.json(product);
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query;

    const isValidRegEx = (userInput) => {
        try {
            new RegExp(userInput);
            return true;
        } catch (e) {
            return false;
        }
    };

    let sortedProducts = products;

    // Search filter
    if (search) {
        
        sortedProducts = sortedProducts.filter((product) => product.name.startsWith(search));

        if (sortedProducts.length ===0 && isValidRegEx(search)) {
            sortedProducts = products;
            const regex = new RegExp(search, "i");
            sortedProducts = sortedProducts.filter((product) => regex.test(product.name));
        } 
    }

    // Price filter
    if (price) {
        sortedProducts = sortedProducts.filter((product) => product.price <= price);
    }

    // Limit filter
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if (sortedProducts.length === 0) {
        return res.status(404).json({ message: "No products matched your query." });
    }

    res.status(200).json(sortedProducts);
});

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})