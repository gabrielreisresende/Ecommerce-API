// Obtém o ID do produto da URL
const url = new URLSearchParams(window.location.search);
const productId = url.get('id');

// Faz uma solicitação HTTP para obter os detalhes do produto específico
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetailsContainer = document.getElementById('product-details');

        const productDiv = document.createElement('div');
        productDiv.className = 'product-details';

        const img = document.createElement('img');
        img.src = product.image;

        const title = document.createElement('h3');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `R$: ${product.price}`;

        const category = document.createElement('p');
        category.textContent = `Category: ${product.category}`;

        const description = document.createElement('p');
        description.textContent = `Description: ${product.description}`;

        const comprarButton = document.createElement('button');
        comprarButton.textContent = "Comprar";
        comprarButton.addEventListener('click', () => {
            // Redirecionar para a página de detalhes do produto
            window.location.href = `detalhes.html?id=${product.id}`;
        });

        productDiv.appendChild(img);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productDiv.appendChild(category);
        productDiv.appendChild(description);
        productDiv.appendChild(comprarButton);

        productDetailsContainer.appendChild(productDiv);
    });
