import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './editPost.css'
import { Loading } from '../../components/App/App'
import { getPost, editPost } from '../../redux/reducers/artworkReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function EditPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  })
  const { title, body } = formData
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.users.user)
  const isLoadingPostMsg = useSelector((store) => store.posts.isLoadingPost)
  const article = useSelector((store) => store.posts.post)
  const editedPostResponse = useSelector(
    (store) => store.posts.editedPostResponse
  )
  const isLoadingEditPostMsg = useSelector(
    (store) => store.posts.isLoadingEditPost
  )
  const preIsLoadingEditPostMsg = usePrevious(isLoadingEditPostMsg)

  useEffect(() => {
    dispatch(getPost(params.id))
  }, [params.id, dispatch])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    let id = params.id
    let editMsg = window.confirm('確定修改文章嗎？')
    if (editMsg) {
      dispatch(editPost({ id, title, body }))
    }
  }

  useEffect(() => {
    if (!isLoadingEditPostMsg && preIsLoadingEditPostMsg) {
      if (editedPostResponse && editedPostResponse.id) {
        history.push(`/posts/${editedPostResponse.id}`)
      }
    }
  }, [
    editedPostResponse,
    history,
    isLoadingEditPostMsg,
    preIsLoadingEditPostMsg
  ])

  if (!user) {
    alert('請先登入！')
    history.push('/login')
  }

  return (
    <>
      {article && (
        <div className="edit-post-wrapper">
          {(isLoadingPostMsg || isLoadingEditPostMsg) && (
            <Loading>Loading...</Loading>
          )}
          <ResetStyle />
          <GlobalStyle />
          <div className="edit-post-container">
            <form className="edit-post-form" onSubmit={handleFormSubmit}>
              <div className="edit-post-form__editor">
                <div className="edit-post-form__title input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={article.title}
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="edit-post-form__content form-group">
                  <textarea
                    className="form-control"
                    placeholder={article.body}
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="edit-post-form__submit">
                <input
                  type="submit"
                  value="SUBMIT"
                  className="edit-post-form__submit-btn"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
