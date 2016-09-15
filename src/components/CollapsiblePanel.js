import React, { Component, PropTypes } from 'react';

import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

export default class CollapsiblePanel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      open: true,
      chevronToggle: false
    };
  }

  panelIcon() {
    if (this.props.panelIcon == null || this.props.panelIcon === '') {
      return;
    }

    return <FontAwesome name={this.props.panelIcon} />;
  }

  render() {
    let chevronClassNames = classNames('pull-right', 'fa', 'fa-chevron-down', 'rotate',
                                       { left: this.state.chevronToggle});
    let panelClassNames = classNames('panel', 'collapsible-panel',
                                     { 'is-nested': this.props.isNested },
                                     { 'has-nested': this.props.hasNested });

    return (
      <div className={panelClassNames}>
        <div className="panel-heading">
          <a onClick={ ()=> this.setState({ open: !this.state.open, chevronToggle: !this.state.chevronToggle })}>
            <span className="panel-title">{this.panelIcon()}{` ${this.props.panelTitle}`}</span>
            <i className={chevronClassNames}></i>
          </a>
        </div>

        <Collapse className="panel-collapse" in={this.state.open}>
          <div className="panel-body">
            {this.props.children}
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapsiblePanel.displayName = "CollapsiblePanel";

CollapsiblePanel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  panelIcon: PropTypes.string,
  isNested: PropTypes.bool,
  hasNested: PropTypes.bool,
  children: PropTypes.element.isRequired
};

CollapsiblePanel.defaultProps = { isNested: false, hasNested: false };
