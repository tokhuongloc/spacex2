import SpacexCard from './SpacexCard';
import { useAppSelector } from '../../hooks/state-dispatch/useAppSelector';
import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

import {
  updatePaginationOffsetAndPageIndex,
  fetchSpacexs,
} from '../../redux/slices/spacexv3/spacexSlice';

import { nanoid } from '@reduxjs/toolkit';

const SpacexList = () => {
  const { list, status, error, pagination } = useAppSelector(
    (state) => state.spacex
  );
  const dispatch = useAppDispatch();

  const renderPaginationBtns = () => {
    return Array.from({ length: pagination.totalPages }, (_, idx) => {
      return (
        <Pagination.Item
          onClick={() => {
            dispatch(updatePaginationOffsetAndPageIndex(idx));
            dispatch(fetchSpacexs());
          }}
          key={idx}
          active={idx === pagination.pageIndex}
        >
          {idx + 1}
        </Pagination.Item>
      );
    });
  };

  if (status === 'pending') {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (status === 'success') {
    if (list.length === 0) {
      return (
        <div className="w-75 mt-2 mt-md-5 mx-auto">
          <Alert variant="warning">No result founded!</Alert>
        </div>
      );
    }
    if (list.length > 0) {
      return (
        <Container className="mt-2 mt-md-5">
          <Row>
            {list.map((spacex) => (
              <SpacexCard key={nanoid()} spacex={spacex} />
            ))}
          </Row>
          <Row className="mt-5 justify-content-center">
            <Pagination className="justify-content-center">
              {renderPaginationBtns()}
            </Pagination>
          </Row>
        </Container>
      );
    }
  }

  if (status === 'failure') {
    return (
      <div className="w-75 mt-2 mt-md-5 mx-auto">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpacexList;
