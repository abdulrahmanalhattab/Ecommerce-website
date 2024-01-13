import Product from "./db/product";

export async function CreateProduct(data: any) {
  const product = data.product;
  const description = data.description;
  const price = data.price;
  const rate = data.rate;
  const img = data.img;
  const display = data.display;
  const type = data.type;
  const id: any = await Product.findOne(
    {},
    { _id: 0, id: 1 },
    { sort: { _id: -1 } }
  ).then((result) => {
    return result;
  });

  const result: any = new Product({
    id: id === null ? 1 : id.id + 1,
    product: product,
    description: description,
    price: price,
    rate: rate,
    img: img,
    type: type,
  })
    .save()
    .then(() => {
      return {
        status: true,
        msg: "Successfuly",
      };
    })
    .catch(() => {
      return {
        status: false,
        msg: "Error",
      };
    });
  return result;
}
