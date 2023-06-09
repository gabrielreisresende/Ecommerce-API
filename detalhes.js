// Obtém o ID do produto da URL
const url = new URLSearchParams(window.location.search);
const productId = url.get('id');

// Faz uma solicitação HTTP para obter os detalhes do produto específico
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação HTTP');
    }
    return response.json();
  })
  .then(currentProduct => {
    const productDetailsContainer = document.getElementById('product-details');

    const productDiv = document.createElement('div');
    productDiv.className = 'product-details';

    const img = document.createElement('img');
    img.src = currentProduct.image;

    const title = document.createElement('h3');
    title.textContent = currentProduct.title;

    const price = document.createElement('p');
    price.textContent = `R$: ${currentProduct.price}`;

    const category = document.createElement('p');
    category.textContent = `Category: ${currentProduct.category}`;

    const description = document.createElement('p');
    description.textContent = `Description: ${currentProduct.description}`;

    const comprarButton = document.createElement('button');
    comprarButton.textContent = "Comprar";
    comprarButton.addEventListener('click', () => {
      // Redirecionar para a página de detalhes do produto
      window.location.href = `detalhes.html?id=${currentProduct.id}`;
    });

    productDiv.appendChild(img);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(category);
    productDiv.appendChild(description);
    productDiv.appendChild(comprarButton);

    productDetailsContainer.appendChild(productDiv);

    // Faz uma solicitação HTTP para obter os dados dos produtos da Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
        const relatedProductsContainer = document.getElementById('related-products-container');

        // Filtra os produtos relacionados com base na categoria do produto atual
        const relatedProducts = products.filter(product => product.category === currentProduct.category);

        // Limita o número de produtos relacionados exibidos
        const maxRelatedProducts = 4;
        const displayedRelatedProducts = relatedProducts.slice(0, maxRelatedProducts);

        displayedRelatedProducts.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'related-product';

          const img = document.createElement('img');
          img.src = product.image;
          img.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${product.id}`;
          });

          const title = document.createElement('h4');
          title.textContent = product.title;
          title.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${product.id}`;
          });

          const price = document.createElement('p');
          price.textContent = `R$: ${product.price}`;

          const detailsButton = document.createElement('button');
          detailsButton.textContent = 'Detalhes';
          detailsButton.addEventListener('click', () => {
            // Redirecionar para a página de detalhes do produto
            window.location.href = `detalhes.html?id=${product.id}`;
          });

          productDiv.appendChild(img);
          productDiv.appendChild(title);
          productDiv.appendChild(price);
          productDiv.appendChild(detailsButton)

          relatedProductsContainer.appendChild(productDiv);
        });
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  })
  .catch(error => {
    console.error('Erro:', error);
  });
