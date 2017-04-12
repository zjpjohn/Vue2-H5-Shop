import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"


import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import EssayList from "./EssayList";
// import CommentList from "./CommentList";
import { Row, Col } from 'antd';

class DataSideMenu extends React.Component{
  // handleClick(e) {
  //   this.props.dispatch(action_changeAddressSide(e.key));
  // }
  componentDidMount(){
    //this.props.dispatch(action_changeAddressSide("EssayList"));
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
        <Menu.Item key="Colligate" {...menuItemLayout} >
          <Link to="/DataSideMenu/Colligate">
            综合
          </Link>
        </Menu.Item>


        <Menu.Item key="Activation" {...menuItemLayout} >
          <Link to="/DataSideMenu/Activation">
            激活
          </Link>

        </Menu.Item>

        <Menu.Item key="Register" {...menuItemLayout} >
          <Link to="/DataSideMenu/Register">
            注册
          </Link>
        </Menu.Item>

        <Menu.Item key="Userdata" {...menuItemLayout} >
          <Link to="/DataSideMenu/Userdata">
            用户
          </Link>
        </Menu.Item>

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

export default connect(mapStateToProps)(DataSideMenu);
//display:"flex",justifyContent:"space-around",