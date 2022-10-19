import React from 'react';
import styles from './styles.module.css';

const ProfilePhoto = (props) => {
  const { src } = props ?? {};
  return <img src={src} className={styles.profile} />;
};

export default ProfilePhoto;
