import { expect } from '../test_helper';
import {
  POST_NEW_QUALITY_REPORT_FULFILLED,
  POST_NEW_QUALITY_REPORT
} from '../../src/actions/types';
import checkQualityReportResponse from '../../src/middlewares/check_qr_response';
import MockStore from '../mock_store';

describe('checkQualityReportResponse middleware', () => {
  let store;

  beforeEach(() => {
    store = new MockStore();
  });

  it('will poll when measure calculation has not yet completed', (done) => {
    const action = {type: POST_NEW_QUALITY_REPORT_FULFILLED, payload: {status: {state: "requested"}}};
    const next = () => {
      1 + 1; //do nothing
    };
    checkQualityReportResponse(100)(store)(next)(action);
    setTimeout(() => {
      let action = store.dispatchedActions.find((a) => a.type === POST_NEW_QUALITY_REPORT);
      expect(action).to.exist;
      expect(action.payload).to.exist;
      done();
    }, 150);
  });
});
