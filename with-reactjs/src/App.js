import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';

import Product from './Product';

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { graphcms: { products } } = await request(
        'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
        `
      { 
        graphcms {
          products {
            id
            name
            slug
          }
        }
      }
    `
      );

      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Router>
        {!products ? (
          'Loading'
        ) : (
          <React.Fragment>
            <ul>
              {products.map(({ id, name, slug }) => (
                <li key={id}>
                  <Link to={`/products/${slug}`}>{name}</Link>
                </li>
              ))}
            </ul>
            <Switch>
              <Route path="/products/:slug">
                <Product products={products} />
              </Route>
            </Switch>
          </React.Fragment>
        )}
      </Router>
    </div>
  );
}

export default App;
