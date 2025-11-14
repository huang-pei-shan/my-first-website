// products.js

// 取得 ul 元素
const productList = document.getElementById("product-list");

// 使用 fetch 讀取 JSON
fetch('json/products.json')
  .then(response => response.json())
  .then(data => {
      data.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `編號: ${product.id}, 名稱: ${product.name}`;
          productList.appendChild(li);
      });
  })
  .catch(error => console.error('讀取 JSON 發生錯誤:', error));
