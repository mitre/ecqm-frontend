import { expect } from '../test_helper';
import {
  REQUEST_NEW_QUALITY_REPORT,
  POST_NEW_QUALITY_REPORT
} from '../../src/actions/types';
import postNewQualityReportRequests from '../../src/middlewares/post_new_quality_reports';
import MockStore from '../mock_store';

describe('postNewQualityReportRequests middleware', () => {
  let store;

  beforeEach(() => {
    store = new MockStore();
  });

  it('will poll when measure calculation has not yet completed', (done) => {
    const action = {type: REQUEST_NEW_QUALITY_REPORT, measure: {hqmfId: '1234', subMeasures: [{subId: undefined}]}};
    const next = () => {
      1 + 1; //do nothing
    };
    postNewQualityReportRequests(store)(next)(action);
    let postAction = store.dispatchedActions.find((a) => a.type === POST_NEW_QUALITY_REPORT);
    expect(postAction).to.exist;
    expect(postAction.payload).to.exist;
    done();
  });
});
