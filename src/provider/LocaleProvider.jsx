import React from 'react'
import { IntlProvider } from 'react-intl'
import AppLocale from '../language-provider';

const LocaleProvider = ({children}) => {
    const language =  'en';
    const currentAppLocale = AppLocale[language];
  
 
    return (
    <IntlProvider
    locale={currentAppLocale.locale}
    messages={currentAppLocale.messages}>{children}</IntlProvider>
  )
}

export default LocaleProvider