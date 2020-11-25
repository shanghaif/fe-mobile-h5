import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextArea, Button, Message, SafeAreaView } from '@liepin/react-violet-h5';

import './index.less';

const tagTitle = {
  tagA: '还不错，喜欢这种形式',
  tagB: '一般般，有不足要改进',
  tagC: '不太好，体验太差了',
};
const tag = {
  tagA: [{
    content: '主播很不错',
    isActive: false,
  },
  {
    content: '有喜欢的公司',
    isActive: false,
  },
  {
    content: '人气旺互动强',
    isActive: false,
  },
  {
    content: '我投递了简历',
    isActive: false,
  },
  {
    content: '喜欢直播找工作',
    isActive: false,
  }],
  tagB: [{
    content: '主播水平一般',
    isActive: false,
  },
  {
    content: '缺少干货',
    isActive: false,
  },
  {
    content: '没喜欢的企业',
    isActive: false,
  },
  {
    content: '没合适的职位',
    isActive: false,
  },
  {
    content: '想看老板讲解',
    isActive: false,
  }],
  tagC: [{
    content: '主播水平较差',
    isActive: false,
  },
  {
    content: '提问没反馈',
    isActive: false,
  },
  {
    content: '讲解没干货',
    isActive: false,
  },
  {
    content: '公司太烂了',
    isActive: false,
  },
  {
    content: '视频卡顿延迟',
    isActive: false,
  }],
};
@inject('liveStore')
@observer
class Score extends React.Component {
  static propTypes = {
    liveStore: PropTypes.object.isRequired,
    onRef: PropTypes.func.isRequired,
  }
  state = {
    starArr: [
      {
        star: false,
      },
      {
        star: false,
      },
      {
        star: false,
      },
      {
        star: false,
      },
      {
        star: false,
      },
    ],
    tagList: [],
    starLevel: '',
    comment: '',
    start: 0,
    tags: [],
    isClickStar: false,
    isDisabled: true,
    submitFlag: false,
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  sendFlag = true;
  lastStar = '';
  handleClickStar = (i) => {
    const { starArr, comment, tags } = this.state;
    const level = i < 4 ? i < 2 ? 'tagC' : 'tagB' : 'tagA';
    starArr.map((item, index) => {
      if (index <= i) {
        item.star = true;
      } else {
        item.star = false;
      }
      return item;
    });
    const newTagList = this.lastStar === i ? tag[level] : tag[level].map((item) => {
      item.isActive = false;
      return item;
    });
    const newComment = this.lastStar === i ? comment : '';
    const newTags = this.lastStar === i ? tags : [];
    this.setState({
      isClickStar: true,
      starArr: [...starArr],
      tagList: newTagList,
      starLevel: level,
      isDisabled: !(newTagList.some((item) => item.isActive === true) || level === 'tagA'),
      start: i + 1,
      comment: newComment,
      tags: newTags,
    });
    this.lastStar = i;
  }
  handleClickTag = (content, index) => {
    const { tagList, tags, starLevel } = this.state;
    tagList[index].isActive = !tagList[index].isActive;
    const isDisabled = tagList.some((item) => item.isActive === true) || starLevel === 'tagA';
    const i = tags.indexOf(content);
    if (i > -1) {
      tags.splice(i, 1);
    } else {
      tags.push(content);
    }
    this.setState({
      tagList: [...tagList],
      isDisabled: !isDisabled,
      tags: [...tags],
    });
  }
  handleInpAdvice = (value) => {
    this.setState({
      comment: value,
    });
  }
  handleSubmit = () => {
    const { liveStore: { liveId } } = this.props;
    const { start, tags, comment } = this.state;
    if (this.sendFlag) {
      this.sendFlag = false;
      $.ajax({
        url: '/live/v1/save-live-feedback.json',
        type: 'post',
        data: {
          liveId,
          start,
          comment: comment.replace(/(^\s*)|(\s*$)/g, ''),
          tags: JSON.stringify(tags),
        },
        success: (({ flag, msg }) => {
          this.sendFlag = true;
          if (flag === 1) {
            Message.toast('提交成功，感谢您的评价!');
            this.setState({
              submitFlag: true,
            });
          } else {
            Message.toast(msg);
          }
        }),
        error: () => {
          this.sendFlag = true;
          Message.toast('网络请求失败!');
        },
      });
    }
  }
  clearStar = () => {
    const { starArr } = this.state;
    starArr.map((item) => {
      item.star = false;
      return item;
    });
    this.setState({
      isClickStar: false,
      starArr,
    });
  }
  render() {
    const { starArr,
      isClickStar,
      tagList,
      starLevel,
      comment,
      tags,
      isDisabled,
      submitFlag } = this.state;
    return (
      <SafeAreaView>
        <div className="live-score-container">
          <h2 className="live-score-title">直播评分</h2>
          <dl className="live-score-star">
            <dt>
              {
              starArr.map((item, index) => (
                item.star ?
                  <span
                    key={ `${item.key}-${index * Math.random()}` }
                    role="presentation"
                    className="text-icon icon-collected star-active"
                    onClick={ !submitFlag ? () => this.handleClickStar(index) : () => {} }
                  />
                :
                  <span
                    key={ `${item.key}-${index * Math.random()}` }
                    role="presentation"
                    className="text-icon icon-collected"
                    onClick={ !submitFlag ? () => this.handleClickStar(index) : () => {} }
                  />
              ))
            }
            </dt>
            <dd className={ classnames({
            'tag-title-active': isClickStar,
          }) }
            >
              {
              isClickStar ? tagTitle[starLevel] : '您的评价对我们非常重要'
            }
            </dd>
          </dl>
          {
              isClickStar ?
                <React.Fragment>
                  <ul className="tag-content">
                    {
                      !submitFlag ?
                      tagList.map((item, index) => (
                        <li
                          className={ classnames({
                            'tag-active': item.isActive,
                          }) }
                          role="presentation"
                          key={ item.content }
                          onClick={ () => this.handleClickTag(item.content, index) }
                        >
                          <span>{item.content}</span>
                        </li>
                      )) : tags.map((item) => (
                        <li
                          className="tag-success"
                          key={ item }
                        >
                          <span>{item}</span>
                        </li>
                      ))
                    }
                  </ul>
                  {
                    !submitFlag ?
                      <React.Fragment>
                        <TextArea
                          value={ comment }
                          maxCount={ 200 }
                          maxLength={ 200 }
                          onChange={ this.handleInpAdvice }
                          className="score-textarea needsclick"
                          placeholder="其他想说的"
                        />
                        <Button
                          disabled={ isDisabled }
                          type="primary"
                          size="xlarge"
                          content="确认提交"
                          onClick={ this.handleSubmit }
                        />
                      </React.Fragment> : null
                  }

                </React.Fragment>
                : null
            }
        </div>
      </SafeAreaView>
    );
  }
}
export default Score;
