import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBlogDesc } from '../../redux/blog.redux'
import marked from 'marked'
import hljs from 'highlight.js'
import {
  timetrans,
  color
} from '../../utils/utils'
import {
  Card,
  Icon,
  Tag,
  Row,
  Col
} from 'antd'
import Navigation from './navigation'
import './desc.css'
@connect(
  state => state.blog,
  { getBlogDesc }
)
class Desc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      loading: true
    }
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    })
  }
  componentDidMount() {
    this.props.getBlogDesc(this.state.id)
    this.setState({
      loading: !this.state.loading
    })
  }
  render() {
    const IconText = ({ type, text }) => (
      <span key={text}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <Row>
        <Col
          lg={{ span: 15, offset: 1 }}
          md={{ span: 15, offset: 1 }}
          xs={{ span: 24 }}
        >
          <Card
            className="article-wrapper"
            loading={this.state.loading}
            title={this.props.content.title}
            extra={[
              <Tag color="red" key="author">
                作者：admin
              </Tag>,
              <span style={{marginTop: 10}} key="time">{timetrans(this.props.content.createTime)}</span>
            ]}
            actions={[<Icon type="like-o" />]}
          >
            <div className="article-tags">
              <IconText type="tags-o" text={
                this.props.tags.split(',').map(v => (
                  <Tag
                    key={v}
                    color={color[Math.floor(Math.random()*color.length)]}
                    onClick={()=>{}}
                  >
                    {v}
                  </Tag>
                ))}
              />
            </div>
            <div 
              className="article-detail" 
              dangerouslySetInnerHTML={{ __html: marked(this.props.content.content) }} 
            />
          </Card>
        </Col>
        <Col
          lg={{ span: 6, offset: 1 }}
          md={{ span: 6, offset: 1 }}
          xs={{ span: 0 }}
        >
          {
            this.props.content.content ?
            <Card title="目录" className="catalog">
              <Navigation 
                content={this.props.content.content}
              />
            </Card>
            : null
          }
        </Col>
      </Row>
    )
  }
}

export default Desc