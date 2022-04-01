import { useEffect, useState } from 'react';
import axios from 'axios';
import { Photo } from '../models/Photo';
import styled from 'styled-components';

const StyledPhotosList = styled.div`
  .listItem {
    display: flex;
    flex-direction: row;
    margin: 1rem;
    border: 1px solid grey;
    border-radius: 1rem;
    overflow: hidden;
  }

  .photo {
    margin-right: 1rem;
  }

  .error {
    background: rgb(211, 55, 55);
    color: white;
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  .loading {
    background: rgb(192, 192, 192);
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  .absolute {
    position: absolute;
    left: 0;
    right: 0;
  }
`;

export default function PhotosList() {
  const [refresh, setRefresh] = useState(0);
  const [name, setName] = useState('');

  return (
    <StyledPhotosList>
      <button onClick={() => setRefresh((cr) => ++cr)}>Refresh</button>
      <div>
        <label>
          Your Name:
          <input
            name="Your name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </StyledPhotosList>
  );
}

function List({ refresh, name }: { refresh: number; name: string }) {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // async function load() {
    //   setLoading(true);

    //   try {
    //     const r = await axios.get<Photo[]>(`/api/photos?name=${name}`);
    //     setPhotos(r.data);
    //     setError('');
    //   } catch (e: any) {
    //     // eslint-disable-next-line
    //     setError(e.response.data.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    async function load() {
      setLoading(true);

      try {
        const r = await fetch(`/api/photos?name=${name}`);
        const json = await r.json();

        if (!r.ok) {
          throw new Error(json.message);
        }

        setPhotos(json);
        setError('');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [refresh, name]);

  return (
    <div>
      <div className={'absolute'}>
        {error ? <div className={'error'}>{error}</div> : null}
        {loading ? <div className={'loading'}>Loading...</div> : null}
      </div>

      {photos.map((photo) => (
        <PhotoItem photo={photo} key={photo.id} />
      ))}
    </div>
  );
}

function PhotoItem({ photo }: { photo: Photo }) {
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    setFavourite(false);
  }, [photo]);

  return (
    <div className={'listItem'}>
      <img
        className={'photo'}
        src={photo.thumbnailUrl}
        aria-label={photo.title}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          onClick={() => {
            // we already have an example with .catch for this video :)
            void axios
              .post<Photo>('/api/favourite', { ...photo, favourite })
              .then((response) => {
                setFavourite(response.data.favourite);
              });
          }}
        >
          {favourite ? 'Remove from Favourites' : 'Add To Favourites'}
        </button>
      </div>
    </div>
  );
}
