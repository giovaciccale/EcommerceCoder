console.log("Este es un console log");

const socket = io();

// En el cliente
socket.on("movies", (productos) => {
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
  document.querySelector("#movies").innerHTML = template;
});

// socket.on("Welcome", message=>alert(message))

// socket.emit("newProduct",{

//     // title: "Pelicula desde el socket",
//     // photo: "https://i.pinimg.com/736x/ec/bf/66/ecbf66484f8439fd7021f3ef224a50a8.jpg",
//     // rice: "data.price",
//     // stock: "100"

// })

socket.on("new success", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (event) => {
  //para no recargar la pagina
  event.preventDefault();
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
