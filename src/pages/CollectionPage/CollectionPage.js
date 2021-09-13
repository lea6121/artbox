import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './article.css'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/App/App'
import {
  getPost,
  setPost,
  deletePost
} from '../../redux/reducers/artworkReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function ArticlePage() {
  const user = useSelector((store) => store.users.user)
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoadingPostMsg = useSelector((store) => store.posts.isLoadingPost)
  const article = useSelector((store) => store.posts.post)
  const isLoadingDeleteMsg = useSelector(
    (store) => store.posts.isLoadingDeletePost
  )

  useEffect(() => {
    dispatch(getPost(params.id))
  }, [params.id, dispatch])

  const handleClick = () => {
    history.push('/')
  }

  const handleDelete = () => {
    let deleteMsg = window.confirm('確定刪除文章嗎？')
    if (deleteMsg) {
      dispatch(deletePost(params.id))
      history.push('/')
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setPost(null))
    }
  }, [dispatch])

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <div>
        {article && (
          <div className="article">
            {(isLoadingPostMsg || isLoadingDeleteMsg) && (
              <Loading>Loading...</Loading>
            )}
            <h1>{article.title}</h1>
            <p>{new Date(article.createdAt).toLocaleString()}</p>
            <div className="article__content">{article.body}</div>
            <div className="article__content-btns">
              <button
                type="button"
                className="article__content-btn btn btn-dark"
                onClick={handleClick}
              >
                回文章列表
              </button>
              <div>
                {user && (
                  <a href={`#/edit-post/${params.id}`}>
                    <button
                      type="button"
                      className="article__content-btn btn btn-outline-dark"
                    >
                      EDIT
                    </button>
                  </a>
                )}
                {user && (
                  <button
                    type="button"
                    className="article__content-btn btn btn-outline-dark"
                    onClick={handleDelete}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
