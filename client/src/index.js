import React, { useState } from 'react';
import { ReactDOM, render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery, useLazyQuery } from '@apollo/client';
import Card from './components/Card';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <select name="category" onChange={onCategorySelected}>
      {data.categories.map((data) => (
        <option key={data} value={data}> { data } </option>
      ))}
    </select>
  );
};


// function Categories() {
//   const { loading, error, data } = useQuery(categories);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error! ${error.message}</p>;
// // console.log('ohssie')
//   // const [getJoke, { loading, data }] = useLazyQuery(categoriesJoke);

//   return data.categories.map((data) => (
//     <div className="cards" key={data} onClick={console.log(data)}>
//       <Card category={data}/>
//     </div>
//   ));
// };

function RandomJoke({ category }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_JOKE, {
    variables: { category },
    notifyOnNetworkStatusChange: true
  });

  // const [getJoke, { loading, data }] = useLazyQuery(categoriesJoke);
  if (networkStatus === 4) return <p>Refetching!</p>;
  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(data.joke.value)
  return (
    <div>
      <Card
        category={data.joke.categories}
        value={data.joke.value}
        created_at={data.joke.created_at} />
      <button onClick={() => refetch()}>Next -></button>
    </div>
    
  );
}

function App() {
  const [category, setCategory] = useState(null);

  function onCategorySelected({ target }) {
    setCategory(target.value);
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Chuck Norris Jokes</h2>
        <Categories onCategorySelected={onCategorySelected}/>
        {category && <RandomJoke category={category} />}
        {/* <RandomJoke/> */}
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
