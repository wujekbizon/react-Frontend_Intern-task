import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Container = styled.div`
  height: 100vh;
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 15%;
  padding: 5px;
  margin: 30px 0px;
  background-color: #21262d;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &.active,
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  width: 500px;
  height: 600px;

  -webkit-box-shadow: 0px 0px 10px 1px rgba(201, 209, 217, 0.8);
  box-shadow: 0px 0px 10px 1px rgba(201, 209, 217, 0.8);
  border-radius: 10px;
`;

const Title = styled.h3`
  text-align: center;
  padding-top: 20px;
  font-size: 25px;
  font-weight: 600;
  color: white;
`;

const WidgetTable = styled.table`
  width: 100%;
  border-spacing: 20px;
  color: white;
  padding-left: 20px;
`;

const Tbody = styled.tbody``;

const WidgetTr = styled.tr`
  text-align: left;
`;

const WidgetTh = styled.th``;

const WidgetThYear = styled.th`
  padding-left: 20px;
`;

const WidgetTdName = styled.td`
  border-radius: 5px;
  color: black;
  background-color: ${(props) => props.color};
  font-size: 20px;
`;

const WidgetTdYear = styled.td`
  padding-left: 20px;
`;

const WidgetTdColorId = styled.td``;

const PaginationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  color: white;
`;
const LeftArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ArrowTitle = styled.span`
  margin: 0px 10px;
  font-size: 18px;
`;

const RightArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://reqres.in/api/products/', {
          params: {
            page: 1,
            per_page: 5,
          },
        });
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://reqres.in/api/products/', {
        params: {
          id: query,
        },
      });

      setFiltered(res.data.data);
    };

    fetchData();
  }, [data, query]);

  const firstPageFetch = () => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://reqres.in/api/products/', {
          params: {
            page: 1,
            per_page: 5,
          },
        });
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    setActive(!active);
  };

  const secondPageFetch = () => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://reqres.in/api/products/', {
          params: {
            page: 2,
            per_page: 5,
          },
        });
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    setActive(!active);
  };

  return (
    <Container>
      <Title>Search Color By Id</Title>
      <Input
        type="number"
        onChange={(e) => setQuery(e.target.value)}
        min="1"
        max="10"
      />
      <Wrapper>
        <Title>Color Palette</Title>

        {filtered && (
          <WidgetTable>
            <Tbody>
              {query && (
                <WidgetTr>
                  <WidgetTh>Id</WidgetTh>
                  <WidgetTh>Name</WidgetTh>
                  <WidgetThYear>Year</WidgetThYear>
                </WidgetTr>
              )}
              <WidgetTr key={filtered.id}>
                <WidgetTdColorId>{filtered.id}</WidgetTdColorId>
                <WidgetTdName color={filtered.color}>
                  {filtered.name}
                </WidgetTdName>
                <WidgetTdYear>{filtered.year}</WidgetTdYear>
              </WidgetTr>
            </Tbody>
          </WidgetTable>
        )}

        {!query && (
          <WidgetTable>
            <Tbody>
              <WidgetTr>
                <WidgetTh>Id</WidgetTh>
                <WidgetTh>Name</WidgetTh>
                <WidgetThYear>Year</WidgetThYear>
              </WidgetTr>
              {data.map((d) => (
                <WidgetTr key={d.id}>
                  <WidgetTdColorId>{d.id}</WidgetTdColorId>
                  <WidgetTdName color={d.color}>{d.name}</WidgetTdName>
                  <WidgetTdYear>{d.year}</WidgetTdYear>
                </WidgetTr>
              ))}
            </Tbody>
          </WidgetTable>
        )}
        <PaginationContainer>
          {active ? (
            <LeftArrowContainer>
              <ArrowTitle>Previous</ArrowTitle>
              <ChevronLeftIcon
                style={{ cursor: 'pointer' }}
                onClick={firstPageFetch}
              />
            </LeftArrowContainer>
          ) : (
            <RightArrowContainer>
              <ArrowTitle>Next</ArrowTitle>
              <ChevronRightIcon
                style={{ cursor: 'pointer' }}
                onClick={secondPageFetch}
              />
            </RightArrowContainer>
          )}
        </PaginationContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
