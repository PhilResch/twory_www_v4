import React, { Component, PropTypes } from 'react';

export default class Portfolio extends Component {
    render() {
        return(
            <div className="o-box-negative-margin">
                <div className="o-pack">
                    <div className="o-pack__item o-box--small thumbnail u-1/4">
                        <img src="/img/1.jpg" className="o-media" />
                    </div>
                    <div className="o-pack__item o-box--small thumbnail u-1/4">
                        <img src="/img/1.jpg" className="o-media" />
                    </div>
                    <div className="o-pack__item  o-box--small thumbnail u-1/4">
                        <img src="/img/1.jpg" className="o-media" />
                    </div>
                    <div className="o-pack__item  o-box--small thumbnail u-1/4">
                        <img src="/img/1.jpg" className="o-media" />
                    </div>
                </div>
            </div>
        );
    }
}