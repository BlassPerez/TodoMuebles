let productos = [

    { 
        id: 1, 
        nombre: "Mesa", 
        precio: 15000 
    },
    { 
        id: 2, 
        nombre: "Silla", 
        precio: 75000
    },
    { 
        id: 3, 
        nombre: "Placard", 
        precio: 40000,
    },
    { 
        id: 4, 
        nombre: "Escritorio", 
        precio: 30000,
    },
    { 
        id: 5, 
        nombre: "Alacena", 
        precio: 25000,
    },
    { 
        id: 6, 
        nombre: "Cama", 
        precio: 35000,
    },
    { 
        id: 7, 
        nombre: "Biblioteca", 
        precio: 25000,
    }
];

let carritoDeCompras = [];

const MAX_PRODUCTOS_EN_CARRITO = 10;

function agregarProductoACarrito(){

    listarProductosEnStock();

    let productoAAgregar = prompt("Escriba el nombre del producto que desea agregar: ");

    let producto = productos.find(producto => producto.nombre.toLowerCase() === productoAAgregar.toLowerCase());

    if (producto){
        carritoDeCompras.push(producto);
        alert("Producto Agregado correctamente");
    } else {
        alert("No se encontro el producto en el stock");
    }
};

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
        id: productos.length + 2, 
        nombre: "", 
        precio: 0,
    }
    let nombre;
    let precio;
    do{
        nombre = prompt("Escriba el Nombre del nuevo producto: \n");
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
            "5. Salir \n" +
            "Ingrese una opcion (1 - 5): "
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
                alert("Gracias por comprar en Todo Muebles")
                break;
            default:
                alert("Opcion Invalida, Ingrese un numero del 1 al 5")
                break;
        }
    } while (opcion !== "5");
}

menu();
