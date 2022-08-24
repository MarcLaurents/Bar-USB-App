

let label = document.getElementById('label')
let shoppingCart = document.getElementById('shoppingCart')
let basket = JSON.parse(localStorage.getItem('data')) || []
// console.log(basket)

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount')
  cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0)
}

calculation()

let generateCartItems = () => {
  if (basket.length !== 0) {
    return shoppingCart.innerHTML = basket.map((x) => {
      return `
        <div className="cartItem"
          <img src="" alt="" />
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