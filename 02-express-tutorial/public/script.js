document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchValue = document.getElementById('search').value;
    const priceValue = document.getElementById('price').value;
    const limitValue = document.getElementById('limit').value;

    let url = '/api/v1/query?'

    if(searchValue) {
        url += `search=${searchValue}&`
    }
    if(priceValue) {
        url += `price=${priceValue}&`
    }
    if(limitValue) {
        url += `limit=${limitValue}&`
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "";
        data.length > 0 ? 
            data.forEach(product => {
                resultsDiv.innerHTML += `
                    <div>
                        <h2>${product.name}</h2>
                        <h4>Price: ${product.price}</h4>
                        <p>${product.desc}</p>
                    </div>
                `;
            })
            : resultsDiv.innerHTML += `
                <div>
                    <h2>No results found</h2>
                </div>
            `

    })
    .catch(err => {
        console.error("Error getting product:", err);
    });
});