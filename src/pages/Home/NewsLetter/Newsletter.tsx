import React, { useState } from 'react';
import mail from './mail.svg';
import check from './check.svg';
import newsletterImg from './newsletter-img.jpg';

interface FormData {
  email: string;
  agreement: boolean;
}

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    agreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="information-block newsletter">
      <div className="information-block__rectangle" aria-hidden="true" />

      <div className="container--big">
        <div className="information-block__img">
          <img 
            src={newsletterImg} 
            alt="Декоративное изображение для секции подписки на рассылку" 
          />
        </div>

        <div className="information-block__info">
          <div className="information-block__title">
            <div className="bold">Подпишись</div>
            <div>и получи персональные скидки, подарки и спецпредложения</div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="newsletter__row">
              <div className="newsletter__block-field">
                <input
                  className="newsletter__field"
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Email для подписки на рассылку"
                />
                <img src={mail} alt="" aria-hidden="true" />
              </div>

              <button 
                type="submit" 
                className="btn btn--active btn--flex"
                disabled={!formData.agreement}
              >
                подписаться
              </button>
            </div>

            <label className="newsletter__agreement-block" htmlFor="newsletter__agreement">
              <input
                type="checkbox"
                id="newsletter__agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
              />
              <div className="newsletter__agreement-fake">
                <img 
                  className="newsletter__agreement-svg" 
                  src={check} 
                  alt="" 
                  aria-hidden="true"
                />
              </div>
              <p>
                я ознакомлен и согласен с&nbsp;
                <a href="#" target="_blank" rel="noopener noreferrer">
                   политикой обработки персональных данных
                </a>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 