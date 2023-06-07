import { ProductModel } from "./Product"

test("can be created", () => {
  const instance = ProductModel.create({})

  expect(instance).toBeTruthy()
})
