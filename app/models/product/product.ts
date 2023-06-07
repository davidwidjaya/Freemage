import { format, parseISO } from "date-fns";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/with-set-prop-action";

/**
 * This represents a product
 */
export const ProductModel = types
  .model("Product")
  .props({
    uuid: types.identifier,
    created_at: types.string,
    updated_at: types.maybeNull(types.string),
    name_product: types.string,
    desc_product: types.string,
    min_order_product: types.maybeNull(types.string),
    reference_fob_price: types.maybeNull(types.string),
    production_capacity: types.maybeNull(types.string),
    image_product: types.maybeNull(types.string),
    code_product: types.string,
    image_main_product: types.maybeNull(types.string),
    deleted_at: types.maybeNull(types.string),
    visitor_count: types.maybeNull(types.number),
    isactive: types.enumeration(["Y", "N"]),
    name_company: types.string,
    relevance: types.string,
  })
  .views((self) => ({
    get createdAt() {
      return format(parseISO(self.created_at), "dd/MM/yyyy");
    }
  }))
  .actions(withSetPropAction)

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}
export const createProductDefaultModel = () => types.optional(ProductModel, {})
