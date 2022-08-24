

let label = document.getElementById('label')
let shoppingCart = document.getElementById('shoppingCart')
let basket = JSON.parse(localStorage.getItem('data')) || []
// console.log(basket)
// console.log(shopItemsData)

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0)
}

calculation()

let generateCartItems = () => {
  if (basket.length !== 0) {
    return shoppingCart.innerHTML = basket.map((x) => {
      console.log(x)
      let { id, item } = x
      let search = shopItemsData.find((y) => y.id === id) || []
      return `
        <div class="cartItem">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="titlePriceX">
              <h4 class="titlePrice">
                <p>${search.name}</p>
                <p class="cartItemPrice">$ ${search.price}</p>
              </h4>
              <i class="bi bi-x-square-fill"></i>
            </div>
            <div class="buttons">
              <i onclick='decrement(${id})' class="bi bi-dash-square-dotted"></i>
              <div class="quantity" id=${id}>
                ${item}
              </div>
              <i onclick='increment(${id})' class="bi bi-plus-square-fill"></i>
            </div>
            <h3>$ ${item * search.price}</h3>
          </div>
        </div>
      `
    }).join('')
    // console.log('basket not empty')
  } else {
    shoppingCart.innerHTML = ``
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="homeButton">HOME</button>
      </a>
    `
    // console.log('basket empty')
  }
}

generateCartItems()

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
  generateCartItems()
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
  generateCartItems()
  localStorage.setItem('data', JSON.stringify(basket))
}

let update = id => {
  let search = basket.find(x => x.id === id)
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
}

let removeItem = id => {
  
}