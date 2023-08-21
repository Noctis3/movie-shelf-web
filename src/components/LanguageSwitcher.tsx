import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { HiOutlineTranslate } from 'react-icons/hi';
const LanguageSwitcher = () => {
  const countriesList = [
    {
      code: 'pt',
      name: 'Português',
      flag: '🇧🇷',
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
    },
    {
      code: 'sp',
      name: 'Español',
      flag: '🇪🇸',
    },
  ];

  const { t, i18n } = useTranslation();

  function handleChangeLanguage(language: string) {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    console.log(language);
  }
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<HiOutlineTranslate />}>
        {t('settingsPage.selectLanguage.label')}
      </MenuButton>
      <MenuList boxSize="-moz-min-content">
        {countriesList.map((country) => (
          <MenuItem
            onClick={() => handleChangeLanguage(country.code)}
            gap={3}
            key={country.code}
            minH="48px"
          >
            <span>{country.flag}</span>
            <span>{country.name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
