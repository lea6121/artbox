import { createSlice } from '@reduxjs/toolkit'
import { app } from '../../firebaseConfig'
import {
  getDatabase,
  ref,
  child,
  get,
  query,
  equalTo,
  onValue,
  orderByChild
} from 'firebase/database'
// import { getProducts as getProductsAPI } from '../../WebAPI'

const initialState = {
  isLoadingProducts: false,
  products: [],
  product: []
}

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload
    },

    setProducts: (state, action) => {
      state.products = action.payload
    },

    setProduct: (state, action) => {
      state.product = action.payload
    }
  }
})

export const { setIsLoadingProducts, setProducts, setProduct } =
  productReducer.actions

export const getProducts = () => (dispatch) => {
  const dbRef = ref(getDatabase())
  dispatch(setIsLoadingProducts(true))
  get(child(dbRef, 'products'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        dispatch(setIsLoadingProducts(false))
        dispatch(setProducts(snapshot.val()))
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

// export const getProducts = () => (dispatch) => {
//   dispatch(setIsLoadingProducts(true))
//   getProductsAPI().then((data) => {
//     // console.log(data)
//     // console.log(data.pagination.total_pages)
//     // console.log(data.data)
//     dispatch(setTotalProductsPages(data.pagination.total_pages))
//     dispatch(setIsLoadingProducts(false))
//     dispatch(setProducts(data.data))
//   })
// }

export const getProduct = (id, category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  console.log(id, category)
  const product = query(
    ref(dbRef, `products/${category}`),
    orderByChild('id'),
    equalTo(Number(id))
  )

  onValue(product, (snapshot) => {
    const data = snapshot.val()
    let arr = []
    console.log('data', data)

    //有用 orderByChild 時要用 for 迴圈取資料
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    console.log('item', arr)
    dispatch(setIsLoadingProducts(false))
    dispatch(setProduct(arr))
  })
  // get(child(dbRef, 'products'))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val())
  //       dispatch(setIsLoadingProducts(false))
  //       dispatch(setProducts(snapshot.val()))
  //     } else {
  //       console.log('No data available')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
}

// export const getPost = (id) => (dispatch) => {
//   dispatch(setIsLoadingPost(true))
//   getPostAPI(id).then((article) => {
//     dispatch(setPost(article))
//     dispatch(setIsLoadingPost(false))
//   })
// }

// export const postNewPost = (data) => (dispatch) => {
//   dispatch(setIsLoadingNewPost(true))
//   postNewPostAPI(data).then((res) => {
//     dispatch(setNewPostResponse(res))
//     dispatch(setIsLoadingNewPost(false))
//   })
// }

// export const editPost = (data) => (dispatch) => {
//   dispatch(setIsLoadingEditPost(true))
//   editPostAPI(data).then((res) => {
//     dispatch(setEditedPostResponse(res))
//     dispatch(setIsLoadingEditPost(false))
//   })
// }

// export const deletePost = (id) => (dispatch) => {
//   dispatch(setIsLoadingDeletePost(true))
//   deletePostAPI(id).then((res) => {
//     dispatch(setDeletePostResponse(res))
//     dispatch(setIsLoadingDeletePost(false))
//     let page = 1
//     getPostsAPI(page)
//       .then((data) => {
//         dispatch(setIsLoadingPosts(false))
//         dispatch(setTotalPosts(data.totalPosts))
//         return data.posts
//       })
//       .then((posts) => {
//         dispatch(setPosts(posts))
//       })
//   })
// }

export default productReducer.reducer
