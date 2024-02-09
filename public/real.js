console.log("Este es un console log");

const socket = io();

// En el cliente
socket.on("products", (productos) => {
  const template = productos
    .map(
      (each) => `
            <div class="card m-2" style="width: 360px">
              <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
              <h5 class="p-2 text-center card-title">${each.stock}</h5>
            </div>
          `
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});

socket.on("new success", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (product) => {
  //para no recargar la pagina
  product.preventDefault();
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  console.log(data);
  socket.emit("newProduct", data);
});
