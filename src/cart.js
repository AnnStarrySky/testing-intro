function addToCart(cart, product, quantity = 1) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const item = cart.find(i => i.id === product.id);
  const currentQty = item ? item.quantity : 0;
  const newQty = currentQty + quantity;

  if (newQty > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (item) {
    item.quantity = newQty;
  } else {
    cart.push({ ...product, quantity });
  }

  return cart;
}

function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const item = cart.find(i => i.id === productId);
  if (!item) return cart;

  if (newQuantity > item.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  item.quantity = newQuantity;
  return cart;
}

function removeFromCart(cart, productId) {
  const index = cart.findIndex(i => i.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  return cart;
}

function calculateCartSubtotal(cart) {
  let sum = 0;
  for (const item of cart) {
    sum += item.price * item.quantity;
  }
  return sum;
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  
  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  let delivery = 0;
  if (subtotal > 0 && subtotal < 50000) {
    delivery = 30000;
  }

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
