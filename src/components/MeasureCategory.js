import React, { Component } from 'react';

class MeasureCategory extends Component {
  render() {
    return (
      <div className="panel-group measure-selectors">
        <div className="panel panel-default">
          <div className="toggleable panel-heading" data-toggle="collapse" data-parent=".measure-selectors" data-target={"#category-" + this.props.category.replace(/\s/g, '')}>
            <h4 className="panel-title">
              <div className="selection-pull-out">
                <span className="measure-count">0</span>
                <i className="panel-chevron glyphicon glyphicon-chevron-right"></i>
              </div>
              {this.props.category}
            </h4>
          </div>
          <div id={"category-" + this.props.category.replace(/\s/g, '')} className="panel-collapse collapse">
            <div className="panel-body">
              <div className="btn-block-container">
                <button type="button" className="btn btn-checkbox btn-block all">Select All</button>
              </div>
              {this.props.measures.map(measure =>
              <div className="btn-block-container" key={measure.cmsId}>
                <button type="button" className="btn btn-checkbox btn-block individual">
                  {measure.cmsId} - {measure.name}
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeasureCategory;
