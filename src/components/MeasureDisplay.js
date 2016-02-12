import React, { Component } from 'react';

export default class MeasureDisplay extends Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <h3>Filters</h3>
          <p className="input-group">
            <input type="text" value="" className="form-control category-measure-search" placeholder="measure or group title" />
            <span className="input-group-btn"><button type="button" className="btn btn-default clear-search">&times;</button></span>
          </p>
          <div className="panel-group measure-selectors">
            <div className="panel panel-default">
              <div className="toggleable panel-heading" data-toggle="collapse" data-parent=".measure-selectors" data-target="#categoryCore">
                <h4 className="panel-title">
                  <div className="selection-pull-out">
                    <span className="measure-count">0</span>
                    <i className="panel-chevron glyphicon glyphicon-chevron-right"></i>
                  </div>
                  Core
                </h4>
              </div>
              <div id="categoryCore" className="panel-collapse collapse">
                <div className="panel-body">
                  <div className="btn-block-container">
                    <button type="button" className="btn btn-checkbox btn-block all">Select All</button>
                  </div>
                  <div className="btn-block-container">
                    <button type="button" className="btn btn-checkbox btn-block individual">
                      CMS136v4/0108 - ADHD: Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication
                    </button>
                  </div>
                  <div className="btn-block-container">
                    <button type="button" className="btn btn-checkbox btn-block individual">
                      CMS146v3/0002 - Appropriate Testing for Children with Pharyngitis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="main-heading">
            <h1 className="title">Measures</h1>
          </div>
        </div>
      </div>
    );
  }
}
