import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faFacebook,
  faYoutube,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const validationSchema = Yup.object({
    status: Yup.string().required('Status is required'),
    skills: Yup.string().required('Skills is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    dispatch(createProfile(values, navigate));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <select {...register('status')}>
            <option value=''>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          {errors.status && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.status.message}
            </small>
          )}
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Company' {...register('company')} />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Website' {...register('website')} />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Location' {...register('location')} />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Skills' {...register('skills')} />
          {errors.skills && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.skills.message}
            </small>
          )}
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            {...register('githubusername')}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            {...register('bio')}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faXTwitter}
                size='2x'
                className='fa-x-twitter'
              />
              <input type='text' placeholder='X URL' {...register('twitter')} />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faFacebook}
                size='2x'
                className='fa-facebook'
              />
              <input
                type='text'
                placeholder='Facebook URL'
                {...register('facebook')}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faYoutube}
                size='2x'
                className='fa-youtube'
              />
              <input
                type='text'
                placeholder='YouTube URL'
                {...register('youtube')}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faLinkedin}
                size='2x'
                className='fa-linkedin'
              />
              <input
                type='text'
                placeholder='Linkedin URL'
                {...register('linkedin')}
              />
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faInstagram}
                size='2x'
                className='fa-instagram'
              />
              <input
                type='text'
                placeholder='Instagram URL'
                {...register('instagram')}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default CreateProfile;
