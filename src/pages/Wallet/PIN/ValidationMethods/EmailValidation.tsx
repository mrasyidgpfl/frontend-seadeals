import React, { FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const EmailValidation:FC<any> = ({ setMethod, setAuthPass }) => {
  const axiosPrivate = useAxiosPrivate();

  const [emailSent, setEmailSent] = useState(false);
  const [emailKey, setEmailKey] = useState(null);
  const [token, setToken] = useState('');

  const requestEmail = async () => {
    toast.loading('requesting email');
    setEmailSent(true);
    try {
      const response = await axiosPrivate.post('/wallet/pin-by-email/');
      const { data } = response;
      if (response.status === 200) {
        toast.dismiss();
        setEmailKey(data.data.key);
      }
    } catch (err) {
      toast.error('error requesting email');
    }
  };

  const validateToken = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailKey) return;

    try {
      const response = await axiosPrivate.post(
        '/wallet/validator/pin-by-email/code',
        JSON.stringify({ key: emailKey, code: token }),
      );

      if (response.status === 200) {
        toast.dismiss();
        setAuthPass(true);
      }
    } catch (err) {
      toast.error('reset token tidak valid');
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="pb-3">
        {emailSent
          ? (
            <>
              <p className="text-secondary mb-3 fs-6">Masukkan Reset Token pada Email Anda</p>
              <form onSubmit={(e) => validateToken(e)}>
                <input
                  className="form-control p-2 w-50 mx-auto mb-2 text-center"
                  placeholder="Reset Token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <button
                  type="submit"
                  className={`btn w-50 border bg-secondary text-backdrop fw-bold ${!emailKey && 'disabled'}`}
                >
                  Verifikasi
                </button>
              </form>
            </>
          )
          : (
            <>
              <p className="text-secondary mb-3 fs-6">Klik untuk request Token melalui Email Anda</p>
              <button
                disabled={emailSent}
                type="submit"
                className="btn w-50 border bg-secondary text-backdrop fw-bold"
                onClick={() => requestEmail()}
              >
                Request Token
              </button>
            </>
          )}

      </div>
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn border rounded px-3"
          onClick={() => {
            setMethod('');
            setToken('');
          }}
        >
          Ubah Metode
        </button>
      </div>
    </div>
  );
};

export default EmailValidation;
