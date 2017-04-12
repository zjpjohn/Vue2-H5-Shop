import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
//import { action_changeAddressSide, action_changeAddressHead } from "../../actions";


import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import { UserList } from "./UserList";
import { Row, Col } from 'antd';

class InfoSideMenu extends React.Component{
  // handleClick(e) {
  //   this.props.dispatch(action_changeAddressSide(e.key));
  // }
  componentDidMount(){
      //this.props.dispatch(action_changeAddressHead("user"));
      //this.props.dispatch(action_changeAddressSide("UserList"));
  }
  render() {
    const { sideAddress } = this.props;
    const menuItemLayout = {
      style:{fontSize:"16px"}
    };
    return (<Row>
    <Col span={2} style={{textAlign:"center"}}>
      <Menu
        //onClick={this.handleClick.bind(this)}
        selectedKeys={[sideAddress]}
        mode="vertical"
        theme="light"
        //{...formLayout}
        
      >
        <Menu.Item key="InfoList" {...menuItemLayout} >
          <Link to="/InfoSideMenu/InfoList">
            信息列表 
          </Link>
        </Menu.Item>

        <Menu.Item key="UserFeedback" {...menuItemLayout} >
          <Link to="/InfoSideMenu/UserFeedback">
            用户反馈
          </Link>
        </Menu.Item>
        {/*<Menu.Item key="CommentList" >
          <Icon type="user" />Comment List
        </Menu.Item>*/}
        </Menu>
    </Col>
    <Col span={22}>
      {this.props.children}
    </Col>
    </Row>);
  }
}

function mapStateToProps(state){
  return {
    sideAddress:state.address.side
  }
}

export default connect(mapStateToProps)(InfoSideMenu);
//display:"flex",justifyContent:"space-around",