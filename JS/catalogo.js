let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll('.box-container .box')];
  for (var i = currentItem; i < currentItem + 4; i++) {
    boxes[i].style.display = 'inline-block';
  }

  currentItem += 4;
  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
  elementos1.addEventListener('click', comprarElemento);
  carrito.addEventListener('click', eliminarElemento);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  // Agregar el evento para el botón comprar
  const btnComprar = document.getElementById('btn-comprar');
  btnComprar.addEventListener('click', procesarCompra);

  // Observar cambios en el carrito
  const tbody = document.querySelector('#lista-carrito tbody');
  const observer = new MutationObserver(actualizarBotonComprar);
  observer.observe(tbody, { childList: true });
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector('img').src,
    titulo: elemento.querySelector('h3').textContent,
    precio: elemento.querySelector('.precio').textContent,
    id: elemento.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${elemento.imagen}" width=100 height=150px>
    </td>
    <td>${elemento.titulo}</td>
    <td>${elemento.precio}</td>
    <td>
      <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
  `;
  lista.appendChild(row);
}

function eliminarElemento(e) {
  e.preventDefault();
  let elemento, elementoId;
  if (e.target.classList.contains('borrar')) {
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector('a').getAttribute('data-id');
  }
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  return false;
}

// Agregar después de la función comprarProducto()
function actualizarBotonComprar() {
  const btnComprar = document.getElementById('btn-comprar');
  const tbody = document.querySelector('#lista-carrito tbody');
  btnComprar.classList.toggle('disabled', tbody.children.length === 0);
}

// Función para manejar la compra
function procesarCompra(e) {
  e.preventDefault();

  const tbody = document.querySelector('#lista-carrito tbody');
  if (tbody.children.length === 0) return;

  let mensaje = "*🛒 Pedido ThanosPos:*%0A%0A";
  let total = 0;

  // Recopilar productos
  Array.from(tbody.children).forEach(fila => {
    const nombre = fila.querySelector('td:nth-child(2)').textContent;
    const precio = fila.querySelector('td:nth-child(3)').textContent;
    mensaje += `• ${nombre} - ${precio}%0A`;
    total += parseInt(precio.replace(/[^\d]/g, ''));
  });

  mensaje += `%0A*💰 Total: $${total.toLocaleString()}*`;
  mensaje += `%0A%0A*¿Deseas proceder con tu compra?* 🛍️`;

  // Número de WhatsApp de ThanosPos
  const telefono = "573117618411";

  // Crear URL de WhatsApp
  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  // Abrir WhatsApp
  window.open(url, '_blank');

  // Limpiar carrito después de la compra
  vaciarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel-inner');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentSlide = 0;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 50}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % 2;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + 2) % 2;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  actualizarBotonComprar();
});