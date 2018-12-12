import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Cool shoes',
    description: 'I love shoes',
    image: '',
    largeImage: '',
    price: 10,
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === Number ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }
  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            const res = await createItem();
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id}
            })
            console.log(res);
          }}
          >
            <Error error={error} />
            <fieldset
              disabled={loading}
              area-busy={loading.toString()}
            >
              <label htmlFor="title">
                Title
             <input type="text" id="title" name="title" placeholder="Title" required onChange={this.handleChange} value={this.state.title} />
              </label>
              <label htmlFor="price">
                Price
             <input type="number" id="price" name="price" placeholder="Price" required onChange={this.handleChange} value={this.state.price} />
              </label>
              <label htmlFor="description">
                Description
             <input type="text-area" id="description" name="description" placeholder="Enter a description" required onChange={this.handleChange} value={this.state.description} />
              </label>
              <button type="submit">
                Submit
           </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;