'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookingRequest } from '@/types/car';
import { createBookingRequest } from '@/lib/api';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';

interface BookingFormProps {
  carId: string;
}

interface BookingFormValues {
  name: string;
  email: string;
  comment: string;
}

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .matches(/^[\p{L}][\p{L}\s'-]{1,}$/u, 'Please enter your name.')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter your email.')
    .required('Email is required'),
  comment: Yup.string()
    .max(200, 'Comment is too long')
    .required('Comment is required'),
});

const BookingForm = ({ carId }: BookingFormProps) => {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      carId,
      request,
    }: {
      carId: string;
      request: BookingRequest;
    }) => createBookingRequest(carId, request),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['bookings', carId] });
      toast.success(data.message);
    },
    onError: error => {
      toast.error(error.message || 'Failed to send booking request');
    },
  });

  const handleSubmit = (
    values: BookingFormValues,
    actions: FormikHelpers<BookingFormValues>
  ) => {
    mutation.mutate(
      { carId, request: values },
      {
        onSuccess: () => {
          actions.resetForm();
        },
      }
    );
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formGroupWrapper}>
              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-username`} className={css.label}>
                  Name
                </label>
                <div className={css.inputWrapper}>
                  {touched.name && errors.name && (
                    <span className={css.errorText} aria-hidden="true">
                      Name*
                    </span>
                  )}
                  <Field
                    id={`${fieldId}-name`}
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={`${css.input} ${touched.name && errors.name ? css.inputError : ''}`}
                  />
                  {touched.name && errors.name && (
                    <svg
                      className={css.errorIcon}
                      width={20}
                      height={20}
                      aria-hidden="true">
                      <use href="/icons.svg#icon-error" />
                    </svg>
                  )}
                </div>
                <ErrorMessage
                  component="span"
                  name="name"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-email`} className={css.label}>
                  Email
                </label>
                <div className={css.inputWrapper}>
                  {touched.email && errors.email && (
                    <span className={css.errorText} aria-hidden="true">
                      Email*
                    </span>
                  )}
                  <Field
                    id={`${fieldId}-email`}
                    type="text"
                    name="email"
                    placeholder="Email*"
                    className={`${css.input} ${touched.email && errors.email ? css.inputError : ''}`}
                  />
                  {touched.email && errors.email && (
                    <svg
                      className={css.errorIcon}
                      width={20}
                      height={20}
                      aria-hidden="true">
                      <use href="/icons.svg#icon-error" />
                    </svg>
                  )}
                </div>
                <ErrorMessage
                  component="span"
                  name="email"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-comment`} className={css.label}>
                  Comment
                </label>
                <div className={css.inputWrapper}>
                  <Field
                    as="textarea"
                    id={`${fieldId}-comment`}
                    type="text"
                    name="comment"
                    rows={3}
                    placeholder="Comment"
                    className={`${css.textarea} ${touched.comment && errors.comment ? css.inputError : ''}`}
                  />
                  {touched.comment && errors.comment && (
                    <svg
                      className={css.errorIconTextarea}
                      width={20}
                      height={20}
                      aria-hidden="true">
                      <use href="/icons.svg#icon-error" />
                    </svg>
                  )}
                </div>
                <ErrorMessage
                  component="span"
                  name="comment"
                  className={css.error}
                />
              </div>
            </div>
            <button
              className={css.button}
              type="submit"
              disabled={mutation.isPending}>
              {mutation.isPending ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default BookingForm;
