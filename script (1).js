// =======================
// PRODUCTS (Demo Data) — Forced load
// =======================
localStorage.setItem("products", JSON.stringify([
  // SHIRTS
  { id: 1, name: "Male Silver Shirt", category: "Shirts", sub: "Male", price: 15000, img: "https://via.placeholder.com/150/cccccc/000000?text=Silver+Shirt" },
  { id: 2, name: "Female Black Shirt", category: "Shirts", sub: "Female", price: 18000, img: "https://via.placeholder.com/150/000000/ffffff?text=Black+Shirt" },
  { id: 3, name: "Male Blue Shirt", category: "Shirts", sub: "Male", price: 17000, img: "https://via.placeholder.com/150/0000ff/ffffff?text=Blue+Shirt" },
  { id: 4, name: "Female White Blouse", category: "Shirts", sub: "Female", price: 20000, img: "https://via.placeholder.com/150/ffffff/000000?text=White+Blouse" },

  // TROUSERS
  { id: 5, name: "Male Grey Trousers", category: "Trousers", sub: "Male", price: 20000, img: "https://via.placeholder.com/150/888888/000000?text=Grey+Trousers" },
  { id: 6, name: "Female White Trousers", category: "Trousers", sub: "Female", price: 22000, img: "https://via.placeholder.com/150/ffffff/000000?text=White+Trousers" },
  { id: 16, name: "Female Grey Jogger Pants", category: "Trousers", sub: "Female", price: 22000, img: "https://via.placeholder.com/150/888888/000000?text=Grey+Joggers" },

  // JEANS / SKIRTS
  { id: 7, name: "Male Blue Jeans", category: "Jeans", sub: "Male", price: 25000, img: "https://via.placeholder.com/150/0000ff/ffffff?text=Blue+Jeans" },
  { id: 8, name: "Female Black Skirt", category: "Skirts", sub: "Female", price: 18000, img: "https://via.placeholder.com/150/000000/ffffff?text=Black+Skirt" },
  { id: 9, name: "Female Red Skirt", category: "Skirts", sub: "Female", price: 20000, img: "https://via.placeholder.com/150/ff0000/ffffff?text=Red+Skirt" },
  { id: 12, name: "Female Denim Skirt", category: "Skirts", sub: "Female", price: 20000, img: "https://via.placeholder.com/150/0000ff/ffffff?text=Denim+Skirt" },

  // SHORTS
  { id: 10, name: "Male Black Shorts", category: "Shorts", sub: "Male", price: 12000, img: "https://via.placeholder.com/150/000000/ffffff?text=Black+Shorts" },
  { id: 11, name: "Male Khaki Shorts", category: "Shorts", sub: "Male", price: 14000, img: "https://via.placeholder.com/150/c3b091/000000?text=Khaki+Shorts" },
  { id: 15, name: "Male Navy Shorts", category: "Shorts", sub: "Male", price: 13000, img: "https://via.placeholder.com/150/000080/ffffff?text=Navy+Shorts" },

  // EXTRA ITEMS
  { id: 13, name: "Male White Tank Top", category: "Shirts", sub: "Male", price: 12000, img: "https://via.placeholder.com/150/ffffff/000000?text=White+Tank" },
  { id: 14, name: "Female Pink Crop Top", category: "Shirts", sub: "Female", price: 16000, img: "https://via.placeholder.com/150/ff69b4/ffffff?text=Pink+Crop" }
]));

// =======================
// LOAD PRODUCTS FUNCTION
// =======================
function loadProducts(category = null, sub = null) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productList = document.getElementById("products");
  if(!productList) return;
  productList.innerHTML = "";

  products.forEach(product => {
    if ((!category || product.category === category) && (!sub || product.sub === sub)) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" width="100%">
        <h3>${product.name}</h3>
        <p>₦${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    }
  });
}

// =======================
// FILTER PRODUCTS
// =======================
function filterProducts(category = null, sub = null) {
  loadProducts(category, sub);

  const subfilters = document.getElementById("subfilters");
  if(!subfilters) return;
  subfilters.innerHTML = "";

  if(category){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const subs = [...new Set(products.filter(p => p.category === category).map(p => p.sub))];

    subs.forEach(s => {
      const btn = document.createElement("button");
      btn.innerText = s;
      btn.onclick = () => loadProducts(category, s);
      subfilters.appendChild(btn);
    });
  }
}

// =======================
// AUTH BOX (Login/Register)
// =======================
function checkAuthBox() {
  const authBox = document.getElementById("auth-box");
  const user = JSON.parse(localStorage.getItem("user"));
  if(authBox) authBox.style.display = user ? "none" : "block";
}

// =======================
// REGISTER
// =======================
function register() {
  const user = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", true);
  checkAuthBox();
  updateCart();
  alert("Registered successfully!");
}

// =======================
// LOGIN
// =======================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if(storedUser && email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("loggedIn", true);
    checkAuthBox();
    updateCart();
    alert("Login successful!");
  } else {
    alert("Invalid credentials");
  }
}

// =======================
// CART FUNCTIONS
// =======================
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);
  if(index > -1) cart[index].quantity += 1;
  else cart.push({id: id, quantity: 1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  alert("Added to cart");
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if(!cartItemsDiv || !cartTotal) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if(product){
      const subtotal = product.price * item.quantity;
      total += subtotal;
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <span>${product.name}</span><br>
          <span>₦${product.price} x ${item.quantity} = ₦${subtotal}</span><br>
          <button onclick="changeQuantity(${product.id}, -1)">-</button>
          <button onclick="changeQuantity(${product.id}, 1)">+</button>
          <button onclick="removeFromCart(${product.id})">X</button>
        </div>
        <hr style="border-color:#444;">
      `;
    }
  });

  cartTotal.innerText = `Total: ₦${total}`;
}

function changeQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);
  if(index > -1){
    cart[index].quantity += delta;
    if(cart[index].quantity < 1) cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart.length === 0){ alert("Your cart is empty"); return; }

  const user = JSON.parse(localStorage.getItem("user"));
  if(!user){ alert("You must log in to checkout"); return; }

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0);

  if(confirm(`Total: ₦${total}\nConfirm checkout?`)){
    alert(`Thanks ${user.name}! Your order of ₦${total} has been placed (Demo).`);
    localStorage.removeItem("cart");
    updateCart();
  }
}

// =======================
// ADMIN ADD PRODUCT
// =======================
function addProduct() {
  const name = document.getElementById("pname").value;
  const category = document.getElementById("pcategory").value;
  const sub = document.getElementById("psubcategory").value;
  const price = parseInt(document.getElementById("pprice").value);
  const img = document.getElementById("pimg").value || "https://via.placeholder.com/150";

  let products = JSON.parse(localStorage.getItem("products")) || [];
  const newProduct = { id: products.length + 1, name, category, sub, price, img };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  alert("Product added!");
  loadProducts();
}

// =======================
// DRAGGABLE CART (Desktop + Mobile)
// =======================
window.addEventListener("DOMContentLoaded", function() {
  checkAuthBox();
  updateCart();
  loadProducts(); // show all by default

  const cartBox = document.getElementById("cart-box");
  if(!cartBox) return;

  let isDragging = false, offsetX = 0, offsetY = 0;
  cartBox.style.position = "fixed";
  cartBox.style.left = cartBox.offsetLeft + "px";
  cartBox.style.top = cartBox.offsetTop + "px";
  cartBox.style.right = "auto";
  cartBox.style.bottom = "auto";

  function startDrag(e){
    e.preventDefault();
    isDragging = true;
    if(e.type === "mousedown"){ offsetX = e.clientX - cartBox.offsetLeft; offsetY = e.clientY - cartBox.offsetTop; }
    else if(e.type === "touchstart"){ offsetX = e.touches[0].clientX - cartBox.offsetLeft; offsetY = e.touches[0].clientY - cartBox.offsetTop; }

    cartBox.style.cursor = "grabbing";
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e){
    if(!isDragging) return;
    let clientX, clientY;
    let clientX, clientY;
    let clientX, clientY;
    if(e.type === "mousemove"){ clientX = e.clientX; clientY = e.clientY; }
    else if(e.type === "touchmove"){ clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }

    let x = clientX - offsetX;
    let y = clientY - offsetY;
    x = Math.max(0, Math.min(window.innerWidth - cartBox.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - cartBox.offsetHeight, y));

    cartBox.style.left = x + "px";
    cartBox.style.top = y + "px";
  }

  function stopDrag(){
    if(isDragging){
      isDragging = false;
      cartBox.style.cursor = "grab";
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", stopDrag);
    }
  }

  cartBox.addEventListener("mousedown", startDrag);
  cartBox.addEventListener("touchstart", startDrag);
});