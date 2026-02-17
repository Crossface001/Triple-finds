// LOAD CART AND SHOW SUMMARY
function loadCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products"));
  const summaryDiv = document.getElementById("checkout-summary");

  if(cart.length === 0){
    summaryDiv.innerHTML = "<p>Your cart is empty. Go back and add items.</p>";
    return;
  }

  let total = 0;
  summaryDiv.innerHTML = "<ul>";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;
    summaryDiv.innerHTML += `<li>${product.name} x ${item.quantity} = ₦${subtotal}</li>`;
  });

  summaryDiv.innerHTML += `</ul><p><strong>Total: ₦${total}</strong></p>`;
}

window.onload = function() {
  loadCheckoutSummary();
}

// SIMULATE PAYMENT
function processPayment() {
  const name = document.getElementById("card-name").value;
  const number = document.getElementById("card-number").value;
  const exp = document.getElementById("card-exp").value;
  const cvv = document.getElementById("card-cvv").value;

  if(!name || !number || !exp || !cvv){
    alert("Please fill all fields!");
    return;
  }

  if(number.length !== 16 || cvv.length < 3){
    alert("Invalid card info (demo check)");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products"));
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  alert(`Payment of ₦${total} successful! Thank you for shopping with Triple Finds.`);

  // CLEAR CART
  localStorage.removeItem("cart");

  // REDIRECT TO HOME
  window.location.href = "index.html";
}