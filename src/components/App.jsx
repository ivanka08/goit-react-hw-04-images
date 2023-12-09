import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';
import Button from './Button/Button';
import { fetchData } from './api';


const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    fetchImages();
     if (!query) return;
  }, [query, page]);

  const saveSearchQuery = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await fetchData(query, page);
      setImages((prevImages) =>
        page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
      );
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const getIndex = (currentIndex) => {
    setIndex(currentIndex);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={saveSearchQuery} />
      <ImageGallery>
        {images.map((image, idx) => (
          <ImageGalleryItem
            onClick={toggleModal}
            getIndex={getIndex}
            key={image.id}
            index={idx}
            image={image.webformatURL}
            tags={image.tags}
          />
        ))}
      </ImageGallery>

      {loading && (
        <ThreeDots
          height="300"
          width="300"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: 'center' }}
          wrapperClassName=""
          visible={true}
        />
      )}

      {images.length >= 12 && <Button onClick={handleClick} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={images[index].largeImageURL}
            alt={images[index].tags}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;