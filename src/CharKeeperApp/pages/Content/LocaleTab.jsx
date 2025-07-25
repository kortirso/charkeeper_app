import { Show } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { createWindowSize } from '@solid-primitives/resize-observer';

import { PageHeader, IconButton, Select } from '../../components';
import { Arrow } from '../../assets';
import { useAppState, useAppLocale, useAppAlert } from '../../context';
import { updateUserRequest } from '../../requests/updateUserRequest';

export const LocaleTab = (props) => {
  const size = createWindowSize();

  const [appState] = useAppState();
  const [{ renderAlerts }] = useAppAlert();
  const [locale, dict, { setLocale }] = useAppLocale();

  const t = i18n.translator(dict);

  const changeLocale = async (value) => {
    const result = await updateUserRequest(appState.accessToken, { locale: value });
    if (result.errors === undefined) setLocale(value);
    else renderAlerts(result.errors);
  }

  return (
    <>
      <Show when={size.width < 768}>
        <PageHeader
          leftContent={
            <IconButton onClick={props.onNavigate}>
              <Arrow back width={20} height={20} />
            </IconButton>
          }
        >
          <p>{t('settingsPage.changeLocale')}</p>
        </PageHeader>
      </Show>
      <div class="p-4 flex-1 flex flex-col overflow-y-scroll">
        <Select
          labelText={t('settingsPage.changeLocale')}
          items={{ 'en': 'English', 'ru': 'Русский' }}
          selectedValue={locale()}
          onSelect={(value) => changeLocale(value)}
        />
      </div>
    </>
  );
}
