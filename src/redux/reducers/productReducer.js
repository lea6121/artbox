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

const initialState = {
  isLoadingProducts: false,
  allProducts: [],
  specificProducts: [],
  product: [],
  suggestProducts: []
}

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload
    },

    setSpecificProducts: (state, action) => {
      state.specificProducts = action.payload
    },

    setProduct: (state, action) => {
      state.product = action.payload
    },

    setSuggestProducts: (state, action) => {
      state.suggestProducts = action.payload
    }
  }
})

export const {
  setIsLoadingProducts,
  setAllProducts,
  setSpecificProducts,
  setProduct,
  setSuggestProducts
} = productReducer.actions

export const getAllProducts = () => (dispatch) => {
  const dbRef = ref(getDatabase())
  dispatch(setIsLoadingProducts(true))
  get(child(dbRef, 'products'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(setIsLoadingProducts(false))
        dispatch(setAllProducts(snapshot.val()))
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const getSpecificProducts = (category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  const product = query(ref(dbRef, `products/${category}`), orderByChild('id'))

  onValue(product, (snapshot) => {
    // const data = snapshot.val()
    let arr = []
    //有用 orderByChild 時要用 for 迴圈取資料
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    dispatch(setIsLoadingProducts(false))
    dispatch(setSpecificProducts(arr))
  })
}

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
    // const data = snapshot.val()
    let arr = []
    //有用 orderByChild 時要用 for 迴圈取資料
    snapshot.forEach(function (item) {
      arr.push(item.val())
    })
    dispatch(setIsLoadingProducts(false))
    dispatch(setProduct(arr))
  })
}

export const getSuggestProduct = (category) => (dispatch) => {
  dispatch(setIsLoadingProducts(true))
  const dbRef = getDatabase()
  const product = query(ref(dbRef, `products/${category}`), orderByChild('id'))

  onValue(product, (snapshot) => {
    const data = snapshot.val()
    let suggestionArr = []
    let numbers = [] // new empty array

    var min, max, r, n, p

    min = 1
    max = data.length - 1
    r = 4 // how many numbers you want to extract

    for (let i = 0; i < r; i++) {
      do {
        n = Math.floor(Math.random() * (max - min + 1)) + min
        p = numbers.includes(n)
        if (!p) {
          numbers.push(Number(n))
        }
      } while (p)
    }

    console.log(numbers)
    numbers.forEach((element) => suggestionArr.push(data[element]))
    console.log('items', suggestionArr)
    dispatch(setIsLoadingProducts(false))
    dispatch(setSuggestProducts(suggestionArr))
  })
}

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
