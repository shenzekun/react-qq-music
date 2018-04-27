import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
class Header extends Component {
    state = {
        navConfig: [
            {
                name: '推荐',
                key: 0,
                href: '/'
            },
            {
                name: '排行榜',
                key: 1,
                href: '/rank'
            },
            {
                name: '搜索',
                key: 2,
                href: '/search'
            }
        ]
    };
    render() {
        return (
            <div>
                <header id="header">
                    <img src={require('../../assets/logo.png')} alt="qq音乐" id="logo" />
                    <a href="javascript:;" className="btn_download">
                        下载APP
                    </a>
                </header>
                <nav className="navbar">
                    <ul className="nav-list">
                        {this.state.navConfig.map(item => {
                            return (
                                <li className="nav-item" key={item.key}>
                                    <NavLink to={item.href} exact >{item.name}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
