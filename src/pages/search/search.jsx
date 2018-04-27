import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header';
import './search.scss';

class Search extends Component {
    state = {};
    render() {
        return (
            <div>
                <Header />
                <div className="tab-contents">
                    <div className="search-bar">
                        <div className="input-wrap">
                            <input type="text" id="search" placeholder="搜索歌曲、歌单、专辑" />
                            <span className="icon-search"></span>
                            <span className="icon-delete">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
