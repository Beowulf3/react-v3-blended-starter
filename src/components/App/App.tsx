import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Form from '../Form/Form'
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";


export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = async (newQuery: string) => {
    try {
      setIsLoading(true);
      setPhotos([]);
      
      const results = await getPhotos(newQuery);

      if (results.length === 0) {
        toast.error('No photos found for your request.')
      }

      setPhotos(results);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setError(message);
      setPhotos([]);
      toast.error(message);
    } 
    finally {
      setIsLoading(false);
    }
  }
  
  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
  }

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  }

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          {photos.length > 0 && !error && !isLoading && (<PhotosGallery photos={photos} onSelect={handlePhotoSelect} />)}
          {selectedPhoto && <Modal onClose={handleCloseModal}>
              <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
            </Modal>}
        </Container>
      </Section>
    </>
  );
}
