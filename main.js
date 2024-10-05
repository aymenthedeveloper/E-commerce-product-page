const openbtn = document.querySelector('header .menu-icon');
const closebtn = document.querySelector('header nav .close-icon');
const cartbtn = document.querySelector('header .cart .cart-icon');
const navBar = document.querySelector('header nav');
const thumbnails = document.querySelectorAll('main .image-gallery .thumbnails img');
const countBtn = document.querySelector('main .btns .count-btn')
const addToCartBtn = document.querySelector('main .btns .addToCart');
const cart = document.querySelector('header .cart');
const cartItems = document.querySelector('header .cart .cartItems .items');
const modal = document.getElementById('modal');


openbtn.addEventListener('click', ()=> navBar.classList.add('show'))
closebtn.addEventListener('click', ()=> navBar.classList.remove('show'))
thumbnails.forEach((img)=> img.addEventListener('click', showImage))
countBtn.addEventListener('click', setCount)
cartbtn.addEventListener('click', displayCart)
addToCartBtn.addEventListener('click', addItems)


function openLightBox(event){
  if (innerWidth <= 500){
    if (!event.target.classList.contains('arrow')) return;
    changeImage(event)
    return
  };
  modal.showModal();
}

function showImage(event){
  const id = event.target.dataset.id;
  document.querySelectorAll('.thumbnails img.selected, .main-image img.selected').forEach((img) => img.classList.remove('selected'))
  document.querySelectorAll(`.thumbnails img:nth-child(${id}), .main-image img:nth-child(${id})`).forEach((img) => img.classList.add('selected'))
}

function changeImage(event){
  if (!event.target.classList.contains('arrow')) return;
  let id = document.querySelector('.main-image img.selected').dataset.id;
  if (event.target.classList.contains('left') && id > 1) id--
  else if (event.target.classList.contains('right') && id < 4) id++
  document.querySelectorAll('.thumbnails img.selected, .main-image img.selected').forEach((img) => img.classList.remove('selected'))
  document.querySelectorAll(`.thumbnails img:nth-child(${id}), .main-image img:nth-child(${id})`).forEach((img) => img.classList.add('selected'))
}
function setCount(event){
  let count = +countBtn.children[1].textContent;
  if (event.target.classList.contains('plus')){
    countBtn.children[1].textContent = ++count;
  } else if (event.target.classList.contains('minus') && countBtn.children[1].textContent >= 1) {
    countBtn.children[1].textContent = --count;
  }
}

function displayCart(event){
  cartbtn.nextElementSibling.classList.toggle('show')
}

function addItems(event){
  const count = +countBtn.children[1].textContent;
  if (count == 0) return;
  cartbtn.dataset.count = count;
  const total = document.querySelector('.cart.has-items .cartItems .items .item .info .total');
  if (total === null){
    const item = `
    <div class="item">
      <div class="img">
        <img src="./images/image-product-1-thumbnail.jpg" alt="">
      </div>
      <div class="info">
        <p class="product-name">
          Fall Limited Edition Sneakers      
        </p>
        <p class="total">
          <span class="price">$125.00 x</span>
          <span class="total-count">${count}</span>
          <span class="total-amount">$${(count * 125.00).toFixed(2)}</span>
        </p>
      </div>
      <div class="remove" onclick="removeItem(event)">
        <img src="./images/icon-delete.svg" alt="">
      </div>
    </div>
    `
    cart.classList.add('has-items');
    cartItems.insertAdjacentHTML('afterbegin', item)
  } else {
    total.children[1].textContent = count; // set total count
    total.children[2].textContent = '$' + (count * 125.00).toFixed(2); // set total amount to pay
  }
}

function removeItem(event){
  document.querySelector('.cart.has-items .cartItems .items .item').remove()
  cartbtn.nextElementSibling.classList.toggle('show')
  cart.classList.remove('has-items')
}