import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './styles.module.css';
import TOPIC_OPTIONS from '../../constants/topicOptions';
import useStore from '../../hooks/useStore/useStore';
import Form from '../Form/Form';
import Input from '../Form/Input';
import Select, { Option } from '../Form/Select';
import Unsplash from '../Unsplash/Unsplash';
import ShawbrookLogo from '../Icons/ShawbrookLogo';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  topic?: string;
  topicOther?: string;
}

const initialFormErrors: FormErrors = {
  firstName: '',
  lastName: '',
  topic: '',
  topicOther: '',
};

function UserForm() {
  const { user, setUserValue } = useStore();
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.firstName) {
      setFormErrors({
        ...initialFormErrors,
        firstName: 'Please provide a first name',
      });
      return;
    }

    if (!user.lastName) {
      setFormErrors({
        ...initialFormErrors,
        lastName: 'Please provide a last name',
      });
      return;
    }
    if (!user.topic) {
      setFormErrors({
        ...initialFormErrors,
        topic: 'Please select a topic',
      });
      return;
    }
    if (user.topic === 'Other' && !user.topicOther) {
      setFormErrors({
        ...initialFormErrors,
        topicOther: 'Please provide a topic',
      });
      return;
    }

    navigate('/complete');
  };

  return (
    <div className={classes.formHolder}>
      <Form onSubmit={onSubmit}>
        <div className={classes.logoHolder}>
          <ShawbrookLogo />
        </div>

        <div className={classes.explainer}>
          <p>
            Please fill out the form below and we&apos;ll create a card for you!
          </p>
        </div>
        <Input
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={(e) => setUserValue('firstName', e.target.value)}
          required
          error={formErrors.firstName}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={(e) => setUserValue('lastName', e.target.value)}
          required
          error={formErrors.lastName}
        />
        <div className={classes.formGroup}>
          <Select
            label="Topic"
            name="topic"
            value={user.topic}
            onChange={(e) => setUserValue('topic', e.target.value)}
            required
            error={formErrors.topic}
          >
            {TOPIC_OPTIONS.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          {user.topic === 'Other' && (
            <Input
              label="Other (please specify)"
              name="topicOther"
              value={user.topicOther}
              onChange={(e) => setUserValue('topicOther', e.target.value)}
              required
              error={formErrors.topicOther}
            />
          )}
        </div>

        <Unsplash />
      </Form>
    </div>
  );
}

export default UserForm;
