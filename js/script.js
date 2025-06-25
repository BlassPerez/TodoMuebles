function Producto(id, precio, nombre, imagen) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.imagen = imagen;
}

let productos = [
  new Producto(1, 15000, "Mesa", "img/mesa.jpg"),
  new Producto(2, 75000, "Silla", "img/silla.jpg" ),
  new Producto(3, 40000, "Placard", "img/placard.png"),
  new Producto(4, 30000, "Escritorio", "img/escritorio.jpg"),
  new Producto(5, 25000, "Alacena", "img/alacena.png"),
  new Producto(6, 35000, "Cama", "img/cama.jpg"),
  new Producto(7, 25000, "Biblioteca", "img/biblioteca.jpg"),
];

let carritoDeCompras = [];


function agregarProductoACarrito(productoAAgregar) {
  const existeProducto = carritoDeCompras.find((item) => item.id === productoAAgregar.id);

  if (existeProducto) {
    existeProducto.cantidad++;
  } else {
    const productoNuevo = {
      ...productoAAgregar,
      cantidad: 1,
    };
    carritoDeCompras.push(productoNuevo);
  }

  guardarCarrito();
  renderizarCarrito();
}


function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}


function renderizarCarrito() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (carritoDeCompras.length === 0) {
    cartItems.textContent = "Tu carrito está vacío.";
    return;
  }

  carritoDeCompras.forEach((item) => {
    const cartDiv = document.createElement("div");
    cartDiv.className = "cart-item";

    const itemInfo = document.createElement("p");
    itemInfo.textContent = `${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.onclick = () => eliminarDelCarrito(item.id);

    cartDiv.appendChild(itemInfo);
    cartDiv.appendChild(removeBtn);

    cartItems.appendChild(cartDiv);
  });
}


function eliminarDelCarrito(id) {
  carritoDeCompras = carritoDeCompras.filter((producto) => producto.id !== id);
  guardarCarrito();
  renderizarCarrito();
}


function resetearCarrito() {
  carritoDeCompras = [];
  guardarCarrito();
  renderizarCarrito();
  Swal.fire({
    title: "Carrito vaciado",
    text: "Tu carrito ha sido vaciado correctamente.",
    icon: "success",
    confirmButtonText: "Ok"
  });
}

function renderProductos() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  productos.forEach((producto) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.style.width = "150px";

    const name = document.createElement("h3");
    name.textContent = producto.nombre;

    const price = document.createElement("p");
    price.textContent = `Precio: $${producto.precio}`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Agregar al carrito";
    addBtn.onclick = () => agregarProductoACarrito(producto);

    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(price);
    productDiv.appendChild(addBtn);

    productList.appendChild(productDiv);
  });
}

document.getElementById("buyButton").addEventListener("click", realizarCompra);

function realizarCompra() {
  if (carritoDeCompras.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Tu carrito está vacío",
      text: "Agrega productos antes de comprar.",
    });
    return;
  }

  const total = carritoDeCompras.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  Swal.fire({
    title: "Confirmar compra",
    html: `Total a pagar: $${total}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carritoDeCompras = [];
      guardarCarrito();
      renderizarCarrito();
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        text: "Gracias por tu compra.",
      });
    }
  });
}

renderProductos();
renderizarCarrito();
