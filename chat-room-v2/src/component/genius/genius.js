import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux.js';
import UserCard from '../usercard/usercard.js';

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends React.Component{
  
  componentDidMount(){
    this.props.getUserList('boss');
  }
  render(){
    return <UserCard userlist={this.props.userlist}></UserCard>
  }
}

export default Genius;