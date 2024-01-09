import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Users from '../../../api/users';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import './UserProfile.scss';
import InputUserProfile from './InputUserProfile';
import Button from '../../../components/Button/Button';

import { ReactComponent as IconEdit } from '../../../assets/svg/icon_edit.svg';
import storage from '../../../firebase/firebase';
import { setAvatarURL } from '../../../features/navbarProfile/navbarProfileSlice';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../../components/Modal/Modal';
import ChangePassword from './ChangePassword';
import noUserIcon from '../../../assets/png/anonym.png';

const UserProfile:FC<any> = () => {
  const dispatch = useDispatch();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const imageInputRef = useRef<any>();
  const [profile, setProfile] = useState<any>({});
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e:any) => {
    if (e.target.name === 'avatar_url') {
      const [file] = e.target.files;
      // In MegaByte
      if ((file.size / 1024 / 1024) > 2) {
        toast.error('Photo tidak bisa lebih dari 2MB');
        return;
      }
      if (file) {
        const fileLocal = file;
        const reader = new FileReader();
        reader.readAsDataURL(fileLocal);
        imageInputRef.current.value = '';
        reader.onload = () => {
          setProfile({
            ...profile, avatar_file: file, avatar_local: reader.result,
          });
        };
      }
      return;
    }
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePatchProfile = async (body:any) => {
    await Users.UpdateProfile(axiosPrivate, body)
      .then(() => {
        setAuth({
          ...auth,
          user: {
            ...auth.user,
            email: body.email,
            name: body.full_name,
            avatar_url: body.avatar_url,
            username: body.username,
          },
        });
        toast.success('Profil berhasil diperbaharui');
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleSubmit = async () => {
    const body = {
      ...profile,
      birth_date: moment(profile.birth_date),
      avatar_file: '',
      avatar_local: '',
    };
    if (profile.avatar_file) {
      const namePhoto = `profile-photo-${profile.username}-${v4()}`;
      const imgRef = ref(storage, `avatars/user/${namePhoto}`);

      await uploadBytes(imgRef, profile.avatar_file).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((url) => {
          setProfile({
            ...profile,
            avatar_url: url,
            avatar_name: namePhoto,
            avatar_local: '',
            avatar_file: '',
          });
          body.avatar_url = url;
          dispatch(setAvatarURL(url));
        });
      });
    }
    await handlePatchProfile(body).then();
  };

  const findProfile = async () => {
    await Users.GetProfiles(axiosPrivate)
      .then((resp: any) => {
        const { data } = resp.data;
        setProfile(data);
      })
      .catch((err: any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findProfile().then();
  }, []);

  return (
    <div className="profile__container">
      {
        isChangePassword
          && (
          <Modal modalType="modal__change-password" isOpen={isChangePassword} cancel={() => setIsChangePassword(false)}>
            <ChangePassword handleClose={() => setIsChangePassword(false)} />
          </Modal>
          )
      }
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          setIsEdit(false);
          handleSubmit().then();
        }}
      >
        <div className="profile__image-container col-12 col-lg-6">
          <img className="profile__image" src={profile.avatar_local || profile.avatar_url || noUserIcon} alt={profile.full_name} />
          {
            isEdit
              && (
              <span className="d-flex align-self-end">
                {React.createElement(IconEdit, {
                  className: 'icon-edit small',
                  onClick: () => { imageInputRef.current.click(); },
                })}
              </span>
              )
          }
        </div>
        <div className="col-12 col-lg-6">
          <input
            className="form-control d-none"
            name="avatar_url"
            type="file"
            onChange={handleChange}
            ref={imageInputRef}
          />
          <div className="profile__input"><InputUserProfile label="Username" name="username" data={profile.username} handleChange={handleChange} isChangeable={isEdit} /></div>
          <div className="profile__input"><InputUserProfile label="Full Name" name="full_name" data={profile.full_name} handleChange={handleChange} isChangeable={isEdit} /></div>
          <div className="profile__input"><InputUserProfile label="Email" name="email" data={profile.email} handleChange={handleChange} isChangeable={isEdit} typeElement="email" /></div>
          <div className="profile__input">
            <p className="caption-input">Gender</p>
            <select name="gender" className="form-control" onChange={handleChange} value={profile.gender} disabled={!isEdit}>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="profile__input"><InputUserProfile label="Birth Date" name="birth_date" data={profile.birth_date} handleChange={handleChange} isChangeable={isEdit} typeElement="date" /></div>
          <div className="d-flex justify-content-end mt-4">
            {!isEdit && <Button buttonType="secondary alt" handleClickedButton={() => setIsEdit(true)} text="Edit" /> }
            {isEdit && (
              <div className="d-flex gap-2">
                <Button
                  buttonType="secondary alt"
                  handleClickedButton={() => {
                    findProfile().then();
                    setIsEdit(false);
                  }}
                  text="Batal"
                />
                <Button buttonType="secondary" handleClickedButton={() => {}} isSubmit text="Simpan" />
              </div>
            )}
          </div>
        </div>
      </form>
      <span className="divider" />
      <Button buttonType="primary alt" handleClickedButton={() => setIsChangePassword(true)} text="Ganti password" />
    </div>
  );
};

export default UserProfile;
