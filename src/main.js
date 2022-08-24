let shop = document.getElementById('shop')



let basket = JSON.parse(localStorage.getItem('data')) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map(x => {
      let { id, name, price, desc, img } = x
      let search = basket.find(x => x.id === id) || []
      return `
      <div class="item" id=product-id-${id}>
        <img width="220" src="${img}" alt="">
        <div class="details" id="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>R$ ${price}</h2>
            <div class="buttons">
              <i onclick='decrement(${id})' class="bi bi-dash-square-dotted"></i>
              <div class="quantity" id=${id}>${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick='increment(${id})' class="bi bi-plus-square-fill"></i>
            </div>
          </div>
        </div>
      </div>
    `
    })
    .join(''))
}

generateShop()

let increment = id => {
  let selectedItem = id
  let search = basket.find(x => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1
  }
  //console.log(basket)
  update(selectedItem.id)
  localStorage.setItem('data', JSON.stringify(basket)) // get saved data from your local web storage // It has to be the last line of block.
}

let decrement = id => {
  let selectedItem = id
  let search = basket.find(x => x.id === selectedItem.id)
  
  if (search === undefined) return // return nothing
  else if (search.item === 0) return // return nothing
  else {
    search.item -= 1
  }
  update(selectedItem.id)
  basket = basket.filter(x => x.item !== 0) // select all objects that have items !== of 0, that removes the item from the basket when its counter gets to zero.
  //console.log(basket)
  localStorage.setItem('data', JSON.stringify(basket))
}

let update = id => {
  let search = basket.find(x => x.id === id)
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
}

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0)
}

calculation()
