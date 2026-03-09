import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
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

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const { profile, loading } = useSelector((state) => state.profile);

  const validationSchema = Yup.object({
    status: Yup.string().required('Status is required'),
    skills: Yup.string().required('Skills is required'),
    website: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    twitter: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    facebook: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    linkedin: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    youtube: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
    instagram: Yup.string()
      .url('Valid URL required')
      .nullable()
      .transform((v) => (v === '' ? null : v)),
  });

  const {
    register,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());

    if (!loading && profile) {
      const profileData = {
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram,
      };
      reset(profileData);
    }
  }, [loading, dispatch, profile, reset]);

  const onSubmit = (values) => {
    dispatch(createProfile(values, navigate, true));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
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
          {errors.website && (
            <small className='form-text' style={{ color: 'red' }}>
              {errors.website.message}
            </small>
          )}
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
              <div style={{ width: '100%' }}>
                <input
                  type='text'
                  placeholder='X URL'
                  {...register('twitter')}
                />
                {errors.twitter && (
                  <small className='form-text' style={{ color: 'red' }}>
                    {errors.twitter.message}
                  </small>
                )}
              </div>
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faFacebook}
                size='2x'
                className='fa-facebook'
              />
              <div style={{ width: '100%' }}>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  {...register('facebook')}
                />
                {errors.facebook && (
                  <small className='form-text' style={{ color: 'red' }}>
                    {errors.facebook.message}
                  </small>
                )}
              </div>
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faYoutube}
                size='2x'
                className='fa-youtube'
              />
              <div style={{ width: '100%' }}>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  {...register('youtube')}
                />
                {errors.youtube && (
                  <small className='form-text' style={{ color: 'red' }}>
                    {errors.youtube.message}
                  </small>
                )}
              </div>
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faLinkedin}
                size='2x'
                className='fa-linkedin'
              />
              <div style={{ width: '100%' }}>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  {...register('linkedin')}
                />
                {errors.linkedin && (
                  <small className='form-text' style={{ color: 'red' }}>
                    {errors.linkedin.message}
                  </small>
                )}
              </div>
            </div>

            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faInstagram}
                size='2x'
                className='fa-instagram'
              />
              <div style={{ width: '100%' }}>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  {...register('instagram')}
                />
                {errors.instagram && (
                  <small className='form-text' style={{ color: 'red' }}>
                    {errors.instagram.message}
                  </small>
                )}
              </div>
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

export default EditProfile;
