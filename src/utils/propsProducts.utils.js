function propsProductsUtils(data) {
  const { title, photo, price } = data;
  if (!title || !photo || !price) {
    const error = new Error("title, photo & price are required")
    error.statusCode = 404;
    throw error
  }
}

export default propsProductsUtils;
