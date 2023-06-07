import { api } from "@services/api";
import { format, parseISO } from "date-fns";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/with-set-prop-action";
import { ProductModel } from "./Product";

/**
 * This represents a product store
 */
export const ProductStoreModel = types
    .model("ProductStore")
    .props({
        products: types.array(ProductModel)
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async fetchProducts(page: number) {
            const response = await api.getProducts({type: "products", page})
            if (response.kind === "ok") {
                store.setProp("products", response.data.data)
            } else {
                console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
            }
        },
    }));

export interface ProductStore extends Instance<typeof ProductStoreModel> { }
export interface ProductStoreSnapshot extends SnapshotOut<typeof ProductStoreModel> { }
