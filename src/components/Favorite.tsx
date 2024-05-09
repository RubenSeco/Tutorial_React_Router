import { useFetcher } from 'react-router-dom';
import { ContactType } from '../routes/Contact';

export const Favorite = ({ contact }: { contact: ContactType }) => {
  const fetcher = useFetcher();

  let { favorite } = contact;

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
};
