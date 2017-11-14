import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'
import PropTypes from 'prop-types'
class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor () {
    super()
    this.state = { username: '' }
  }

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    const { comments } = this.props//解析赋值
    const newComments = [...comments, comment]//input传过来一个comment{username，content,createdTime}
    console.log(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentInputContainer)
