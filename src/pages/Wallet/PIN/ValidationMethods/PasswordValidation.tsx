import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const PasswordValidation:FC<any> = ({ setMethod, setAuthPass }) => {
  const [password, setPassword] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const validatePassword = async (e:any) => {
    e.preventDefault();
    toast.loading('Verifying..');
    try {
      const response = await axiosPrivate.post('step-up-password', JSON.stringify({ password }));
      if (response.status === 200) {
        toast.dismiss();
        setAuthPass(true);
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Incorrect Password!');
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="pb-3">
        <p className="text-secondary mb-3 fs-6">Masukkan Password akun Anda</p>
        <form onSubmit={(e) => validatePassword(e)}>
          <input
            className="form-control p-2 w-50 mx-auto mb-2"
            placeholder="Password Akun"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn w-50 border bg-secondary text-backdrop fw-bold"
          >
            Verifikasi
          </button>
        </form>
      </div>
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn border rounded px-3"
          onClick={() => {
            setMethod('');
            setPassword('');
          }}
        >
          Ubah Metode
        </button>
      </div>
    </div>
  );
};

export default PasswordValidation;
