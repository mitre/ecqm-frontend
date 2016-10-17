import { expect } from '../test_helper';
import { measureTestObject3 } from '../test_props';
import MockStore from '../mock_store';
import postNewQualityReportRequests from '../../src/middlewares/post_new_quality_reports';
import {
  FETCH_NEW_QUALITY_REPORT,
  POST_NEW_QUALITY_REPORT
} from '../../src/actions/types';

describe('postNewQualityReportRequests middleware', () => {
  let store;

  beforeEach(() => {
    store = new MockStore();
  });

  it('will poll when measure calculation has not yet completed', (done) => {
    const action = {
      type: FETCH_NEW_QUALITY_REPORT,
      payload: measureTestObject3
    };

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
