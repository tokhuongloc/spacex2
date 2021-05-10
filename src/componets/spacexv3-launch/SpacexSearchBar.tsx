import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';

import { useAppDispatch } from '../../hooks/state-dispatch/useAppDispatch';

import {
  updateSearchTerm,
  resetPaginationOffsetAndPageIndex,
  fetchSpacexs,
} from '../../redux/slices/spacexv3/spacexSlice';

const SpacexSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSearchTerm(searchTerm));
    dispatch(resetPaginationOffsetAndPageIndex());

    const timeId = setTimeout(() => {
      dispatch(fetchSpacexs());
    }, 700);

    return () => {
      clearTimeout(timeId);
    };
  }, [dispatch, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col xs={0} md={3} lg={4}></Col>
        <Col xs={12} md={6} lg={4}>
          <FormGroup>
            <FormControl
              value={searchTerm}
              onChange={handleInputChange}
              type="text"
              placeholder="Search for Rocket Name..."
            />
          </FormGroup>
        </Col>
        <Col xs={0} md={3} lg={4}></Col>
      </Row>
    </Container>
  );
};

export default SpacexSearchBar;
