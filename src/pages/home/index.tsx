import React, { useEffect, useState } from 'react'
import FileUploadSection from './components/FileUpload/index'
import Auth from "../../services/auth.service"
import NotificationService from '@/services/notification.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import { useDispatch } from 'react-redux'


const index = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      Auth
        .getUserViaAccessToken()
        .then((response) => {
          setLoading(false);
          if (response?.status) {
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{`${err?.message}, please try again`}</p>,
            position: "top-center",
          });
        });
    } catch (err) {
    }
  }, []);
  return (
    <div>
      <FileUploadSection />
    </div>
  )
}

export default index