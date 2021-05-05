/* eslint-disable no-shadow */
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import { createSingleDocument, getDocuments } from '../store';
import { Button } from '../styles/buttons';

const NewDoc = ({ newDoc, getDocuments }) => {
  const { user, isAuthenticated } = useAuth0();
  const { register, handleSubmit, reset } = useForm();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  const onSubmit = (data) => {
    if (isAuthenticated) {
      newDoc({
        fileName: data.fileName,
        email: user.email,
        name: user.name,
        body: JSON.stringify(initialValue),
      });
    }
    reset();
    getDocuments();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fileName">
          Document Name
          <input
            name="fileName"
            id="fileName"
            type="text"
            {...register('fileName')}
          />
        </label>
        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

// const mapState = (state) => ({
//   document: state.singleDocument,
// })

const mapDispatch = (dispatch) => ({
  newDoc: (document) => dispatch(createSingleDocument(document)),
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(null, mapDispatch)(NewDoc);
