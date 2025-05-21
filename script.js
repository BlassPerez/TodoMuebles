function Producto(id, precio, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
}

let productos = [ 
    new Producto(1, 15000, "Mesa"),
    new Producto(2, 75000, "Silla"),
    new Producto(3, 40000, "Placard"),
    new Producto(4, 30000, "Escritorio"),
    new Producto(5, 25000, "Alacena"),
    new Producto(6, 35000, "Cama"),
    new Producto(7, 25000, "Biblioteca"),
];

let carritoDeCompras = [];


function agregarProductoACarrito(productoAAgregar){

    const existeProducto = carritoDeCompras.find((item) => item.id === productoAAgregar.id)

    if (existeProducto) {
        existeProducto.cantidad++;
    } else {
        const productoNuevo = {
            ...producto,
            cantidad: 1,
        }
    };
    carritoDeCompras.push(productoNuevo)

    guardarCarrito();

    renderizarCarrito();

};

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



function mostrarCarrito(){
    if (carritoDeCompras.length === 0){
        alert("No hay productos en el carrito de compras");
        return;
    }
    
    let precioTotal = 0;
    let mensaje = "Productos listados en el carrito de compras: \n"
    for (let producto of carritoDeCompras){
        precioTotal += producto.precio;
        mensaje += `${producto.nombre}, Precio: ${producto.precio} \n`;
    }
    let precioSinIVA = (precioTotal / 1.21).toFixed(2);
    mensaje += `El precio con IVA es: ${precioTotal} \n`;
    mensaje += `El precio sin IVA es: ${precioSinIVA} \n`;
    alert(mensaje);
};

function resetearCarrito(){
    carritoDeCompras = [];
    alert("Carrito vaciado correctamente");
};

function listarProductosEnStock(){
    let mensaje = "Productos listados en el stock de la tienda: \n"
    for (let producto of productos){
        mensaje += `${producto.nombre}, Precio: ${producto.precio} \n`;
    }
    alert(mensaje);
}

function agregarProductoAStock(){
    let nuevoProducto = {
        id: productos.length + 1, 
        nombre: "", 
        precio: 0,
    }
    let nombre;
    let precio;
    do{
        nombre = prompt("Escriba el Nombre del nuevo producto: \n");
        let existeEnStock = productos.some(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
        if (existeEnStock){
            alert("Este producto ya está en el stock")
            return;
        }

        precio = parseInt(prompt("Escriba el precio del producto"), 10)
    } while (!nombre || isNaN(precio) || precio <= 0);
    nuevoProducto.nombre = nombre;
    nuevoProducto.precio = precio;

    productos.push(nuevoProducto);
    alert("Producto Agregagado con éxito");
};

function menu(){
    let opcion;

    do{
        opcion = prompt(
            "TIENDA DE MUEBLES \n" +
            "1. Agregar producto al Carrito de compras \n" +
            "2. Resetear carrito de compras \n" +
            "3. Mostrar carrito de compras \n" +
            "4. Agregar productos al stock de la tienda \n" +
            "5. Listar productos en stock \n" +
            "6. Salir \n" +
            "Ingrese una opcion (1 - 6): "
        );

        switch (opcion) {
            case "1":
                agregarProductoACarrito();
                break;
            case "2":
                resetearCarrito();
                break;
            case "3":
                mostrarCarrito();
                break;
            case "4":
                agregarProductoAStock();
                break;
            case "5":
                listarProductosEnStock();
                break;
            case "6":
                alert("Gracias por comprar en Todo Muebles")
                break;
            default:
                alert("Opcion Invalida, Ingrese un numero del 1 al 6")
                break;
        }
    } while (opcion !== "6");
}

menu();
