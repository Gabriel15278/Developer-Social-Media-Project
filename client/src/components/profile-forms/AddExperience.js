import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    company: Yup.string().required('Company is required'),
    from: Yup.string().required('From date is required'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const current = watch('current');

  const onSubmit = (data) => {
    dispatch(addExperience(data, navigate));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input type='text' placeholder='* Job Title' {...register('title')} />
          {errors.title && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.title.message}
            </small>
          )}
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Company' {...register('company')} />
          {errors.company && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.company.message}
            </small>
          )}
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' {...register('location')} />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' {...register('from')} />
          {errors.from && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.from.message}
            </small>
          )}
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' {...register('to')} disabled={current} />
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' {...register('current')} /> Current Job
          </p>
        </div>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
            placeholder='Job Description'
            {...register('description')}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;
