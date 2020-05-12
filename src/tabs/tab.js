import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    total: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
        total
      },
    } = this;

    let classNameLi = 'nav-item';
    let className = 'nav-link';
    let style = {'color': '#4F9DDD'};

    if (activeTab === label) {
      className += ' nav-link active';
    }

    return (
      <li
        className={classNameLi}
        onClick={onClick}
      >
      <a 
        className={className} 
        style={style}
        href="/#">
          {label}
          {total}
      </a>
      </li>
    );
  }
}
