import React , { useState , useEffect} from 'react';
import { FAVORITES } from '../store/types';
import Modal from './Modal';


type CardProps = {
    // children?: ReactNode;
    classes?: string;
    title?: string;
    description?: string;
    image_url?: string;
    media_type: string;
    url?: string;
    hdurl?: string;
    data:any;
    ClickHandler?: any
  };

const Card: React.FC<CardProps> = ({
    url,
    media_type,
    title,
    description,
    data,
    ClickHandler,
  })  => {
    const [showModal, setShowModal] = useState({
        state: false,
        variant: 'small',
        message: '',
      });
      const [isFavorite, setIsFavorite] = useState(false);

      useEffect(() => {
        checkIsFavorite(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [ isFavorite, data]);

      const checkIsFavorite = (data: any) => {
        let favorites: object[] = [];
        // check get item is the store
        let favoritesStore = localStorage.getItem(FAVORITES);
    
        if (favoritesStore === null) return;
    
        // item in the favorite store
        const storeData: string | null = localStorage.getItem(FAVORITES);
    
        favorites = storeData !== null && JSON.parse(storeData);
    
        const found = favorites.findIndex(
          (item: any) => item.title === data.title || item.url === data.url
        );
    
        found !== -1 ? setIsFavorite(true) : setIsFavorite(false);
      };

    const toggleFavorite = (data: any) => {

        let favorites: object[] = [];
        // check get item is the store
        let favoritesStore = localStorage.getItem(FAVORITES);
    
        if (favoritesStore === null) {
          favorites.push(data);
          localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        } else {
          // item in the favorite store
          const storeData: string | null = localStorage.getItem(FAVORITES);
    
          favorites = storeData !== null && JSON.parse(storeData);
    
          // if item exist in the store
          const found: number = favorites.findIndex(
            (item: any) => item.title === data.title || item.url === data.url
          );
    
          // if item not in the store
          if (found === -1) {
            favorites.push(data);
            localStorage.setItem(FAVORITES, JSON.stringify(favorites));
            setShowModal({
              state: true,
              variant: 'small',
              message: 'Marked as Favourite',
            });
            setIsFavorite(true);
          } else {
            //  remove from favorite
            favorites.splice(found, 1);
            localStorage.setItem(FAVORITES, JSON.stringify(favorites));
            setShowModal({
              state: true,
              variant: 'small',
              message: 'Unmarked as Favourite',
            });
            setIsFavorite(false);
          }
        }
      };
      
    return (
    <div className="center" >
          <Modal
        showModal={showModal.state}
        variant={showModal.variant}
        closeModal={() => {
          setShowModal({ ...showModal, state: false });
        }}
      >
        <h2 style={{ color: 'black' }}>{showModal.message}</h2>
      </Modal>
    <div className="property-card" onClick={(e)=> {ClickHandler(data.date)}}>
      <div onClick={(e)=> {ClickHandler(data.date)}}>
        <div>
        { media_type === 'image' ? (
            <img src={url} className='media' alt={title} />
          ) : (
              <div>
            <iframe
             
              title={title}
              src={url}
              frameBorder='0'
            //   gesture="media"
              allow='encrypted-media'
              allowFullScreen
            //   className='media'
            />
            </div>
          )}
            
          <div className="property-image-title">
            {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
          </div>
        </div></div>
      <div className="property-description">
        <h5> {title} </h5>
        <p>{description}</p>
      </div>
      <div>
    
    
        <div className="property-social-icons" onClick={(e)=> { e.stopPropagation(); toggleFavorite(data)}}>
        <i  className={isFavorite ? 'fa fa-heart' : 'fa fa-heart-o'}  aria-hidden='true'></i> {/* fa-heart */}
        </div>
      </div>
    </div>
  </div>
);
          }

export default Card;
