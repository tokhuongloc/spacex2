import SpacexCard from './SpacexCard';
import { useAppSelector } from '../../hooks/state-dispatch/useAppSelector';
import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';

import { updatePage } from '../../redux/slices/spacexv3/spacexSlice';

import { nanoid } from '@reduxjs/toolkit';

const SpacexList = () => {
  const { list, status, error, page } = useAppSelector((state) => state.spacex);
  const dispatch = useAppDispatch();

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
      const spaceXPerPage = 16;
      const pages = Math.ceil(list.length / spaceXPerPage);
      const newLists = Array.from({ length: pages }, (_, index) => {
        const start = index * spaceXPerPage;
        const end = start + spaceXPerPage;
        const itemInPage = list.slice(start, end);
        return itemInPage;
      });
      return (
        <Container className="mt-2 mt-md-5">
          <Row>
            {newLists[page].map((spacex) => (
              <SpacexCard key={nanoid()} spacex={spacex} />
            ))}
          </Row>
          <Row className="mt-5 justify-content-center">
            <Pagination className="justify-content-center">
              {newLists.map((_, idx) => (
                <Pagination.Item
                  onClick={() => dispatch(updatePage(idx))}
                  key={idx}
                  active={idx === page}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
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
