import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    school: Yup.string().required('School is required'),
    degree: Yup.string().required('Degree is required'),
    fieldofstudy: Yup.string().required('Field of study is required'),
    from: Yup.string().required('From date is required'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const current = watch('current');

  const onSubmit = (data) => {
    dispatch(addEducation(data, navigate));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            {...register('school')}
          />
          {errors.school && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.school.message}
            </small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            {...register('degree')}
          />
          {errors.degree && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.degree.message}
            </small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            {...register('fieldofstudy')}
          />
          {errors.fieldofstudy && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.fieldofstudy.message}
            </small>
          )}
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
            <input type='checkbox' {...register('current')} /> Current School
          </p>
        </div>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='5'
            placeholder='Program Description'
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

export default AddEducation;
