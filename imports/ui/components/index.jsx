import React, { Component, PropTypes } from 'react';

export default class Index extends Component {
    render() {
        return(
            <div>
                <img src="/img/1.jpg" className="o-media" />
                <div className="o-box projectDescription">
                    <h1 className="clientName">
                        Kancelaria Skibiński
                    </h1>
                    <p className="projectType">
                        projekt identyfikacji wizualnej
                    </p>
                    <p className="paragraphCenter">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet imperdiet bibendum. Aliquam pharetra varius nunc sit amet elementum. Aliquam at diam sit amet odio aliquet pretium et et massa. In hac habitasse platea dictumst. Nunc orci nulla, pharetra in fermentum eu, posuere sed lorem. Nam pulvinar nisl nec sem posuere, a sollicitudin metus iaculis. Vestibulum tempor nibh augue. Nullam pulvinar magna nunc, sodales accumsan ipsum elementum sit amet. In ex erat, tristique non varius sit amet, dapibus eget libero. Ut fringilla nisi in euismod viverra. Donec a lobortis dolor, sed sagittis elit. Nunc molestie elementum risus ut cursus. In molestie auctor lacus, non porttitor quam aliquam a. Duis a felis at purus gravida egestas vel quis ante. Nunc sit amet quam pharetra erat mattis maximus. Nulla gravida eros urna, eu dapibus tortor iaculis eget.
                    </p>
                </div>
            </div>
        );
    }
}