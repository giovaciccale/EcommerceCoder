const selectors = document.querySelectorAll(".deleteButton");
console.log(selectors)
selectors.forEach((button) =>
  button.addEventListener("click", async (event) => {
    const id = event.target.id; // Aquí obtenemos el ID del pedido desde el atributo data-order-id
    console.log(id); // Verifica que estés obteniendo el ID correctamente

    try {
      const url = "/api/orders/" + id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      console.log(response);
      if(response.statusCode === 200) {
        alert(response.message);
        location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  })
);

