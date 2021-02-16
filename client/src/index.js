import React, { useState } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header, Dropdown, Loader, Grid } from 'semantic-ui-react'
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { Card, Button, Divider } from 'semantic-ui-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const GET_CATEGORIES = gql`
  query GetCategories{
    categories
  }
`;

const GET_JOKE = gql`
  query Joke($category: String!) {
    joke(category: $category) {
      categories
      created_at
      icon_url
      id
      updated_at
      url
      value
    }
  }
`;

function Categories({ onCategorySelected }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <Loader active size='medium' inline='centered'>Loading</Loader>;
  if (error) return <p>Error! ${error.message}</p>;

  const dropdownOptions = data.categories.map((data) => ({
    key: data,
    text: data,
    value: data,
  }));
  console.log(dropdownOptions)

  return (
    <Dropdown 
      placeholder='Select Joke Category'
      name="category"
      fluid
      selection
      options={dropdownOptions}
      onChange={onCategorySelected}
    />
  );
};

function RandomJoke({ category }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_JOKE, {
    variables: { category },
    notifyOnNetworkStatusChange: true
  });

  if (networkStatus === 4) return <Loader active size='medium' inline='centered'>Refetching!</Loader>;
  if (loading) return null;
  if (error) return `Error! ${error}`;
  
  return (
    <div>
      <Card
        color='grey'
        fluid
        header={data.joke.categories}
        description={data.joke.value}/>
      <Button fluid secondary onClick={() => refetch()}>Next</Button>
    </div>
    
  );
}

function App() {
  const [category, setCategory] = useState(null);

  function onCategorySelected({ target }) {
    console.log(target)
    setCategory(target.innerText);
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <Container text style={{ marginTop: 200 }}>
              <Header as='h2' style={{ textAlign: 'center' }}>Chuck Norris Jokes</Header>
              <Divider />
              <Categories onCategorySelected={onCategorySelected}/>
              <Divider />
              {category && <RandomJoke category={category} />}
            </Container>
          </Grid.Column>

        </Grid>
        
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
