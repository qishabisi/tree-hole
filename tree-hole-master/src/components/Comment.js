import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor () {
    super()
    this.state = { timeString: '' }
  }

  componentWillMount () {
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }
  formatTimer(duration){
    var mi = 60;
    var hh = mi * 60;//一小时秒数
    var dd = hh * 24;//一天秒数

    var day = Math.floor(duration / dd);
    var hour = Math.floor((duration - day * dd) / hh);
    var minute = Math.floor((duration - day * dd - hour * hh) / mi);
    var second = Math.floor(duration - day * dd - hour * hh - minute * mi);
    // console.log(day+"-"+hour+"-"+minute+"-"+second);
    duration=Math.round(duration);
      if(duration>dd){
        return{timeString:`${Math.round(day)}天 ${Math.round(hour)}小时 ${Math.round(minute)}分 ${Math.round(second)} 秒前`}
      }else
      if(duration>hh){
        return{timeString:`${Math.round(hour)}小时 ${Math.round(minute)}分 ${Math.round(second)} 秒前`}
      }else
      if(duration>mi){
        return{timeString: `${Math.round(duration / 60)} 分 ${Math.round(duration%60)} 秒前`}
      }else
        return{timeString:`${Math.round(Math.max(duration, 1))} 秒前`}
  }
  _updateTimeString () {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState(this.formatTimer(duration))
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  render () {
    const comment = this.props.comment
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    )
  }
}
