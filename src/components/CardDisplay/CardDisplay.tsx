import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/useStore/useStore';
import ShawbrookLogo from '../Icons/ShawbrookLogo';
import classes from './styles.module.css';

function CardDisplay() {
  const { image, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.firstName || !user.lastName || !user.topic || !image?.url) {
      navigate('/');
    }
  }, [image?.url, navigate, user.firstName, user.lastName, user.topic]);

  return (
    <div className={classes.cardOuter}>
      <div className={classes.cardHolder}>
        <img src={image?.url} alt={image?.alt} className={classes.image} />
        <div className={classes.logoHolder}>
          <ShawbrookLogo className={classes.logo} />
        </div>
        <div className={classes.contentHolder}>
          <div className={classes.name}>
            {user.firstName} {user.lastName}
          </div>
          <div className={classes.tag}>
            {user.topic === 'Other' ? user.topicOther : user.topic}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDisplay;
