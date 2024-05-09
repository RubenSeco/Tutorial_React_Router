import { Favorite } from '../components/Favorite';
import { Form, useLoaderData } from 'react-router-dom';
import { getContact , updateContact } from '../contacts';

export interface ContactType {
  first: string;
  last: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite: boolean;
}

// const contact: ContactType = {
//   first: 'Ruben',
//   last: 'Seco',
//   avatar: 'http://placekitten.com/200/200',
//   twitter: 'your_handle',
//   notes: 'Some notes',
//   favorite: true
// };

export const loader = async ({ params }: any) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found'
    });
  }
  return { contact };
};

export const action = async ({ request, params }: any) => {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true'
  });
};

export const Contact = () => {
  const { contact } = useLoaderData() as { contact: ContactType };
  return (
    <div id='contact'>
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar}
          alt='avatar'
        />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>{' '}
          </p>
        )}
        {contact.notes && <p>{contact.notes}</p>}
        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>
          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (!window.confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}>
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

