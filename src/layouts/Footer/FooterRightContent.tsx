import React from 'react';
import Button from '../../components/Button/Button';
import { ReactComponent as IconInstagram } from '../../assets/svg/icon_instagram.svg';
import { ReactComponent as IconWhatsapp } from '../../assets/svg/icon_whatsapp.svg';
import { ReactComponent as IconMail } from '../../assets/svg/icon_mail.svg';

const FooterRightContent = () => {
  const items = [
    {
      iconUrl: IconInstagram,
      iconName: 'instagram',
      name: '@sea_deals',
      path: 'instagram',
    },
    {
      iconUrl: IconWhatsapp,
      iconName: 'whatsapp',
      name: '+628xxxxxxxxxx',
      path: 'whatsapp',
    },
    {
      iconUrl: IconMail,
      iconName: 'email',
      name: 'contact.person@seadeals.com',
      path: 'email',
    },
  ];

  const goToPath = (path: string) => {
    console.log(path);
  };

  return (
    <div className="right_content">
      <h5 className="title">Kontak Kami</h5>
      <div className="items_content">
        {
          items.map(
            (item) => (
              <div
                key={`${item.iconName}`}
                className="item"
              >
                <Button
                  buttonType="plain"
                  text={item.name}
                  iconUrl={item.iconUrl}
                  iconName={item.iconName}
                  handleClickedButton={() => goToPath(item.path)}
                />
                {/* <a href={item.path}>{ item.name }</a> */}
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default FooterRightContent;
