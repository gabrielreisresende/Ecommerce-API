// Faz uma solicitação HTTP para obter os dados dos produtos da Fake Store API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        const productsContainer = document.getElementById('products');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        // Função para filtrar os produtos com base na pesquisa
        const filterProducts = () => {
            const searchText = searchInput.value.toLowerCase().trim();

            const filteredProducts = products.filter(product => {
                const productName = product.title.toLowerCase();
                const productCategory = product.category.toLowerCase();

                return (
                    productName.includes(searchText) ||
                    productCategory.includes(searchText)
                );
            });

            renderProducts(filteredProducts);
        };

        // Função para renderizar os produtos
        const renderProducts = (products) => {
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const img = document.createElement('img');
                img.src = product.image;

                const title = document.createElement('h4');
                title.textContent = product.title;

                const price = document.createElement('p');
                price.textContent = `R$: ${product.price}`;

                const category = document.createElement('p');
                category.textContent = `Category: ${product.category}`;

                const detailsButton = document.createElement('button');
                detailsButton.textContent = 'Detalhes';
                detailsButton.addEventListener('click', () => {
                    // Redirecionar para a página de detalhes do produto
                    window.location.href = `detalhes.html?id=${product.id}`;
                });

                productDiv.appendChild(img);
                productDiv.appendChild(title);
                productDiv.appendChild(price);
                productDiv.appendChild(category);
                productDiv.appendChild(detailsButton);

                productsContainer.appendChild(productDiv);
            });
        };

        // Evento de clique no botão de pesquisa
        searchButton.addEventListener('click', filterProducts);

        // Evento de pressionar a tecla Enter no campo de pesquisa
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                filterProducts();
            }
        });

        // Renderizar todos os produtos inicialmente
        renderProducts(products);
    });
