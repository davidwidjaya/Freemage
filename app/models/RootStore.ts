import { EpisodeStoreModel } from "@models/EpisodeStore"; // @demo remove-current-line
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"; // @demo remove-current-line
// import { ProductStoreModel } from "@models/product/ProductStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
  episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
  // productStore: types.optional(ProductStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
