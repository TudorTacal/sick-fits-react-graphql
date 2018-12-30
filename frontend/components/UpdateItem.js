import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === Number ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('Updating Item', this.props.id);
    console.log(this.state);

    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for ID not real</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} area-busy={loading.toString()}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.item.title}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.item.price}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <input
                        type="text-area"
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.item.description}
                      />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
