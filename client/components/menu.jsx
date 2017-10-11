import React from 'react';
import { Link } from 'react-router-dom';

import { Menu as AntMenu } from 'antd';
const { Item } = AntMenu;

const Menu = () => (
  <AntMenu
    defaultSelectedKeys={ ['1'] }
    defaultOpenKeys={ ['sub1'] }
    style={ { height: '100%' } }
    theme="dark"
  >
    <Item key="1">
      <Link to="/music-player"> Music Player </Link>
    </Item>
    <Item key="2">
      <Link to="/tree-visualizer"> Tree Visualizer </Link>
    </Item>
  </AntMenu>
);

export default Menu;
