import React from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {Redirect} from 'react-router-dom';
import {logoutSubmit} from '../../redux/user.redux.js';
@connect(
  state=>state.user,
  {logoutSubmit}
)

class User extends React.Component{
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){
    const alert=Modal.alert;
    alert('注销','确认退出登陆吗？',[
      {text:'取消',onPress:()=>console.log('cancel')},
      {text:'确认',onPress:()=>{
        browserCookie.erase('userid');
        //window.location.href=location.href;刷新页面
        this.props.logoutSubmit();
      }},
    ])
    //browserCookie.erase('userid');
    //window.location.href=location.href;
  }

  render(){
    const props=this.props;
    const Item=List.Item;
    const Brief=List.Item.Brief;
    return props.user?(
      <div>
        <Result 
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}}/>}
          title={this.props.user}
          alt=''
          message={props.type=='boss'?props.company:null}
          />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine={true}>
            {props.title}
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资：{props.money}</Brief>:null}
         </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登陆</Item>
        </List>
      </div>
    ):<Redirect to={props.redirectTo} />
  }
}

export default User;