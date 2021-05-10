import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormCheckLabel';
import FormControl from 'react-bootstrap/FormControl';

import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';
import {
  updateFilterTime,
  updateFilterLaunchStatus,
  fetchSpacexs,
} from '../../redux/slices/spacexv3/spacexSlice';
import { getTime } from '../../redux/slices/spacexv3/spacexHelper';
import { updatePage } from '../../redux/slices/spacexv3/spacexSlice';

enum Time {
  All = 'all',
  LastWeek = 'lastWeek',
  LastMonth = 'lastMonth',
  LastYear = 'lastYear',
  None = '',
}

enum LaunchStatus {
  All = 'all',
  Success = 'success',
  Failure = 'falure',
  None = '',
}
const SpacexFilterBar = () => {
  const [time, setTime] = useState<Time>(Time.None);
  const [launchStatus, setLaunchStatus] = useState<LaunchStatus>(
    LaunchStatus.None
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (time !== Time.None) {
      if (time === Time.LastWeek) {
        dispatch(
          updateFilterTime({
            time: {
              start: getTime.getLastWeek().start,
              end: getTime.getLastWeek().end,
            },
          })
        );
      }

      if (time === Time.LastMonth) {
        dispatch(
          updateFilterTime({
            time: {
              start: getTime.getLastMonth().start,
              end: getTime.getLastMonth().end,
            },
          })
        );
      }

      if (time === Time.LastYear) {
        dispatch(
          updateFilterTime({
            time: {
              start: getTime.getLastYear().start,
              end: getTime.getLastYear().end,
            },
          })
        );
      }
      if (time === Time.All) {
        dispatch(updateFilterTime({ time: undefined }));
      }
      dispatch(updatePage(0));
      dispatch(fetchSpacexs());
    }
  }, [time, dispatch]);

  useEffect(() => {
    if (launchStatus !== LaunchStatus.None) {
      if (launchStatus === LaunchStatus.All) {
        dispatch(updateFilterLaunchStatus({ launchStatus: undefined }));
      }
      if (launchStatus === LaunchStatus.Success) {
        dispatch(updateFilterLaunchStatus({ launchStatus: true }));
      }
      if (launchStatus === LaunchStatus.Failure) {
        dispatch(updateFilterLaunchStatus({ launchStatus: false }));
      }
      dispatch(updatePage(0));
      dispatch(fetchSpacexs());
    }
  }, [dispatch, launchStatus]);

  return (
    <Container>
      <Row>
        <Col xs={0} md={3} lg={4}></Col>
        <Col xs={12} md={6} lg={4}>
          <FormLabel>Select time</FormLabel>
          <FormControl
            onChange={(e) => setTime(e.target.value as Time)}
            as="select"
            value={time}
            custom
          >
            <option value={Time.All}>All</option>
            <option value={Time.LastWeek}>Last week</option>
            <option value={Time.LastMonth}>Last month</option>
            <option value={Time.LastYear}>Last year</option>
          </FormControl>

          <FormLabel>Launch Status</FormLabel>
          <FormControl
            value={launchStatus}
            onChange={(e) => setLaunchStatus(e.target.value as LaunchStatus)}
            as="select"
            custom
          >
            <option value={LaunchStatus.All}>All</option>
            <option value={LaunchStatus.Success}>Success</option>
            <option value={LaunchStatus.Failure}>Failure</option>
          </FormControl>
        </Col>
        <Col xs={0} md={3} lg={4}></Col>
      </Row>
    </Container>
  );
};

export default SpacexFilterBar;
