import { useTranslation } from 'react-i18next';

const StudyNotes = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1>{t('Home.Course')}</h1>
      <h2>{t('Home.Name')}</h2>
      <h2>0122104951104</h2>
    </div>
  );
};

export default StudyNotes;