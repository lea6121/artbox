import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './post.css'
import { Loading } from '../../components/App/App'
import { postNewPost } from '../../redux/reducers/artworkReducer'
import { useDispatch, useSelector } from 'react-redux'

function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  })
  const { title, body } = formData
  const [errors, setErrors] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((store) => store.users.user)
  const newPostResponse = useSelector((store) => store.posts.newPostResponse)
  const isLoadingNewPostMsg = useSelector(
    (store) => store.posts.isLoadingNewPost
  )
  const preIsLoadingNewPostMsg = usePrevious(isLoadingNewPostMsg)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(postNewPost({ title, body }))
  }

  /* 監聽 newPostResponse
  1. 發 request 前，isLoadingMsg = false, preIsLoadingNewPost = false
  2. 發 request 後，isLoadingMsg = true, preIsLoadingNewPost = false
  3. 收到 response，isLoadingMsg = false, preIsLoadingNewPost = true
  */

  useEffect(() => {
    if (!isLoadingNewPostMsg && preIsLoadingNewPostMsg) {
      if (newPostResponse && newPostResponse.id) {
        alert('發布文章成功！')
        history.push(`/posts/${newPostResponse.id}`)
      } else if (newPostResponse.code) {
        return setErrors(newPostResponse.message)
      }
    }
  }, [newPostResponse, history, isLoadingNewPostMsg, preIsLoadingNewPostMsg])

  if (!user) {
    alert('請先登入！')
    history.push('/login')
  }

  return (
    <div className="post-wrapper">
      {isLoadingNewPostMsg && <Loading>Loading...</Loading>}
      <ResetStyle />
      <GlobalStyle />
      <div className="post-container">
        <form className="post-form" onSubmit={handleFormSubmit}>
          <div className="post-form__editor">
            <div className="post-form__title input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the title here..."
                name="title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="post-form__content form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment..."
                name="body"
                value={body}
                onChange={handleInputChange}
                required
              ></textarea>
              <label htmlFor="floatingTextarea2">Leave something here...</label>
            </div>
            <div className="post-form__error">{errors}</div>
          </div>

          <div className="post-form__submit">
            <input
              type="submit"
              value="SUBMIT"
              className="post-form__submit-btn"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
