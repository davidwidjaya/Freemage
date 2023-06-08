import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    savedList: types.array(types.string), //array of id photos
  })
  .views((store) => ({
  }))
  .actions((store) => ({
    setSavedList(values: string) {
      // if (store.savedList.length > 0) {
      let find = store.savedList.find((item) => item === values)
      if (find) {
        //already exists, then unsaved
        let temp = [...store.savedList.filter((item) => item !== values)]
        store.savedList.replace(temp)
        return
      }
      //not exists, then add to saved
      let temp = [...store.savedList]
      store.savedList.replace([...temp, values])
      // }
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> { }
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> { }


